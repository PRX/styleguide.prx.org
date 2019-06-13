import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild,
  ElementRef } from '@angular/core';

import * as Pikaday from 'pikaday';

// This artifice seems to be necessary to appease both Webpack and Rollup https://github.com/ng-packagr/ng-packagr/issues/163
import * as momentNs from 'moment-timezone';
const moment = momentNs;

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
    } else if (!value) {
      this._date = null;
      if (this.picker) {
        this.picker.setDate(null);
      }
    }
  }
  get date() { return this._date; }

  _minDate: Date;
  @Input()
  set minDate(value: Date) {
    const hasChanged = value && (!this._minDate || this._minDate.valueOf() !== value.valueOf());

    if (hasChanged) {
      this._minDate = new Date(value.valueOf());
      if (this.picker) {
        this.picker.setMinDate(this._minDate);
      }
    }
  }
  get minDate() { return this._minDate; }

  _maxDate: Date;
  @Input()
  set maxDate(value: Date) {
    const hasChanged = value && (!this._maxDate || this._maxDate.valueOf() !== value.valueOf());

    if (hasChanged) {
      this._maxDate = new Date(value.valueOf());
      if (this.picker) {
        this.picker.setMaxDate(this._maxDate);
      }
    }
  }
  get maxDate() { return this._maxDate; }

  @Input() changed: boolean;
  @Input() UTC = false;
  @Output() dateChange = new EventEmitter<Date>();
  @ViewChild('datepicker') input: ElementRef;

  picker: Pikaday;

  dateDefinedAndChanged(value: Date) {
    return value &&
      /* !Invalid Date */ !isNaN(value.valueOf()) &&
      /* changed or not previously set */ (!this._date || this._date.valueOf() !== value.valueOf());
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
      this.setDate(date);
      if (this.UTC) {
        date = this.pickerUTCOffset(this.date);
      }
      this.picker.setDate(date);
    }
  }

  ngAfterViewInit() {
    const options: Pikaday.PikadayOptions = {
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
      options.bound = false;
      options.container = this.container.nativeElement;
      options.theme += ' container';
    }

    if (this._date) {
      // if UTC, adjust picker date accordingly
      options.defaultDate = this.UTC ? this.pickerUTCOffset(this._date) : new Date(this._date.valueOf());
      options.setDefaultDate = true;
    }

    if (this._minDate) {
      options.minDate = new Date(this._minDate.valueOf());
    }

    if (this._maxDate) {
      options.maxDate = new Date(this._maxDate.valueOf());
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
    if (!this._date || this._date.valueOf() !== newValue.valueOf()) {
      this._date = newValue;
      this.dateChange.emit(newValue);
    }
  }
}
