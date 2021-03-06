
import {of as observableOf,  Observable } from 'rxjs';

import { DeactivateGuard } from './deactivate.guard';

describe('DeactivateGuard', () => {

  let guard = new DeactivateGuard();

  it('allows deactivation by default', () => {
    let comp: any = {};
    expect(guard.canDeactivate(comp)).toEqual(true);
  });

  it('decides deactivation from a function', () => {
    let allow: any = {canDeactivate: () => true};
    let deny: any = {canDeactivate: () => false};
    expect(guard.canDeactivate(allow)).toEqual(true);
    expect(guard.canDeactivate(deny)).toEqual(false);
  });

  it('decides deactivation from an observable', () => {
    let allow: any = {canDeactivate: () => observableOf(true)};
    let deny: any = {canDeactivate: () => observableOf(false)};
    let allowObs = guard.canDeactivate(allow) as Observable<boolean>;
    let denyObs = guard.canDeactivate(deny) as Observable<boolean>;
    expect(allowObs instanceof Observable).toBeTruthy();
    expect(denyObs instanceof Observable).toBeTruthy();

    let allowResult: boolean, denyResult: boolean;
    allowObs.subscribe(can => allowResult = can);
    denyObs.subscribe(can => denyResult = can);
    expect(allowResult).toEqual(true);
    expect(denyResult).toEqual(false);
  });

});
