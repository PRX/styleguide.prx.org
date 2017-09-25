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
  moduleId: module.id,
  selector: 'prx-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})

export class DatepickerComponent implements AfterViewInit {
  public static FORMAT = 'MM/DD/YYYY';

  _date: Date;
  @Input()
  set date(value: Date) {
    if (this.dateDefinedAndChanged(value)) {
      this._date = new Date(value.valueOf());
      if (this.picker) {
        this.picker.setDate(this._date);
      }
    }
  }
  get date() { return this._date; }
  @Output() dateChange = new EventEmitter<Date>();
  @Input() changed: boolean;
  @ViewChild('datepicker') input: ElementRef;

  picker: Pikaday;

  dateDefinedAndChanged(value: Date) {
    return value && (!this.date || this._date.valueOf() !== value.valueOf());
  }

  get formattedDate(): string {
    if (this._date) {
      return moment(this._date.valueOf()).format(DatepickerComponent.FORMAT);
    } else {
      return '';
    }
  }

  get invalid(): boolean {
    return this.input.nativeElement.value.length > 0 &&
      !moment(this.input.nativeElement.value, DatepickerComponent.FORMAT, true).isValid();
  }

  setWhenValid(value: string) {
    if (moment(value, DatepickerComponent.FORMAT, true).isValid() &&
      (!this._date || this.picker.getDate().valueOf() !== this._date.valueOf())) {
      let date = new Date(value);
      this.picker.setDate(date);
      this.setDate(date);
    }
  }

  ngAfterViewInit() {
    let options = {
      field: this.input.nativeElement,
      format: DatepickerComponent.FORMAT,
      theme: 'triangle-theme',
      onSelect: () => {
        if (!this._date || this._date.valueOf() !== this.picker.getDate().valueOf()) {
          this.setDate(this.picker.getDate());
        }
      }
    };
    if (this._date) {
      options['defaultDate'] = new Date(this._date.valueOf());
      options['setDefaultDate'] = true;
    }
    this.picker = new Pikaday(options);
  }

  setDate(date: Date) {
    let newValue = new Date(date.valueOf());
    if (this._date) {
      newValue.setHours(this._date.getHours());
      newValue.setMinutes(this._date.getMinutes());
      newValue.setSeconds(this._date.getSeconds());
      newValue.setMilliseconds(this._date.getMilliseconds());
    }
    this._date = newValue;
    this.dateChange.emit(newValue);
  }
}
