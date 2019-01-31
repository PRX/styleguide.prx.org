import { ReplaySubject } from 'rxjs';
import { AuthGuard } from './auth.guard';

const mockAuthService = {
  token: new ReplaySubject<string>(1),
  parseToken: (tokStr: string) => {
    if (tokStr == 'AUTHORIZATION_DENIED') return false;
    return tokStr;
  }
};
const mockRouter = {
  goto: <any> null,
  navigate: (params: any[]) => { mockRouter.goto = params[0]; }
};

describe('AuthGuard', () => {

  beforeEach(() => {
    mockAuthService.token = new ReplaySubject<string>(1);
    mockRouter.goto = null;
  });

  describe('with a token', () => {

    it('auth allows users', () => {
      let guard = new AuthGuard(<any> mockAuthService, <any> mockRouter);
      let canActivate: boolean;
      guard.canActivate().subscribe((can: boolean) => { canActivate = can; });
      expect(canActivate).toBeUndefined();
      mockAuthService.token.next('something');
      expect(canActivate).toEqual(true);
    });

  });

  describe('with a token of AUTHORIZATION_DENIED', () => {

    it('auth redirects to permission-denied', () => {
      let guard = new AuthGuard(<any> mockAuthService, <any> mockRouter);
      let canActivate: boolean;
      guard.canActivate().subscribe((can: boolean) => { canActivate = can; });
      expect(canActivate).toBeUndefined();
      mockAuthService.token.next('AUTHORIZATION_DENIED');
      expect(canActivate).toEqual(false);
      expect(mockRouter.goto).toEqual('/permission-denied');
    });

  });

  describe('without a token', () => {

    it('auth disallows users', () => {
      let guard = new AuthGuard(<any> mockAuthService, <any> mockRouter);
      let canActivate: boolean;
      guard.canActivate().subscribe((can: boolean) => { canActivate = can; });
      expect(canActivate).toBeUndefined();
      mockAuthService.token.next(null);
      expect(canActivate).toEqual(false);
    });

  });

});
