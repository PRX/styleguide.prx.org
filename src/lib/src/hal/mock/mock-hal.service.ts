import { Injectable } from '@angular/core';

import { HalObservable } from '../doc/halobservable';
import { MockHalDoc } from './mock-haldoc';

/*
 * Mock version of a hal service
 */
@Injectable()
export class MockHalService {

  root = new MockHalDoc({});

  mock(rel: string, data: {}): MockHalDoc {
    return this.root.mock(rel, data);
  }

  mockList(rel: string, datas: {}[]): MockHalDoc[] {
    return this.root.mockList(rel, datas);
  }

  mockItems(rel: string, datas: {}[]): MockHalDoc[] {
    return this.root.mockItems(rel, datas);
  }

  public(host: string, path: string, ttl?: number): HalObservable<MockHalDoc> {
    return this.root.follow(path);
  }

  authorized(host: string, path: string, ttl?: number): HalObservable<MockHalDoc> {
    return this.root.follow(path);
  }

}
