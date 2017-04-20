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

  localTimezone: string;
  options: string[] = [];

  ngOnChanges() {
    let dayGen = new Date(1970, 0, 1, 0, 0, 0, 0);
    if (this.date) {
      this.localTimezone = this.date.toString().match(/(\([A-Za-z\s].*\))/)[1];
    } else {
      this.localTimezone = dayGen.toString().match(/(\([A-Za-z\s].*\))/)[1];
    }
    let day = dayGen.getDate();
    while (dayGen.getDate() === day) {
      this.options.push(this.dateToHumanTime(dayGen));
      dayGen.setMinutes(dayGen.getMinutes() + 30);
    }
  }

  roundMinutes(value: number): string {
    return value > 0 && value <= 30 ? '30' : '00';
  }

  convert24to12Hours(hours: number): number {
    return hours % 12 === 0 ? 12 : hours % 12;
  }

  amPm(hours: number): string {
    return hours < 12 ? 'am' : 'pm';
  }

  dateToHumanTime(date: Date): string {
    return this.convert24to12Hours(date.getHours()) + ':' +
      this.roundMinutes(date.getMinutes()) +
      this.amPm(date.getHours()) +
      ' ' + this.localTimezone;
  }

  get time(): string {
    if (this.date) {
      return this.dateToHumanTime(new Date(this.date.valueOf()));
    }
  }

  set(value: string) {
    let date = this.date ? new Date(this.date.valueOf()) : new Date();
    let hours = +value.split(':')[0];
    if (hours < 12 && value.substr(value.indexOf(':') + 3, 2) === 'pm') {
      hours += 12;
    } else if (hours === 12 && value.substr(value.indexOf(':') + 3, 2) === 'am') {
      hours = 0;
    }
    date.setHours(hours);
    date.setMinutes(+value.substr(value.indexOf(':') + 1, 2));
    this.timeChange.emit(date);
  }
}
