import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as Pikaday from 'pikaday';
import * as moment from 'moment';

@Component({
  selector: 'prx-datepicker',
  template: `
    <span class="input-group">
      <input type="text" #datepicker [value]="formattedDate" 
        [class.changed]="changed" [class.invalid]="invalid" (input)="setWhenValid($event.target.value)">
      <span class="input-group-addon" (click)="datepicker.click()"><i class="icon-calendar"></i></span>
    </span>
  `,
  styleUrls: ['./datepicker.component.css']
})

export class DatepickerComponent implements AfterViewInit {
  public static FORMAT = 'MM/DD/YYYY';

  @Input() date: Date;
  @Output() dateChange = new EventEmitter<Date>();

  @ViewChild('datepicker') input: ElementRef;

  picker: Pikaday;

  changed = false;

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
    this.changed = true;
    this.dateChange.emit(date);
  }
}
