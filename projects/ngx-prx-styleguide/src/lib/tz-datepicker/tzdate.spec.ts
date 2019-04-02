import { TzDate } from './tzdate';

describe('TzDate', () => {
  it('converts 12 to 24 hour time properly', () => {
    const tzdate = new TzDate(new Date(Date.UTC(2014, 2, 16)), '12:00:00', 'America/Chicago', 'AM');
    expect(tzdate.twentyFourHourTime).toBe('00:00:00');
  });
});
