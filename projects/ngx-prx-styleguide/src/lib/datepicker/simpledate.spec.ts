import { SimpleDate } from './simpledate';

describe('SimpleDate', () => {

  it('parses date strings', () => {
    expect(new SimpleDate('2019-04-01').toArray()).toEqual([2019, 3, 1]);
    expect(new SimpleDate('2019-04-02').toArray()).toEqual([2019, 3, 2]);
    expect(new SimpleDate('2019-04-01', true).toArray()).toEqual([2019, 2, 31]);
    expect(new SimpleDate('2019-04-02', true).toArray()).toEqual([2019, 3, 1]);
  });

  it('parses dates', () => {
    const d1 = new Date('2019-04-01T00:00:00Z');
    const d2 = new Date('2019-04-02T00:00:00Z');
    expect(new SimpleDate(d1).toArray()).toEqual([2019, 3, 1]);
    expect(new SimpleDate(d2).toArray()).toEqual([2019, 3, 2]);
    expect(new SimpleDate(d1, true).toArray()).toEqual([2019, 2, 31]);
    expect(new SimpleDate(d2, true).toArray()).toEqual([2019, 3, 1]);
  });

  it('stringifies', () => {
    expect(new SimpleDate('2019-04-01').toString()).toEqual('2019-04-01');
    expect(new SimpleDate('2019-04-02').toString()).toEqual('2019-04-02');
    expect(new SimpleDate('2019-04-01', true).toString()).toEqual('2019-03-31');
    expect(new SimpleDate('2019-04-02', true).toString()).toEqual('2019-04-01');
  });

  it('checks for equality', () => {
    const date = new SimpleDate('2019-04-01T00:00:00Z');
    expect(date).toEqual(new SimpleDate('2019-04-01'));
    expect(date).not.toEqual(new SimpleDate('2019-04-02'));
    expect(date).toEqual(new SimpleDate('2019-04-01T01:23:45Z'));
    expect(date).toEqual(new SimpleDate('2019-04-01T23:59:59Z'));
    expect(date).not.toEqual(new SimpleDate('2019-04-01', true));
    expect(date).toEqual(new SimpleDate('2019-04-02', true));
  });

  it('sorts', () => {
    const dates = [
      new SimpleDate('2019-04-01'),
      new SimpleDate('2019-02-22'),
      new SimpleDate('2017-12-31'),
      new SimpleDate('2018-05-01'),
    ];
    expect(dates.sort().map(d => `${d}`)).toEqual([
      '2017-12-31',
      '2018-05-01',
      '2019-02-22',
      '2019-04-01',
    ]);
  });

  it('converts back to UTC dates', () => {
    const date = new SimpleDate('2019-04-01');
    expect(date.toUTCDate().toISOString()).toEqual('2019-04-01T00:00:00.000Z');
    expect(date.toUTCDate(11, 0, 22, 33).toISOString()).toEqual('2019-04-01T11:00:22.033Z');
  });

  it('converts back to locale dates', () => {
    const myOffset = new Date().getTimezoneOffset() / 60;
    const date = new SimpleDate('2019-04-01');

    const h1 = ('0' + myOffset).substr(-2, 2);
    expect(date.toLocaleDate().toISOString()).toEqual(`2019-04-01T${h1}:00:00.000Z`);

    const h2 = ('0' + (myOffset + 1)).substr(-2, 2);
    expect(date.toLocaleDate(1, 22, 33, 44).toISOString()).toEqual(`2019-04-01T${h2}:22:33.044Z`);
  });

});
