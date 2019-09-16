
import {from as observableFrom, of as observableOf, throwError as observableThrowError,  Observable } from 'rxjs';

import {toArray, concatAll, map, mergeMap} from 'rxjs/operators';
import { HalRemote } from '../remote/halremote';
import { HalObservable } from './halobservable';







/*
 * Generic class for interacting with HAL api
 */
export class HalDoc {

  id: number;

  constructor(data: any = {}, protected remote: HalRemote) {
    this.setData(data);
  }

  get profileType() {
    const profile = this.expand('profile') || '';
    const match = profile.match(/\/model\/(collection\/)?([^\/]+)/);
    return match ? match.pop() : null;
  }

  get profileSubtype() {
    const profile = this.expand('profile') || '';
    const match = profile.match(/\/model\/(collection\/)?[^/]+\/(.+)$/);
    return match ? match.pop() : null;
  }

  asJSON(): {} {
    const json = {};
    for (const k of Object.keys(this)) {
      if (k !== 'remote') {
        json[k] = this[k];
      }
    }
    return json;
  }

  toJSON(indent = false): string {
    return JSON.stringify(this.asJSON(), null, indent ? 2 : null);
  }

  reload(): HalObservable<HalDoc> {
    const link = this['_links'] ? this['_links']['self'] : null;
    if (!link) {
      return <HalObservable<HalDoc>> this.error(`Expected reload link at _links.self - got null`);
    } else if (link instanceof Array) {
      return <HalObservable<HalDoc>> this.error(`Expected reload link at _links.self - got array`);
    } else {
      return <HalObservable<HalDoc>> this.remote.get(link).pipe(map((obj) => {
        this.setData(obj);
        return <HalDoc> this;
      }));
    }
  }

  update(data: any): HalObservable<HalDoc> {
    const link = this['_links'] ? this['_links']['self'] : null;
    if (!link) {
      return <HalObservable<HalDoc>> this.error(`Expected update link at _links.self - got null`);
    } else if (link instanceof Array) {
      return <HalObservable<HalDoc>> this.error(`Expected update link at _links.self - got array`);
    } else {
      return <HalObservable<HalDoc>> this.remote.put(link, null, data).pipe(map((obj) => {
        this.setData(obj || data);
        return <HalDoc> this;
      }));
    }
  }

  create(rel: string, params: any = {}, data: any): HalObservable<HalDoc> {
    const link = this['_links'] ? this['_links'][rel] : null;
    if (!link) {
      return <HalObservable<HalDoc>> this.error(`Expected create link at _links.${rel} - got null`);
    } else if (link instanceof Array) {
      return <HalObservable<HalDoc>>
        this.error(`Expected create link at _links.${rel} - got array`);
    } else {
      return <HalObservable<HalDoc>> this.remote.post(link, params, data).pipe(map((obj) => {
        return new HalDoc(obj, this.remote.switchHost(link));
      }));
    }
  }

  destroy(): HalObservable<HalDoc> {
    const link = this['_links'] ? this['_links']['self'] : null;
    if (!link) {
      return <HalObservable<HalDoc>> this.error(`Expected destroy link at _links.self - got null`);
    } else if (link instanceof Array) {
      return <HalObservable<HalDoc>> this.error(`Expected destroy link at _links.self - got array`);
    } else {
      return <HalObservable<HalDoc>> this.remote.delete(link).pipe(map(() => {
        return <HalDoc> this;
      }));
    }
  }

  expand(rel: string, params: any = {}): string {
    let link = this['_links'] ? this['_links'][rel] : null;
    if (link && link instanceof Array) {
      link = link[0];
    }
    return this.remote.expand(link, params);
  }

  count(rel?: string): number {
    if (rel && this['_links'] && this['_links'][rel]) {
      let link = this['_links'][rel];
      if (link instanceof Array) {
        link = link[0];
      }
      if (link['count'] !== undefined) {
        return link['count'];
      }
    } else if (!rel && this['_count'] !== undefined) {
      return this['_count'];
    }
  }

  total(): number {
    if (this['_total'] !== undefined) {
      return this['_total'];
    }
  }

  facets(): any {
    if (this['_facets'] !== undefined) {
      return this['_facets'];
    }
  }

  has(rel: string, mustBeList = false): boolean {
    if (this['_embedded'] && this['_embedded'][rel]) {
      return mustBeList ? (this['_embedded'][rel] instanceof Array) : true;
    } else if (this['_links'] && this['_links'][rel]) {
      return mustBeList ? false : true; // links are never lists
    } else {
      return false;
    }
  }

