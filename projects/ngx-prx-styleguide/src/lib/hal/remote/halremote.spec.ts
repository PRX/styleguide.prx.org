import { of as observableOf, Observable, ReplaySubject } from 'rxjs';

import { delay, map } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HalRemote, HalHttpError } from './halremote';

describe('HalRemote', () => {
  let mockHttp: HttpTestingController;
  let httpClient: HttpClient;

  let remote: HalRemote, link: any, token: ReplaySubject<string>, fakeAuth: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    mockHttp = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);

    link = { href: '/foobar' };
    token = new ReplaySubject<string>(1);
    token.next('thetoken');
    fakeAuth = {
      token,
      refreshToken: () => {
        token.next('nexttoken');
        return token;
      }
    };
    remote = new HalRemote('http://thehost', httpClient, fakeAuth, 10);
    remote.clear();
  });

  describe('switchHost', () => {
    it('creates a new remote for new hosts in absolute links', () => {
      link.href = 'https://some.where.else/with/a/path.jpg';
      const newRemote = remote.switchHost(link);
      expect(newRemote).not.toEqual(remote);
      expect(newRemote.host).toEqual('https://some.where.else');
    });

    it('returns itself if the host has not changed', () => {
      let newRemote = remote.switchHost(link);
      expect(newRemote).toEqual(remote);

      link.href = 'http://thehost/and/a/path.mp3';
      newRemote = remote.switchHost(link);
      expect(newRemote).toEqual(remote);

      link.href = null;
      newRemote = remote.switchHost(link);
      expect(newRemote).toEqual(remote);
    });
  });

  describe('expand', () => {
    it('returns the full url', () => {
      expect(remote.expand(link)).toEqual('http://thehost/foobar');
    });

    it('makes sure the link exists', () => {
      expect(remote.expand(null)).toBeNull();
      expect(remote.expand({} as any)).toBeNull();
    });

    it('interprets templated links', () => {
      link.href = '/link/{foo}{?bar}';
      link.templated = true;
      const params = { bar: 'two', foo: 'one', test: 'three' };
      expect(remote.expand(link, params)).toEqual('http://thehost/link/one?bar=two');
    });
  });

  describe('get', () => {
    afterEach(() => {
      mockHttp.verify();
    });

    it('expands templated links', () => {
      link.href = '/{foo}';
      link.templated = true;
      remote.get(link, { foo: 'somewhere' }).subscribe(() => {});
      const req = mockHttp.expectOne(request => {
        return request.url === 'http://thehost/somewhere';
      });
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('sets the correct headers', () => {
      remote.get(link).subscribe(() => {});
      const req = mockHttp.expectOne(request => {
        return (
          request.headers.get('Accept') === 'application/hal+json' &&
          request.headers.get('Authorization') === 'Bearer thetoken'
        );
      });
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('caches values for a short time', () => {
      let httpCount = 0;
      let completed = 0;
      remote.get(link).subscribe(data => {
        expect(data['count']).toEqual(1);
        expect(++completed).toEqual(1);
      });
      const cachedReq = mockHttp.expectOne(request => {
        return request.url.indexOf(link.href) > -1;
      });
      expect(cachedReq.request.method).toBe('GET');
      cachedReq.flush({ count: ++httpCount });
      expect(httpCount).toEqual(1);

      // check that we still have the same data cached
      remote.get(link).subscribe(data => {
        expect(data['count']).toEqual(1);
        expect(++completed).toEqual(2);
      });

      // clear and get again
      remote.clear();
      remote.get(link).subscribe(data => {
        expect(data['count']).toEqual(2);
        expect(++completed).toEqual(3);
      });
      const clearReq = mockHttp.expectOne(request => {
        return request.url.indexOf(link.href) > -1;
      });
      expect(clearReq.request.method).toBe('GET');
      clearReq.flush({ count: ++httpCount });
      expect(httpCount).toEqual(2);
    });

    it('caches in-flight observables', done => {
      let httpCount = 0;
      let completed = 0;
      remote
        .get(link)
        .pipe(
          map(data => {
            return observableOf(data).pipe(delay(100));
          })
        )
        .subscribe(() => {
          completed++;
        });
      remote.get(link).subscribe(() => {
        completed++;
      });
      remote.get(link).subscribe(() => {
        completed++;
      });

      setTimeout(() => {
        expect(httpCount).toEqual(0);
        expect(completed).toEqual(0);
        const req = mockHttp.expectOne(request => {
          return request.url.indexOf(link.href) > -1;
        });
        expect(req.request.method).toBe('GET');
        req.flush({ count: ++httpCount });
        expect(httpCount).toEqual(1);
        expect(completed).toEqual(3);
        done();
      }, 200);
    });

    it('returns hal errors', () => {
      let caught: any;
      remote.get(link).subscribe(
        () => {},
        err => (caught = err)
      );

      const req = mockHttp.expectOne(() => true);
      req.flush('{"what":"ever"}', { status: 500, statusText: 'bad things' });

      expect(caught instanceof HalHttpError).toEqual(true);
      expect(caught.status).toEqual(500);
      expect(caught.message).toMatch('Got 500 from GET http://thehost/foobar');
      expect(caught.body).toEqual({ what: 'ever' });
    });
  });

  describe('post', () => {
    afterEach(() => {
      mockHttp.verify();
    });

    it('sets the correct headers', () => {
      remote.post(link, {}, { hello: 'world' }).subscribe(() => {});
      const req = mockHttp.expectOne(request => {
        return (
          request.body === '{"hello":"world"}' &&
          request.headers.get('Accept') === 'application/hal+json' &&
          request.headers.get('Authorization') === 'Bearer thetoken' &&
          request.headers.get('Content-Type') === 'application/hal+json'
        );
      });
      expect(req.request.method).toBe('POST');
      req.flush({});
    });
  });

  describe('retries', () => {
    it('retries 401s after getting a new token', () => {
      jest.spyOn(fakeAuth, 'refreshToken');
      remote.get(link).subscribe();

      const httpCount = 0;
      const req = mockHttp.expectOne(request => request.headers.get('Authorization') === 'Bearer thetoken');
      expect(req.request.method).toBe('GET');
      req.flush({ data: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });

      expect(fakeAuth.refreshToken).toHaveBeenCalledTimes(1);
      token.subscribe(tkn => {
        expect(tkn).toEqual('nexttoken');
      });
    });
  });
});
