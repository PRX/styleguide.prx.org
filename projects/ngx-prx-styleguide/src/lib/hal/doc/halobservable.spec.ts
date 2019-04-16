
import {of as observableOf,  Observable } from 'rxjs';

import { HalObservable } from './halobservable';
import './halobservable';

describe('HalObservable', () => {

  let observe = (thing: any): HalObservable<any> => {
    return observableOf(thing) as HalObservable<any>;
  };
  let mockDoc: any = {
    follow: () => observe('followed'),
    followList: () => observe('followedList'),
    followItems: () => observe('followedItems')
  };

  it('follows', () => {
    let outcome;
    observe(mockDoc).follow('rel').subscribe(o => outcome = o);
    expect(outcome).toEqual('followed');
  });

  it('follows lists', () => {
    let outcome;
    observe(mockDoc).followList('rel').subscribe(o => outcome = o);
    expect(outcome).toEqual('followedList');
  });

  it('follows items', () => {
    let outcome;
    observe(mockDoc).followItems('rel').subscribe(o => outcome = o);
    expect(outcome).toEqual('followedItems');
  });

});