  isa(type: string, includeCollections = true): boolean {
    const profile = this.expand('profile') || '';
    if (profile.match(`model/${type}`)) {
      return true;
    } else if (includeCollections && profile.match(`model/collection/${type}`)) {
      return true;
    } else {
      return false;
    }
  }

  followLink(linkObj: any, params: any = {}): HalObservable<HalDoc> {
    let result: Observable<{}>;
    if (params && params['method'] === 'post') {
      result = this.remote.post(linkObj, params, null);
    } else if (params && params['method'] === 'put') {
      result = this.remote.put(linkObj, params, null);
    } else {
      result = this.remote.get(linkObj, params);
    }
    return <HalObservable<HalDoc>> result.pipe(map(obj => {
      return new HalDoc(obj, this.remote.switchHost(linkObj));
    }));
  }

  follow(rel: string, params: {} = null): HalObservable<HalDoc> {
    if (!params && this['_embedded'] && this['_embedded'][rel]) {
      return <HalObservable<HalDoc>> this.embedOne(rel);
    } else if (this['_links'] && this['_links'][rel]) {
      return <HalObservable<HalDoc>> this.linkOne(rel, params);
    } else {
      return <HalObservable<HalDoc>> this.error(`Unable to find rel ${rel}`);
    }
  }

  followList(rel: string, params: {} = null): HalObservable<HalDoc[]> {
    if (!params && this['_embedded'] && this['_embedded'][rel]) {
      return <HalObservable<HalDoc[]>> this.embedList(rel);
    } else if (this['_links'] && this['_links'][rel]) {
      return <HalObservable<HalDoc[]>> this.linkList(rel, params);
    } else {
      return <HalObservable<HalDoc[]>> this.error(`Unable to find rel ${rel}`);
    }
  }

  followItems(rel: string, params: {} = null): HalObservable<HalDoc[]> {
    return <HalObservable<HalDoc[]>> this.follow(rel, params).pipe(mergeMap((doc) => {
      return doc.followList('prx:items').pipe(map((items) => {
        for (const item of items) {
          item['_count'] = doc['count'];
          item['_total'] = doc['total'];
          item['_facets'] = doc['facets'];
        }
        return items;
      }));
    }));
  }

  protected error(msg: string): Observable<any> {
    console.error(msg);
    return observableThrowError(new Error(msg));
  }

  private embedOne(rel: string): Observable<HalDoc> {
    if (this['_embedded'][rel] instanceof Array) {
      return this.error(`Expected object at _embedded.${rel} - got list`);
    } else {
      return observableOf(new HalDoc(this['_embedded'][rel], this.remote));
    }
  }

  private linkOne(rel: string, params: {} = null): Observable<HalDoc> {
    if (this['_links'][rel] instanceof Array) {
      const guessed = this.guessLink(this['_links'][rel], params);
      if (guessed) {
        return this.followLink(guessed, params);
      } else {
        return this.error(`Expected object at _links.${rel} - got list`);
      }
    } else {
      return this.followLink(this['_links'][rel], params);
    }
  }

  private embedList(rel: string): Observable<HalDoc[]> {
    if (this['_embedded'][rel] instanceof Array) {
      return observableOf(this['_embedded'][rel].map((data: any) => {
        return new HalDoc(data, this.remote);
      }));
    } else {
      return this.error(`Expected array at _embedded.${rel} - got object`);
    }
  }

  private linkList(rel: string, params: {} = null): Observable<HalDoc[]> {
    if (this['_links'][rel] instanceof Array) {
      const links: HalObservable<HalDoc>[] = this['_links'][rel].map((link: any) => {
        return this.followLink(link, params);
      });
      return observableFrom(links).pipe(concatAll(), toArray(), );
    } else {
      return this.error(`Expected array at _links.${rel} - got object`);
    }
  }

  private setData(data: {}) {
    Object.keys(this).forEach((key) => {
      if (this.hasOwnProperty(key) && !(this[key] instanceof Function) && key !== 'remote') {
        delete this[key];
      }
    });
    Object.keys(data).forEach((key) => {
      if (data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    });
  }

  private guessLink(links: any[], params: {} = null): any {
    const lookingForFetch = params && params['id'] !== undefined;
    for (const link of links) {
      if (lookingForFetch && link.href.match(/\/\{id\}/)) {
        return link;
      } else if (!lookingForFetch && link.href.match(/\{.*page/)) {
        return link;
      }
    }
    return null;
  }

}
