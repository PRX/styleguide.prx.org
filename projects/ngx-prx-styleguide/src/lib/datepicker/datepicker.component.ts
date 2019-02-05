import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild,
  ElementRef } from '@angular/core';

import * as rawPikaday from 'pikaday';
const Pikaday = (rawPikaday as any).default ? (rawPikaday as any).default : rawPikaday;

import * as rawMoment from 'moment';
const moment = (rawMoment as any).default ? (rawMoment as any).default : rawMoment;

/**
 * TODO: parent project must include (in .angular-cli.json):
 *   ../node_modules/pikaday/css/pikaday.css
 *   ../node_modules/pikaday/css/triangle.css
 */
@Component({
  selector: 'prx-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})

export class DatepickerComponent implements AfterViewInit {
  @Input() format = 'MM/DD/YYYY';
  @Input() container: ElementRef;

  _date: Date;
  @Input()
  set date(value: Date) {
    if (this.dateDefinedAndChanged(value)) {
      this._date = new Date(value.valueOf());
      if (this.picker) {
        // if UTC, adjust picker date accordingly
        const pickerDate = this.UTC ? this.pickerUTCOffset(this._date) : this._date;
        this.picker.setDate(pickerDate);
      }
    }
  }
  get date() { return this._date; }
  @Output() dateChange = new EventEmitter<Date>();
  @Input() changed: boolean;
  @Input() UTC = false;
  @ViewChild('datepicker') input: ElementRef;

  picker: Pikaday;

  dateDefinedAndChanged(value: Date) {
    return value && (!this._date || this._date.valueOf() !== value.valueOf());
  }

  get formattedDate(): string {
    if (this._date && this.UTC) {
      return moment(this._date.valueOf()).utc().format(this.format);
    } else if (this._date) {
      return moment(this._date.valueOf()).format(this.format);
    } else {
      return '';
    }
  }

  get invalid(): boolean {
    return this.input.nativeElement.value.length > 0 &&
      !moment(this.input.nativeElement.value, this.format, true).isValid();
  }

  setWhenValid(value: string) {
    if (moment(value, this.format, true).isValid() &&
      (!this._date || this.picker.getDate().valueOf() !== this._date.valueOf())) {
      let date = new Date(value);
      if (this.UTC) {
        date = this.pickerUTCOffset(date);
      }
      this.picker.setDate(date);
      this.setDate(date);
    }
  }

  ngAfterViewInit() {
    let options = {
      field: this.input.nativeElement,
      format: this.format,
      theme: 'triangle-theme',
      onSelect: () => {
        if (!this._date || this._date.valueOf() !== this.picker.getDate().valueOf()) {
          this.setDate(this.picker.getDate());
        }
      }
    };
    if (this.container) {
      options['bound'] = false;
      options['container'] = this.container.nativeElement;
      options.theme += ' container';
    }
    if (this._date) {
      // if UTC, adjust picker date accordingly
      options['defaultDate'] = this.UTC ? this.pickerUTCOffset(this._date) : new Date(this._date.valueOf());
      options['setDefaultDate'] = true;
    }
    this.picker = new Pikaday(options);
  }

  pickerUTCOffset(date: Date) {
    return new Date(date.valueOf() + 1000 * 60 * date.getTimezoneOffset());
  }

  setDate(value: Date) {
    let newValue;
    const year = value.getFullYear(), month = value.getMonth(), date = value.getDate();
    let hour, minute, second, millisecond;
    if (this._date && this.UTC) {
      hour = this._date.getUTCHours();
      minute = this._date.getUTCMinutes();
      second = this._date.getUTCSeconds();
      millisecond = this._date.getUTCMilliseconds();
    } else if (this._date) {
      hour = this._date.getHours();
      minute = this._date.getMinutes();
      second = this._date.getSeconds();
      millisecond = this._date.getMilliseconds();
    } else {
      hour = minute = second = millisecond = 0;
    }
    if (this.UTC) {
      newValue = new Date(Date.UTC(year, month, date, hour, minute, second, millisecond));
    } else {
      newValue = new Date(year, month, date, hour, minute, second, millisecond);
    }
    this._date = newValue;
    this.dateChange.emit(newValue);
  }
}
