import { REQUIRED, LENGTH, IN, FALSEY, TOKENY, URL } from './base.invalid';

describe('BaseInvalid', () => {

  describe('REQUIRED', () => {

    it('checks for existence', () => {
      expect(REQUIRED()('fldname', null, true)).toMatch('is a required field');
      expect(REQUIRED()('fldname', false, true)).toMatch('is a required field');
      expect(REQUIRED()('fldname', true, true)).toBeNull();
    });

    it('checks for length', () => {
      expect(REQUIRED()('fldname', [], true)).toMatch('is a required field');
      expect(REQUIRED()('fldname', '', true)).toMatch('is a required field');
      expect(REQUIRED()('fldname', [true], true)).toBeNull();
    });

    it('only runs when strict', () => {
      expect(REQUIRED()('fldname', null, false)).toBeNull();
      expect(REQUIRED()('fldname', null, true)).toMatch('is a required field');
    });

  });

  describe('LENGTH', () => {

    it('checks the lowerbound', () => {
      expect(LENGTH(3)('fldname', '')).toBeNull();
      expect(LENGTH(3)('fldname', '12')).toMatch('is too short');
      expect(LENGTH(3)('fldname', '123')).toBeNull();
    });

    it('optionally checks the upperbound', () => {
      expect(LENGTH(2, 4)('fldname', '1')).toMatch('is too short');
      expect(LENGTH(2, 4)('fldname', '12345')).toMatch('is too long');
      expect(LENGTH(2, 4)('fldname', '1234')).toBeNull();
    });

  });

  describe('IN', () => {

    it('makes sure the value is in an array', () => {
      expect(IN([3, 6])('fldname', 2)).toMatch('is not a valid value');
      expect(IN([3, 6])('fldname', 5)).toMatch('is not a valid value');
      expect(IN([3, 6])('fldname', 6)).toBeNull();
    });

  });

  describe('FALSEY', () => {

    it('just checks for falsey-ness', () => {
      expect(FALSEY('hello there')('fldname', true)).toMatch('hello there');
      expect(FALSEY('hello there')('fldname', 'h')).toMatch('hello there');
      expect(FALSEY('hello there')('fldname', '')).toBeNull();
      expect(FALSEY('hello there')('fldname', null)).toBeNull();
    });

  });

  describe('TOKENY', () => {

    it('checks for token-like strings', () => {
      expect(TOKENY()('fldname', '')).toBeNull();
      expect(TOKENY()('fldname', 'something2')).toBeNull();
      expect(TOKENY()('fldname', 'some_thing2')).toBeNull();
      expect(TOKENY()('fldname', 'some-thing2')).toMatch(/not a valid token/i);
      expect(TOKENY()('fldname', 'some.thing2')).toMatch(/not a valid token/i);
      expect(TOKENY()('fldname', 'some&thing2')).toMatch(/not a valid token/i);
    });

  });

  describe('URL', () => {

    it('checks for valid urls', () => {
      expect(URL()('fldname', '')).toBeNull();
      expect(URL()('fldname', 'foobar')).toMatch(/is not a valid url/i);
      expect(URL()('fldname', 'ftp://blah.gov')).toMatch(/is not a valid url/i);
      expect(URL()('fldname', 'http://blah')).toMatch(/is not a valid url/i);
      expect(URL()('fldname', 'http://blah.gov')).toBeNull();
      expect(URL()('fldname', 'https://blah.gov')).toBeNull();
      expect(URL()('fldname', 'https://blah.gov/with/a/path')).toBeNull();
      expect(URL()('fldname', 'https://blah.gov/with/a/path?and=query&parameters#blah')).toBeNull();
      expect(URL()('fldname', 'https://blah/with/****()')).toMatch(/is not a valid url/i);
    });

    it('does not allow starting/trailing spaces', () => {
      expect(URL()('fldname', ' http://blah.gov')).toMatch(/is not a valid url/i);
      expect(URL()('fldname', 'https://blah.gov ')).toMatch(/is not a valid url/i);
    });

  });

});
