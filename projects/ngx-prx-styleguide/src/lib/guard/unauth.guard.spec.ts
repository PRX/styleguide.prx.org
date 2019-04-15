import { ReplaySubject } from 'rxjs';
import { UnauthGuard } from './unauth.guard';

const mockAuthService = {
  token: new ReplaySubject<string>(1),
  parseToken: (tokStr: string) => {
    if (tokStr == 'AUTHORIZATION_DENIED') return false;
    return tokStr;
  }
};
const mockRouter = {
  goto: null as any,
  navigate: (params: any[]) => { mockRouter.goto = params[0]; }
};

describe('UnauthGuard', () => {

  beforeEach(() => {
    mockAuthService.token = new ReplaySubject<string>(1);
    mockRouter.goto = null;
  });

  describe('with a token', () => {

    it('unauth disallows users', () => {
      let unguard = new UnauthGuard(mockAuthService as any, mockRouter as any);
      let canActivate: boolean;
      unguard.canActivate().subscribe((can: boolean) => { canActivate = can; });
      expect(canActivate).toBeUndefined();
      mockAuthService.token.next('something');
      expect(canActivate).toEqual(false);
    });

  });

  describe('with a token of AUTHORIZATION_DENIED', () => {

    it('auth redirects to permission-denied', () => {
      let unguard = new UnauthGuard(mockAuthService as any, mockRouter as any);
      let canActivate: boolean;
      unguard.canActivate().subscribe((can: boolean) => { canActivate = can; });
      expect(canActivate).toBeUndefined();
      mockAuthService.token.next('AUTHORIZATION_DENIED');
      expect(canActivate).toEqual(true);
      expect(mockRouter.goto).toEqual('/permission-denied');
    });

  });

  describe('without a token', () => {

    it('unauth allows users', () => {
      let unguard = new UnauthGuard(mockAuthService as any, mockRouter as any);
      let canActivate: boolean;
      unguard.canActivate().subscribe((can: boolean) => { canActivate = can; });
      expect(canActivate).toBeUndefined();
      mockAuthService.token.next(null);
      expect(canActivate).toEqual(true);
    });

  });

});
