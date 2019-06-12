import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TzDate } from './tzdate';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { TzDataService } from './tz-data.service';

import * as momentNs from 'moment-timezone';
const moment = momentNs;

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
      <ng-container *ngIf="!supportsTimeInput; else supportsTime">
        <input
          [class.changed]="changed"
          [(ngModel)]="model.time"
          (ngModelChange)="handleChange()"
          name="time"
          placeholder="08:00:00"
          #timestamp="ngModel"
          prxTzTimestamp="hh:mm:ss"
          required
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
        <p class="error" *ngIf="timestamp.errors">
          <ng-container *ngIf="timestamp.errors.required; else tzError">
            Timestamp is required
          </ng-container>
          <ng-template #tzError>
            Timestamp must be between 01:00:00 and 12:59:59
          </ng-template>
        </p>
      </ng-container>
      <ng-template #supportsTime>
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
      </ng-template>
      <ng-select
        required
        ngDefaultControl
        name="timezone"
        [class.changed]="changed"
        [items]="timezones | async"
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
    if (this.model) { // only set model after init with timezone
      this.model = this.modelFromDate(value);
    }
  }
  get date() {
    return this.model && this.model.finalDate ? this.model.finalDate : this._date;
  }
  @Output() dateChange = new EventEmitter<Date>();
  @Input() changed: boolean;

  supportsTimeInput = false;

  timezones: Observable<{label: string, name: string}[]>;

  constructor(private tzDataSvc: TzDataService) {}

  ngOnInit() {
    this.supportsTimeInput = this.checkDateInput();

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
        }),
        // TODO: shareReplay is more appropriate and not bugged in 6.4.0
        // https://github.com/ReactiveX/rxjs/issues/3336
        publishReplay(1),
        refCount()
      );
    this.timezones.subscribe({
      error: err => console.error('Timezone data failed to load: ' + err),
      complete: () => {
        this.model = this.modelFromDate(this.date);
      }
    });
  }

  modelFromDate(date) {
    const timezone = this.model && this.model.tz ? this.model.tz : moment.tz.guess();
    if (date) {
      const momentDate = moment.tz(date, timezone);
      const timeString = this.supportsTimeInput ? momentDate.format('HH:mm:ss') : momentDate.format('hh:mm:ss');
      const meridiem = this.supportsTimeInput ? null : momentDate.format('A');
      return new TzDate(momentDate.toDate(), timeString, timezone, meridiem);
    } else {
      // no date or time set, only timezone
      return new TzDate(undefined, undefined, timezone);
    }
  }

  handleChange() {
    // if date is chosen when time has not been set, initialize the time to 12am (empty string allows user to clear time)
    if (this.model.pickerDate && !this.model.time && this.model.time !== '') {
      this.model = this.modelFromDate(this.model.pickerDate);
    }
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
}
