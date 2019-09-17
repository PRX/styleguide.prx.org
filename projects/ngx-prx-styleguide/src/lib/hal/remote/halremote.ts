
import {of as observableOf, throwError as observableThrowError,  Observable } from 'rxjs';

import {map, first, mergeMap, catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';





import { expand } from '../rfc6570-expand/expand';
import { AuthService } from '../../auth/auth.service';
import { HalCache } from './halcache';
import { HalLink, HalLinkError } from '../doc/hallink';

export class HalHttpError extends Error {
  name = 'HalHttpError';
  constructor(public status: number, msg: string) {
    super(msg);
  }
}

/**
 * Http layer for HAL requests
 */
export class HalRemote {

  cache: HalCache;
  rootTTL = 300;

  constructor(
    public host: string,
    private http: HttpClient,
    private auth?: AuthService,
    private ttl?: number
  ) {
    this.cache = new HalCache(this.host.replace(/\./g, '-'), ttl);
    if (!host.match(/^http/)) {
      this.host = host.match(/\.org|\.tech/) ? `https://${host}` : `http://${host}`;
    }
  }

  switchHost(link?: HalLink): HalRemote {
    const absoluteLink = link && link.href && link.href.match(/^http(s)?:\/\//);
    if (absoluteLink && !link.href.startsWith(this.host)) {
      const newHost = link.href.match(/^http(s)?:\/\/[^\/]+/)[0];
      return new HalRemote(newHost, this.http, this.auth);
    } else {
      return this;
    }
  }

  expand(link: HalLink, params: {} = null): string {
    if (!link || !link.href) {
      return null;
    } else if (link.templated) {
      return expand(this.host + link.href, params || {});
    } else if (link.href.match(/^http(s)?:\/\//)) {
      return link.href;
    } else {
      return this.host + link.href;
    }
  }

  get(link: HalLink, params: {} = null): Observable<{}> {
    const href = this.expand(link, params);
    if (href && this.isRoot(href)) {
      return this.cache.cache(href, this.httpRequest('get', href), this.rootTTL);
    } else if (href) {
      return this.cache.cache(href, this.httpRequest('get', href));
    } else {
      return observableThrowError(new HalLinkError('No link object specified!'));
    }
  }

  put(link: HalLink, params: {} = null, data: {}): Observable<{}> {
    const href = this.expand(link, params);
    const body = data ? JSON.stringify(data) : null;
    this.cache.del(href);
    return this.httpRequest('put', href, body);
  }

  post(link: HalLink, params: {} = null, data: {}): Observable<{}> {
    const href = this.expand(link, params);
    const body = data ? JSON.stringify(data) : null;
    this.cache.del(href);
    return this.httpRequest('post', href, body);
  }

  delete(link: HalLink, params: {} = null): Observable<{}> {
    const href = this.expand(link, params);
    this.cache.del(href);
    return this.httpRequest('delete', href);
  }

  clear() {
    this.cache.clear();
  }

  private httpRequest(method: string, href: string, body?: string, allowRetry = true): Observable<{}> {
    return this.getResponse(method, href, body, allowRetry);
  }

  private getResponse(method: string, href: string, body?: string, allowRetry = true): Observable<{}> {
    return this.httpOptions(href, body).pipe(mergeMap(opts => {
      if (method === 'put') {
        return this.http.put(href, body, opts);
      } else if (method === 'post') {
        return this.http.post(href, body, opts);
      } else if (method === 'get') {
        return this.http.get(href, opts);
      } else if (method === 'delete') {
        return this.http.delete(href, opts);
      } else {
        throw new Error(`Unknown method ${method}`);
      }
    }), catchError(err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 && allowRetry && this.auth) {
          return this.auth.refreshToken().pipe(mergeMap(() => this.httpRequest(method, href, body, false)));
        } else if (err.status === 0) {
          return observableThrowError(new Error(`CORS preflight failed for ${method.toUpperCase()} ${href}`));
        } else {
          return observableThrowError(new HalHttpError(err.status, `Got ${err.status} from ${method.toUpperCase()} ${href}`));
        }
      } else {
        throw err;
      }
    }));
  }

  private httpOptions(href: string, body?: string): Observable<{headers: HttpHeaders}> {
    return this.authTokenIfNeeded(href).pipe(first(), map(token => {
      const headers = {};
      headers['Accept'] = 'application/hal+json';
      if (body) {
        headers['Content-Type'] = 'application/hal+json';
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      return {headers: new HttpHeaders(headers)};
    }));
  }

  private authTokenIfNeeded(href: string): Observable<string> {
    if (this.auth && !this.isRoot(href)) {
      return this.auth.token;
    } else {
      return observableOf(null);
    }
  }

  private isRoot(href: string): boolean {
    const path = href.replace(/^http(s)?:\/\/[^\/]+\/?/, '');
    return path === '' || path === 'api/v1' || path === 'api/v1/';
  }

}
