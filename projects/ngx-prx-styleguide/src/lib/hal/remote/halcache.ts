
import {of as observableOf,  Observable } from 'rxjs';

import {finalize, map, share} from 'rxjs/operators';





/**
 * Generic cache for json
 */
export class HalCache {

  // in-flight requests
  private inFlight: { [key: string]: Observable<any>; } = {};

  // in-memory cache
  private memcache: { [key: string]: any; } = {};

  constructor(public cacheName: string, public ttl = 0) {}

  get(key: string): Observable<any> {
    if (this.inFlight[key]) {
      return this.inFlight[key];
    } else {
      let item = this.getItem(key);
      return item ? observableOf(item) : null;
    }
  }

  set(key: string, valObservable: Observable<any>, ttl: number = this.ttl): Observable<any> {
    let gotValue = false;
    this.inFlight[key] = valObservable.pipe(share(),map(val => {
      gotValue = true;
      this.setItem(key, val, ttl);
      return val;
    }),finalize(() => {
      if (gotValue) {
        delete this.inFlight[key];
      } else {
        this.delItem(key);
      }
    }),);
    return this.inFlight[key];
  }

  cache(key: string, valObservable: Observable<any>, overrideTTL?: number) {
    let cachedVal = this.get(key);
    if (cachedVal) {
      return cachedVal;
    } else {
      return this.set(key, valObservable, overrideTTL);
    }
  }

  del(key: string) {
    delete this.inFlight[key];
    this.delItem(key);
  }

  clear() {
    this.inFlight = {};
    if (this.storageEnabled) {
      for (let i = 0, len = localStorage.length; i < len; ++i) {
        let key = localStorage.key(i);
        if (key && key.startsWith(`${this.cacheName}.`)) {
          window.localStorage.removeItem(key);
        }
      }
    } else {
      this.memcache = {};
    }
  }

  private getItem(key: string): any {
    let exp: number, val: any;

    if (this.storageEnabled) {
      let raw = window.localStorage.getItem(`${this.cacheName}.${key}`);
      if (raw) {
        [exp, val] = JSON.parse(raw);
      }
    } else if (this.memcache[key]) {
      [exp, val] = this.memcache[key];
    }

    if (this.checkExpired(exp)) {
      this.del(key);
      return null;
    } else if (val) {
      return val;
    } else {
      return null;
    }
  }

  private setItem(key: string, val: any, ttl: number): boolean {
    if (ttl > 0) {
      let exp = new Date().getTime() + (ttl * 1000);
      if (this.storageEnabled) {
        let expAndVal = JSON.stringify([exp, val]);
        window.localStorage.setItem(`${this.cacheName}.${key}`, expAndVal);
      } else {
        this.memcache[key] = [exp, val];
      }
      return true;
    }
    return false;
  }

  private delItem(key: string): boolean {
    key = `${this.cacheName}.${key}`;
    if (this.storageEnabled && window.localStorage.getItem(key)) {
      window.localStorage.removeItem(`${this.cacheName}.${key}`);
      return true;
    } else if (this.memcache[key]) {
      delete this.memcache[key];
      return true;
    } else {
      return false;
    }
  }

  private checkExpired(exp: number) {
    return !(exp && exp > new Date().getTime());
  }

  private get storageEnabled(): boolean {
    return false; // TODO: do we ever actually want localstorage?
  }

}
