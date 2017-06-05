import { Observable } from 'rxjs/Observable';
import { HalCache } from './halcache';

describe('HalCache', () => {

  let cache: HalCache;
  beforeEach(() => {
    cache = new HalCache('the-cache', 10);
    cache.clear();
  });

  it('returns null for misses', () => {
    expect(cache.get('foo')).toBeNull();
  });

  it('sets observables', () => {
    cache.set('foo', Observable.of('bar'));
    expect(cache.get('foo') instanceof Observable).toBeTruthy();
    cache.get('foo').subscribe((val) => {
      expect(val).toEqual('bar');
    });
  });

  it('caches observables', () => {
    cache.cache('foo', Observable.of('one')).subscribe(val => {
      expect(val).toEqual('one');
    });
    cache.cache('foo', Observable.of('two')).subscribe(val => {
      expect(val).toEqual('one');
    });
  });

  it('does not cache when ttl is 0', () => {
    expect(cache.get('foo')).toBeNull();
    cache.set('foo', Observable.of('bar'), 0).subscribe();
    expect(cache.get('foo')).toBeNull();
    cache.set('foo', Observable.of('bar'), 1).subscribe();
    expect(cache.get('foo') instanceof Observable).toBeTruthy();
  });

  it('deletes caches', () => {
    cache.set('foo', Observable.of('bar'));
    cache.del('foo');
    expect(cache.get('foo')).toBeNull();
  });

  it('clears caches', () => {
    cache.set('one', Observable.of('bar'));
    cache.clear();
    expect(cache.get('foo')).toBeNull();
  });

  it('expires caches', (done: Function) => {
    cache.set('foo', Observable.of('bar')).subscribe((val: any) => {
      expect(val).toEqual('bar');
    });
    setTimeout(
      () => {
        let theFuture = new Date('2099-01-01');
        spyOn(window, 'Date').and.returnValue(theFuture);
        expect(cache.get('foo')).toBeNull();
        done();
      },
      1
    );
  });

});
