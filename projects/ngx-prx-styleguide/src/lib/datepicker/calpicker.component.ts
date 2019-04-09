import { Component, AfterViewInit, OnChanges, Input, Output, EventEmitter,
  ViewChild, ElementRef } from '@angular/core';
import * as Pikaday from 'pikaday';
import { SimpleDate } from './simpledate';

// patch pikaday to show up to 12 months
// https://github.com/Pikaday/Pikaday/issues/749
const originalConfig = Pikaday.prototype.config;
Pikaday.prototype.config = function(options) {
  const opts = originalConfig.apply(this, [options]);
  if (options.numberOfMonths) {
    opts.numberOfMonths = Math.min(options.numberOfMonths, 12);
  }
  return opts;
};

/**
 * Multiple date-picking via a single calendar
 */
@Component({
  selector: 'prx-calpicker',
  template: '<input type="text" class="hidden" #textinput/><div #container></div>',
  styleUrls: ['./calpicker.component.css']
})

export class CalpickerComponent implements AfterViewInit, OnChanges {

  @ViewChild('textinput') textinput: ElementRef;
  @ViewChild('container') container: ElementRef;

  @Input() dates: SimpleDate[] = [];
  @Output() datesChange = new EventEmitter<SimpleDate[]>();

  @Input() months = 3;
  @Input() minDate: SimpleDate;
  @Input() maxDate: SimpleDate;
  @Input() defaultDate: SimpleDate;

  private picker: Pikaday;

  get options(): Pikaday.PikadayOptions {
    return {
      field: this.textinput.nativeElement,
      container: this.container.nativeElement,
      theme: 'calpicker',
      firstDay: 0,
      bound: false,
      keyboardInput: false, // doesn't work with this yet
      onSelect: (date) => this.onSelect(date),
      numberOfMonths: this.months,
      minDate: this.minDate ? this.minDate.toLocaleDate() : null,
      maxDate: this.maxDate ? this.maxDate.toLocaleDate() : null,
      defaultDate: this.defaultDate ? this.defaultDate.toLocaleDate() : null,
      events: this.datesInLocale(),
    };
  }

  datesInLocale() {
    return this.dates.map(d => d.toLocaleDate().toDateString());
  }

  ngAfterViewInit() {
    this.picker = new Pikaday(this.options);
  }

  ngOnChanges(changes: any) {
    if (this.picker) {
      if (changes.defaultDate && !changes.defaultDate.firstChange) {
        this.picker.destroy();
        this.picker = new Pikaday(this.options);
      } else {
        this.picker.config(this.options);
      }
    }
  }

  onSelect(date: Date) {
    const selected = new SimpleDate(date, true);

    // add or remove selected date
    const index = this.dates.findIndex(d => d.equals(selected));
    if (index > -1) {
      this.dates.splice(index, 1);
    } else {
      this.dates.push(selected);
    }
    this.dates.sort();

    // redraw pikaday and emit changes
    this.picker.config(this.options);
    this.picker.setDate(null);
    this.datesChange.emit(this.dates);
  }

}
