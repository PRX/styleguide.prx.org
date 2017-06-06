import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { HalDoc } from '../doc/haldoc';
import { HalObservable } from '../doc/halobservable';

/*
 * Mock version of a haldoc
 */
export class MockHalDoc extends HalDoc {

  MOCKS = {};
  ERRORS = {};
  profile: string;

  static guessProfile(relString?: string, isCollection = false): string {
    if (relString && relString.match(/prx:/)) {
      if (isCollection) {
        if (relString === 'prx:stories') { relString = 'prx:story'; }
        if (relString === 'prx:images') { relString = 'prx:image'; }
        if (relString === 'prx:accounts') { relString = 'prx:account'; }
        if (relString === 'prx:audio-versions') { relString = 'prx:audio-version'; }
        return 'collection/' + relString.split(':')[1];
      } else {
        return 'model/' + relString.split (':')[1];
      }
    }
    return null;
  }

  constructor(data: any = {}, profile?: string) {
    super(data, <any> {
      expand: (link: any) => link ? link.href : null
    });
    this.profile = profile;
  }

  mock(rel: string, data: {}): MockHalDoc {
    return this.MOCKS[rel] = new MockHalDoc(data, MockHalDoc.guessProfile(rel));
  }

  mockList(rel: string, datas: {}[]): MockHalDoc[] {
    return this.MOCKS[rel] = datas.map(data => {
      return new MockHalDoc(data, MockHalDoc.guessProfile(rel, true));
    });
  }

  mockItems(rel: string, datas: {}[]): MockHalDoc[] {
    return this.mock(rel, {total: datas.length}).mockList('prx:items', datas).map(doc => {
      doc.profile = MockHalDoc.guessProfile(rel, true);
      return doc;
    });
  }

  mockError(rel: string, msg: string) {
    this.ERRORS[rel] = msg;
  }

  update(data: any): HalObservable<MockHalDoc> {
    for (let key of Object.keys(data)) {
      this[key] = data[key];
    }
    return <HalObservable<MockHalDoc>> Observable.of(<MockHalDoc> this);
  }

  create(rel: string, params: any = {}, data: any): HalObservable<MockHalDoc> {
    let doc = this.mock(rel, data); // TODO: params?
    return <HalObservable<MockHalDoc>> Observable.of(doc);
  }

  destroy(): HalObservable<MockHalDoc> {
    this['_destroyed'] = true; // TODO: something better
    return <HalObservable<MockHalDoc>> Observable.of(<MockHalDoc> this);
  }

  count(rel?: string): number {
    if (rel && this.MOCKS[rel] && this.MOCKS[rel] instanceof Array) {
      return this.MOCKS[rel].length;
    } else if (rel && this.MOCKS[rel] && this.MOCKS[rel].has('prx:items')) {
      return this.MOCKS[rel].count('prx:items');
    } else {
      return super.count(rel);
    }
  }

  total(): number {
    if (super.total() > 0) {
      return super.total();
    } else {
      return this.count();
    }
  }

  has(rel: string, mustBeList = false): boolean {
    if (this.MOCKS[rel]) {
      return mustBeList ? (this.MOCKS[rel] instanceof Array) : true;
    } else if (this['_links'] && this['_links'][rel]) {
      return mustBeList ? (this['_links'][rel] instanceof Array) : true;
    } else {
      return false;
    }
  }

  isa(type: string, includeCollections = true): boolean {
    if (this.profile === `model/${type}`) {
      return true;
    } else if (includeCollections && this.profile === `collection/${type}`) {
      return true;
    } else {
      return false;
    }
  }

  follow(rel: string, params: {} = null): HalObservable<MockHalDoc> {
    return Observable.create((obs: Observer<any>) => {
      if (this.ERRORS[rel]) {
        obs.error(new Error(this.ERRORS[rel]));
      } else if (this.MOCKS[rel] && this.MOCKS[rel] instanceof Array) {
        obs.error(new Error(`Expected mocked object at ${rel} - got array`));
      } else if (this.MOCKS[rel]) {
        obs.next(this.MOCKS[rel]);
        obs.complete();
      } else {
        obs.error(new Error(`Un-mocked request for rel ${rel}`));
      }
    });
  }

  followList(rel: string, params: {} = null): HalObservable<MockHalDoc[]> {
    return Observable.create((obs: Observer<any>) => {
      if (this.ERRORS[rel]) {
        obs.error(new Error(this.ERRORS[rel]));
      } else if (this.MOCKS[rel] && this.MOCKS[rel] instanceof Array) {
        obs.next(this.MOCKS[rel]);
        obs.complete();
      } else if (this.MOCKS[rel]) {
        obs.error(new Error(`Expected mocked array at ${rel} - got object`));
      } else {
        obs.error(new Error(`Un-mocked request for rel ${rel}`));
      }
    });
  }

  followLink(linkObj: any, params: any = {}): HalObservable<HalDoc> {
    return this.follow(linkObj.href, params);
  }

  expand(rel: string, params: any = {}): string {
    if (rel === 'profile') {
      return this.profile;
    }

    let link;
    if (this['_links']) {
      link = this['_links'][rel];
    } else if (this.MOCKS) {
      link = this.MOCKS[rel];
    }
    if (link && link instanceof Array) {
      link = link[0];
    }

    return this.remote.expand(link, params);
  }

}
