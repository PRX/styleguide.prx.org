import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TzDate } from './tzdate';
import { map, share } from 'rxjs/operators';
import { TzDataService } from './tz-data.service';

import * as momentNs from 'moment-timezone'
const moment = momentNs

@Component({
  selector: 'prx-tz-datepicker',
  template: `
    <ng-container *ngIf="this.model">
      <prx-datepicker
        name="date"
        [date]="this.model.pickerDate"
        (dateChange)="this.model.pickerDate = $event; handleChange()"
        [changed]="changed"
      >
      </prx-datepicker>
      <ng-container *ngIf="!supportsTimeInput">
        <input
          [class.changed]="changed"
          [(ngModel)]="model.time"
          (ngModelChange)="handleChange()"
          name="time"
          placeholder="08:00:00"
          #timestamp="ngModel"
          prxTzTimestamp="hh:mm:ss"
        />
        <select
          [class.changed]="changed"
          [(ngModel)]="model.meridiem"
          (ngModelChange)="handleChange()"
          name="meridiem"
        >
          <option name="AM" value="AM">AM</option>
          <option name="PM" value="PM">PM</option>
        </select>
        <p class="error" *ngIf="timestamp.errors">Timestamp must be between 01:00:00 and 12:59:59</p>
      </ng-container>
      <ng-container *ngIf="supportsTimeInput">
        <input
          [class.changed]="changed"
          [(ngModel)]="model.time"
          (ngModelChange)="handleChange()"
          name="time"
          type="time"
          step="1"
          prxTzTimestamp="HH:mm:ss"
          required
        />
      </ng-container>
      <ng-select
        required
        ngDefaultControl
        name="timezone"
        [class.changed]="changed"
        [items]="this.timezones | async"
        bindLabel="label"
        bindValue="name"
        [(ngModel)]="model.tz"
        (ngModelChange)="handleChange()"
      >
      </ng-select>
    </ng-container>
  `,
  styleUrls: ['./tz-datepicker.component.css']
})
export class TzDatepickerComponent implements OnInit {
  model: TzDate;

  _date: Date;
  @Input()
  set date(value: Date) {
    this._date = value;
  }
  get date() {
    return this.model && this.model.finalDate ? this.model.finalDate : this._date;
  }
  @Output() dateChange = new EventEmitter<Date>();
  @Input() changed: boolean;

  supportsTimeInput = false;

  timeInvalid = false;
  dateInvalid = false;
  timezoneInvalid = false;

  pickerDateChanged = false;

  timezones;

  _pickerDate;
  isoDateString;

  constructor(private tzDataSvc: TzDataService) {
    this.supportsTimeInput = this.checkDateInput();
    this.tzDataSvc = tzDataSvc;
  }

  ngOnInit() {
    this.timezones = this.tzDataSvc
      .fetchTzs()
      .pipe(
        map(response => {
          moment.tz.load(response);
          const currDate = moment();
          const tzs = moment.tz.names();
          return tzs.map(tz => ({
            label: `${tz.replace('_', ' ')} (GMT ${currDate.tz(tz).format('Z')})`,
            name: tz
          }));
        })
      )
      .pipe(share());
    this.timezones.subscribe({
      error: err => console.error('Timezone data failed to load: ' + err),
      complete: () => {
        this.model = this.tzDateModelInit();
      }
    });
  }

  tzDateModelInit() {
    const userTimezone = moment.tz.guess();
    const momentDate = moment.tz(this.date, userTimezone);
    const timeString = this.supportsTimeInput ? momentDate.format('HH:mm:ss') : momentDate.format('hh:mm:ss');
    const meridiem = this.supportsTimeInput ? null : momentDate.format('A');
    return new TzDate(momentDate.toDate(), timeString, userTimezone, meridiem);
  }

  handleChange() {
    const finalDate = this.model.finalDate;
    if (finalDate && finalDate instanceof Date) {
      this.dateChange.emit(finalDate);
    }
  }

  checkDateInput() {
    const input = document.createElement('input');
    input.setAttribute('type', 'date');

    const notADateValue = 'not-a-date';
    input.setAttribute('value', notADateValue);

    return input.value !== notADateValue;
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
