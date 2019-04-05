/**
 * Date without a time/timezone
 */
export class SimpleDate {

  private fullYear: number;
  private zeroIndexedMonth: number;
  private oneIndexedDate: number;

  constructor(value: string | Date, useLocaleTime = false) {
    if (typeof(value) === 'string') {
      value = new Date(value);
    }
    if (value.valueOf()) {
      if (useLocaleTime) {
        this.fullYear = value.getFullYear();
        this.zeroIndexedMonth = value.getMonth();
        this.oneIndexedDate = value.getDate();
      } else {
        this.fullYear = value.getUTCFullYear();
        this.zeroIndexedMonth = value.getUTCMonth();
        this.oneIndexedDate = value.getUTCDate();
      }
    } else {
      throw new Error(`Invalid SimpleDate value: ${value}`);
    }
  }

  equals(date: SimpleDate) {
    return this.toString() === date.toString();
  }

  toString() {
    const month = ('0' + (this.zeroIndexedMonth + 1)).substr(-2, 2);
    const date = ('0' + this.oneIndexedDate).substr(-2, 2);
    return `${this.fullYear}-${month}-${date}`;
  }

  toArray() {
    return [this.fullYear, this.zeroIndexedMonth, this.oneIndexedDate];
  }

  toUTCDate(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
    const date = new Date(this.toString());
    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);
    date.setUTCSeconds(seconds);
    date.setUTCMilliseconds(milliseconds);
    return date;
  }

  toLocaleDate(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
    const date = new Date(this.fullYear, this.zeroIndexedMonth, this.oneIndexedDate);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    date.setMilliseconds(milliseconds);
    return date;
  }

  // TODO: ability to convert to explicit timezone
  // toTimezoneDate(timezone, offsetHours = 0, offsetMinutes = 0, offsetSeconds = 0) {
  //   return null;
  // }

}
