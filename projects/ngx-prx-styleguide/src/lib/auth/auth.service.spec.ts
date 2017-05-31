import { AuthService } from './auth.service';

describe('AuthService', () => {

  let auth = new AuthService();
  auth.config('some-host', 'some-client-id');

  describe('url', () => {

    it('generates unique nonces', () => {
      let url1 = auth.url();
      let url2 = auth.url();
      expect(url1).not.toEqual(url2);
      expect(url1.replace(/nonce=\w+/, '')).toEqual(url2.replace(/nonce=\w+/, ''));
    });

    it('inserts a prompt string', () => {
      expect(auth.url()).toMatch('prompt=none');
      expect(auth.url('foobar')).toMatch('prompt=foobar');
    });

    it('asks for a token', () => {
      expect(auth.url()).toMatch('response_type=token');
    });

  });

  it('emits tokens', () => {
    let currentToken = 'nothing';
    auth.token.subscribe((token) => { currentToken = token; });
    expect(currentToken).toEqual('nothing');
    auth.setToken(undefined);
    expect(currentToken).toBeNull();
    auth.setToken('something');
    expect(currentToken).toEqual('something');
  });

  it('replays the last token', () => {
    auth.setToken('something');
    let currentToken = 'nothing';
    auth.token.subscribe((token) => { currentToken = token; });
    expect(currentToken).toEqual('something');
  });

  it('refreshes and waits for a new token', () => {
    auth.setToken('something');

    let currentToken = 'nothing';
    let refreshToken = 'nothing';
    auth.token.subscribe(token => currentToken = token);
    auth.refreshToken().subscribe(token => refreshToken = token);
    expect(currentToken).toEqual('something');
    expect(refreshToken).toEqual('nothing');

    auth.setToken('somethingelse');
    expect(currentToken).toEqual('somethingelse');
    expect(refreshToken).toEqual('somethingelse');
  });

});
