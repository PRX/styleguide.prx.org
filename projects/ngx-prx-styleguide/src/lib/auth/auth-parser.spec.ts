import { AuthParser } from './auth-parser';

describe('AuthUrls', () => {

  it('parses url params', () => {
    expect(AuthParser.parseToken('toke=n&access_token=foobar&hello')).toEqual('foobar');
  });

  it('gives undefined for invalid strings', () => {
    expect(AuthParser.parseToken('oetu7&&94ho=8&')).toBeUndefined();
  });

  it('handles blank input', () => {
    expect(AuthParser.parseToken('')).toBeUndefined();
  });

});
