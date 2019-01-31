
import {of as observableOf,  Observable } from 'rxjs';
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

  mockError(rel: string, msg: string | Error) {
    this.root.mockError(rel, msg);
  }

  public(host: string, path: string, ttl?: number): HalObservable<MockHalDoc> {
    return <HalObservable<MockHalDoc>> observableOf(this.root);
  }

  authorized(host: string, path: string, ttl?: number): HalObservable<MockHalDoc> {
    return <HalObservable<MockHalDoc>> observableOf(this.root);
  }

}
