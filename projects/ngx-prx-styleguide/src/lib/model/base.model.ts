
import {
  from as observableFrom,
  forkJoin as observableForkJoin,
  throwError as observableThrowError,
  of as observableOf,
  Observable,
  ReplaySubject } from 'rxjs';

import {first, map, concatAll, toArray, mergeMap, catchError} from 'rxjs/operators';









import { HalDoc } from '../hal/doc/haldoc';
import { BaseInvalid } from './base.invalid';
import { BaseStorage } from './base.storage';

export interface ValidatorMap  { [key: string]: BaseInvalid[]; }
export interface RelatedMap    { [key: string]: Observable<any>; }
interface RelatedLoader { [key: string]: Observable<BaseModel | BaseModel[]>; }

/**
 * Base class for modeling/validating haldocs
 */
export abstract class BaseModel {

  public isSaving = false;
  public isNew = false;
  public isDestroy = false;

  public doc: HalDoc;
  public parent: HalDoc;
  public original: {} = {};
  public lastStored: Date;

  public SETABLE: string[] = [];
  public VALIDATORS: ValidatorMap = {};

  public RELATIONS: string[] = [];
  private relatedReplays: RelatedLoader = {};
  private relatedLoaders: RelatedLoader = {};

  public URLS: string[] = [];

  abstract key(): string;
  abstract related(): RelatedMap;
  abstract decode(): void;
  abstract encode(): {};
  abstract saveNew(data: {}): Observable<HalDoc>;

  init(parent?: HalDoc, self?: HalDoc, loadRelated = true) {
    this.parent = parent;
    this.doc = self;
    this.isNew = self ? false : true;
    if (self) {
      this.decode();
    }

    // get remote values, before overlaying localstorage
    this.original = {};
    for (const f of this.SETABLE) {
      this.original[f] = this[f];
    }
    this.restore();

    // setup cold observables for related models, and optionally preload them
    this.relatedLoaders = this.related();
    this.RELATIONS = Object.keys(this.relatedLoaders);
    if (loadRelated) {
      this.loadRelated();
    }
  }

  set(field: string, value: any, forceOriginal = false) {
    if (this.URLS.indexOf(field) > -1) {
      value = this.createLink(value);
    }
    this[field] = value;
    if (this.SETABLE.indexOf(field) > -1) {
      if (forceOriginal) { this.original[field] = value; }
      this.store();
    }
  }

  save(): Observable<boolean> {
    if (!this.doc && this.isDestroy) {
      this.unstore();
      this.lastStored = null;
      return observableOf(false);
    }
    this.isSaving = true;

    let saveMe: Observable<HalDoc>;
    if (this.isNew) {
      saveMe = this.saveNew(this.encode());
    } else if (this.isDestroy) {
      saveMe = this.doc.destroy();
    } else if (this.changed(null, false)) {
      saveMe = this.doc.update(this.encode());
    } else {
      saveMe = observableOf(this.doc);
    }

    return saveMe.pipe(mergeMap((doc?) => {
      this.unstore();
      this.lastStored = null;
      if (doc) {
        this.init(this.parent, doc, false);
      }

      // save related docs in parallel
      return this.swapRelated().pipe(mergeMap(() => {
        return this.saveRelated().pipe(map(() => {
          this.isNew = false;
          this.isSaving = false;
          this.resetRelated();
          return true;
        }));
      }));
    }));
  }

  loadRelated(relName?: string, force = false): Observable<BaseModel | BaseModel[]> {
    if (relName && !this.relatedLoaders[relName]) {
      return observableThrowError(new Error(`Unknown model related: ${relName}`));
    } else if (relName) {
      if (force || !this.relatedReplays[relName]) {
        const relValue = new ReplaySubject<any>(1);
        this.relatedLoaders[relName].subscribe(v => {
          this[relName] = v;
          relValue.next(v);
        },
        err => {
          if (err.status === 404 && err.name === 'HalHttpError') {
            console.error(`404 on ${this.constructor.name} (${this.doc && this.doc.id}) related loader "${relName}"`);
            relValue.next();
          } else {
            relValue.error(err);
          }
        });
        this.relatedReplays[relName] = relValue;
      }
      return this.relatedReplays[relName].pipe(first());
    } else {
      const allRelated = this.RELATIONS.map(r => this.loadRelated(r, force));
      return observableForkJoin(allRelated).pipe(map(relateds => null));
    }
  }

  swapRelated(): Observable<boolean[]> {
    const relatedSwappers = this.RELATIONS.map(rel => {
      const models = this.getRelated(rel);
      if (models.some(m => (m.isNew && m['swapNew']))) {
        return this.loadRelated(rel, true).pipe(map(() => {
          const newModels = this.getRelated(rel);
          models.forEach((model, idx) => {
            if (model.isNew && model['swapNew'] && newModels[idx]) {
              model['swapNew'](newModels[idx]);
            }
            model.unstore();
          });
          return true;
        }));
      } else {
        return observableOf(false);
      }
    });
    return observableFrom(relatedSwappers).pipe(concatAll(), toArray(), );
  }

