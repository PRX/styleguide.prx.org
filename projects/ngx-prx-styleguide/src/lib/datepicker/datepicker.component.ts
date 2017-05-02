import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild,
  ViewEncapsulation, ElementRef } from '@angular/core';

import * as rawPikaday from 'pikaday';
const Pikaday = (rawPikaday as any).default ? (rawPikaday as any).default : rawPikaday;

import * as rawMoment from 'moment';
const moment = (rawMoment as any).default ? (rawMoment as any).default : rawMoment;

@Component({
  moduleId: module.id,
  selector: 'prx-datepicker',
  templateUrl: './datepicker.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    // TODO: only works in dev server; not in build/test
    '../../../../node_modules/pikaday/css/pikaday.css',
    './datepicker.component.css',
  ]
})

export class DatepickerComponent implements AfterViewInit {
  public static FORMAT = 'MM/DD/YYYY';

  @Input() date: Date;
  @Output() dateChange = new EventEmitter<Date>();
  @Input() changed: boolean;
  @ViewChild('datepicker') input: ElementRef;

  picker: Pikaday;

  get formattedDate(): string {
    if (this.date) {
      return moment(this.date.valueOf()).format(DatepickerComponent.FORMAT);
    } else {
      return '';
    }
  }

  get invalid(): boolean {
    return this.input.nativeElement.value.length > 0 &&
      !moment(this.input.nativeElement.value, DatepickerComponent.FORMAT, true).isValid();
  }

  setWhenValid(value: string) {
    if (moment(value, DatepickerComponent.FORMAT, true).isValid()) {
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
        this.setDate(this.picker.getDate());
      }
    };
    if (this.date) {
      options['defaultDate'] = new Date(this.date.valueOf());
      options['setDefaultDate'] = true;
    }
    this.picker = new Pikaday(options);
  }

  setDate(date: Date) {
    if (this.date) {
      date.setHours(new Date(this.date.valueOf()).getHours());
      date.setMinutes(new Date(this.date.valueOf()).getMinutes());
    }
    this.dateChange.emit(date);
  }
}
