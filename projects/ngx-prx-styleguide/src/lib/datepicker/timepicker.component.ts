import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'prx-timepicker',
  template: `
    <select [class.changed]="changed"
      [ngModel]="time" (ngModelChange)="set($event)">
      <option *ngFor="let o of options" [value]="o">{{o}}</option>
    </select>
  `,
  styleUrls: ['./timepicker.component.css']
})

export class TimepickerComponent implements OnChanges {
  @Input() date: Date;
  @Output() timeChange = new EventEmitter<Date>();
  @Input() changed: boolean;
  @Input() UTC = false;

  timezone: string;
  options: string[];

  ngOnChanges() {
    const dayGen = new Date(1970, 0, 1, 0, 0, 0, 0);
    if (this.UTC) {
      this.timezone = '(GMT)';
    } else {
      const match = this.date ? this.date.toString().match(/(\([A-Za-z\s].*\))/) : dayGen.toString().match(/(\([A-Za-z\s].*\))/);
      if (match && match.length > 0) {
        this.timezone = match[1];
      }
    }
    const day = dayGen.getDate();
    this.options = [];
    while (dayGen.getDate() === day) {
      this.options.push(this.dateToHumanTime(dayGen, false));
      dayGen.setMinutes(dayGen.getMinutes() + 30);
    }
  }

  roundMinutes(value: number): string {
    return value >= 0 && value < 30 ? '00' : '30';
  }

  convert24to12Hours(hours: number): number {
    return hours % 12 === 0 ? 12 : hours % 12;
  }

  amPm(hours: number): string {
    return hours < 12 ? 'am' : 'pm';
  }

  dateToHumanTime(date: Date, UTC: boolean): string {
    const hours = UTC ? date.getUTCHours() : date.getHours();
    const minutes = UTC ? date.getUTCMinutes() : date.getMinutes();

    return this.convert24to12Hours(hours) + ':' +
      this.roundMinutes(minutes) +
      this.amPm(hours) +
      ' ' + this.timezone;
  }

  get time(): string {
    if (this.date) {
      return this.dateToHumanTime(new Date(this.date.valueOf()), this.UTC);
    }
  }

  set(value: string) {
    const date = this.date ? new Date(this.date.valueOf()) : new Date();
    let hours = +value.split(':')[0];
    if (hours < 12 && value.substr(value.indexOf(':') + 3, 2) === 'pm') {
      hours += 12;
    } else if (hours === 12 && value.substr(value.indexOf(':') + 3, 2) === 'am') {
      hours = 0;
    }
    if (this.UTC) {
      date.setUTCHours(hours);
      date.setUTCMinutes(+value.substr(value.indexOf(':') + 1, 2));
    } else {
      date.setHours(hours);
      date.setMinutes(+value.substr(value.indexOf(':') + 1, 2));
    }
    this.timeChange.emit(date);
  }
}