  saveRelated(): Observable<boolean[]> {
    const relatedSavers: Observable<boolean>[] = this.getRelated().filter(model => {
      return model.isNew || model.changed();
    }).map(model => {
      if (model.isNew) {
        model.unstore(); // delete old storage key
        model.parent = this.doc;
        model.store(); // save key w/new parent
      } else {
        model.parent = this.doc;
      }
      const wasDestroy = model.isDestroy;
      return model.save().pipe(map(saved => {
        if (saved && wasDestroy) {
          this.removeRelated(model);
        }
        return saved;
      }));
    });
    return observableFrom(relatedSavers).pipe(concatAll(), toArray(), );
  }

  removeRelated(model: BaseModel) {
    this.RELATIONS.forEach(rel => {
      if (this[rel] === model) {
        this[rel] = null;
      } else if (this[rel] instanceof Array) {
        this[rel] = this[rel].filter((m: BaseModel) => m !== model);
      }
    });
  }

  resetRelated() {
    this.RELATIONS.forEach(rel => {
      if (this[rel] instanceof Array) {
        this[rel] = [...this[rel]];
      }
    });
  }

  discard(): any {
    this.unstore();
    this.lastStored = null;
    this.isDestroy = false;
    if (!this.doc && this.original) {
      for (const key of Object.keys(this.original)) {
        this[key] = this.original[key];
      }
    }
    this.init(this.parent, this.doc, false);
    this.getRelated().forEach(model => {
      if (model.discard() !== false && model.isNew) {
        this.removeRelated(model);
      }
    });
    this.resetRelated();
  }

  changed(field?: string | string[], includeRelations = true): boolean {
    if (this.isDestroy) {
      return this.isNew ? false : true;
    }
    return this.setableFields(field, includeRelations).some(f => {
      if (this.RELATIONS.indexOf(f) > -1) {
        return this.getRelated(f).some(m => m.changed());
      } else if (this.original[f] instanceof Array && this[f] instanceof Array) {
        const a1 = this.original[f], a2 = this[f];
        return a1.length !== a2.length || a1.some((val: any, idx: number) => val !== a2[idx]);
      } else if (this.original[f] instanceof Date && this[f] instanceof Date) {
        return this.original[f].getTime() !== this[f].getTime();
      } else {
        return this.original[f] !== this[f];
      }
    });
  }

  invalid(field?: string | string[], strict = true): string {
    if (this.isDestroy) {
      return null; // don't care if it's invalid
    }
    const fields = this.setableFields(field);
    const invalids: string[] = [];
    for (const f of fields) {
      if (f === 'self') {
        invalids.push(this.invalidate('self', this, strict));
      } else if (this.RELATIONS.indexOf(f) > -1) {
        invalids.push(this.invalidate(f, this.getRelated(f), strict));
      } else {
        invalids.push(this.invalidate(f, this[f], strict));
      }
    }
    return invalids.filter(i => i).join(', ') || null;
  }

  invalidate(field: string, value: any, strict: boolean): string {
    const validators = this.VALIDATORS[field] || [];
    for (const validator of validators) {
      const invalidMsg = validator(field, value, strict, this);
      if (invalidMsg) {
        return invalidMsg;
      }
    }
    if (this.RELATIONS.indexOf(field) > -1) {
      const models = <BaseModel[]> value;
      return models.map(m => m.invalid(null, strict)).filter(i => i).join(', ') || null;
    }
    return null;
  }

  setableFields(only?: string | string[], includeRelations = true): string[] {
    let allFields = this.SETABLE.concat('self');
    if (includeRelations) { allFields = allFields.concat(this.RELATIONS); }
    if (only && typeof only === 'string') {
      return allFields.indexOf(only) > -1 ? [only] : [];
    } else if (only && only instanceof Array) {
      return only.filter(f => allFields.indexOf(f) > -1);
    } else {
      return allFields;
    }
  }

  store() {
    this.lastStored = new Date();
    if (this.key()) {
      const changed = {};
      this.SETABLE.filter(f => this.changed(f)).forEach(f => changed[f] = this[f]);
      if (Object.keys(changed).length > 0) {
        changed['lastStored'] = this.lastStored;
        BaseStorage.setItem(this.key(), changed);
      } else {
        BaseStorage.removeItem(this.key());
      }
    }
  }

  restore() {
    if (this.key()) {
      const data = BaseStorage.getItem(this.key());
      if (data) {
        for (const key of Object.keys(data)) {
          if (this.SETABLE.indexOf(key) > -1) {
            this[key] = data[key];
          }
          if (key === 'lastStored') {
            this.lastStored = new Date(data[key]);
          }
        }
      }
    }
  }

  unstore() {
    if (this.key()) {
      BaseStorage.removeItem(this.key());
    }
  }

  isStored(): boolean {
    if (this.key()) {
      return BaseStorage.getItem(this.key()) ? true : false;
    } else {
      return false;
    }
  }

  getRelated(rel?: string): BaseModel[] {
    const checkRels = rel ? [rel] : this.RELATIONS;
    const models: BaseModel[] = [];
    for (const checkRel of checkRels) {
      if (this[checkRel] instanceof Array) {
        for (const model of this[checkRel]) {
          models.push(model);
        }
      } else if (this[checkRel] instanceof BaseModel) {
        models.push(this[checkRel]);
      }
    }
    return models;
  }

  createLink(url: string): string {
    const urlLength = url.length;
    if (urlLength < 'https://'.length) {
      if (['http://'.slice(0, urlLength), 'https://'.slice(0, urlLength)].indexOf(url) > -1) {
        return url;
      }
    }
    return /^https?:\/\//i.test(url) ? url : `http://${url}`;
  }

}
