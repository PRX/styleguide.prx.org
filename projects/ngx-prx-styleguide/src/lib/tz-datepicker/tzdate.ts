import momentNs from 'moment';
import 'moment-timezone/moment-timezone';
const moment = momentNs;

export class TzDate {
  constructor(
    pickerDate: Date,
    time: string,
    tz: string,
    meridiem: string = null
  ) {
    this.tz = tz
    this.pickerDate = pickerDate
    this.time = time
    this.meridiem = meridiem
  }

  private _tz: string;
  public set tz(value) { this._tz = value }
  public get tz() { return this._tz }

  private _date: Date;
  public set pickerDate(value) { this._date = value }
  public get pickerDate() { return this._date }

  private _time: string;
  public set time(value) { this._time = value }
  public get time() { return this._time }

  private _meridiem: string;
  public set meridiem(value) { this._meridiem = value }
  public get meridiem() { return this._meridiem }

  public get isoDateString() {
    const year = this.pickerDate.getFullYear()
    const month = this.pickerDate.getMonth() + 1
    const monthString = month < 10 ? '0'+month : month
    const date = this.pickerDate.getDate()
    const dateString = date < 10 ? '0'+date : date
    return `${year}-${monthString}-${dateString}`
  }

  public get twentyFourHourTime() {
    if(!this.meridiem) { return this.time }
    return moment(`${this.time} ${this.meridiem}`, "hh:mm:ss A").format("HH:mm:ss")
  }

  public get finalDate() {
    let dateInvalid = !moment(this.isoDateString, 'YYYY-MM-DD').isValid()
    const isoTimestamp = `${this.isoDateString} ${this.twentyFourHourTime}`
    let timeInvalid = dateInvalid = !moment(isoTimestamp, moment.ISO_8601).isValid()
    let timezoneInvalid = this.tz === null || this.tz.length === 0
    if(timezoneInvalid || timeInvalid || dateInvalid) {
      return undefined;
    }
    const momentDate = moment.tz(isoTimestamp, this.tz)
    return momentDate.toDate()
  }
}