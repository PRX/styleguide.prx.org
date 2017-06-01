import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

/**
 * Generic cache for json
 */
export class HalCache {

  // in-flight requests
  private inFlight: { [key: string]: Observable<any>; } = {};

  constructor(public cacheName: string, public ttl = 0) {}

  get(key: string): Observable<any> {
    if (this.inFlight[key]) {
      return this.inFlight[key];
    } else {
      let item = this.getItem(key);
      return item ? Observable.of(item) : null;
    }
  }

  set(key: string, valObservable: Observable<any>): Observable<any> {
    let gotValue = false;
    this.inFlight[key] = valObservable.share().map(val => {
      gotValue = true;
      this.setItem(key, val);
      return val;
    }).finally(() => {
      if (gotValue) {
        delete this.inFlight[key];
      } else {
        this.delItem(key);
      }
    });
    return this.inFlight[key];
  }

  cache(key: string, valObservable: Observable<any>) {
    let cachedVal = this.get(key);
    if (cachedVal) {
      console.log(`cache HIT ${key}`);
      return cachedVal;
    } else {
      console.log(`cache MISS ${key}`);
      return this.set(key, valObservable);
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
        if (key.startsWith(`${this.cacheName}.`)) {
          window.localStorage.removeItem(key);
        }
      }
    }
  }

  private getItem(key: string): any {
    if (this.storageEnabled) {
      let raw = window.localStorage.getItem(`${this.cacheName}.${key}`);
      if (raw) {
        let [exp, val] = JSON.parse(raw);
        if (exp && exp > new Date().getTime()) {
          return val;
        } else {
          this.delItem(key);
        }
      }
    }
    return null;
  }

  private setItem(key: string, val: any): boolean {
    if (this.storageEnabled && this.ttl > 0) {
      let expAndVal = JSON.stringify([new Date().getTime() + this.ttl, val]);
      window.localStorage.setItem(`${this.cacheName}.${key}`, expAndVal);
      return true;
    }
    return false;
  }

  private delItem(key: string): boolean {
    key = `${this.cacheName}.${key}`;
    if (this.storageEnabled && window.localStorage.getItem(key)) {
      window.localStorage.removeItem(`${this.cacheName}.${key}`);
      return true;
    } else {
      return false;
    }
  }

  private get storageEnabled(): boolean {
    return !!(window && window.localStorage);
  }

}
