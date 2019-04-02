import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

/**
 * TODO: parent project must include (in .angular-cli.json):
 *   ../node_modules/pikaday/css/pikaday.css
 *   ../node_modules/pikaday/css/triangle.css
 */
@Component({
  selector: 'prx-daterange',
  template: `
    <div class="picker">
      <prx-datepicker [format]="format" [date]="from" [maxDate]="to" [container]="fromDateEl"
        [UTC]="UTC" (dateChange)="onFromDateChange($event)"></prx-datepicker>
      <label>From:</label>
      <div #fromDate></div>
    </div>
    <div class="picker">
      <prx-datepicker [format]="format" [date]="to" [minDate]="from" [container]="toDateEl"
        [UTC]="UTC" (dateChange)="onToDateChange($event)"></prx-datepicker>
      <label>To:</label>
      <div #toDate></div>
    </div>
  `,
  styleUrls: ['./daterange.component.css']
})

export class DaterangeComponent {
  @Input() format = 'YYYY-MM-DD';
  @Input() from: Date;
  @Input() to: Date;
  @Input() UTC = false;
  @Output() rangeChange = new EventEmitter<{from: Date, to: Date}>();
  @ViewChild('fromDate') fromDateEl: ElementRef;
  @ViewChild('toDate') toDateEl: ElementRef;

  onFromDateChange(from: Date) {
    this.from = from;
    this.rangeChange.emit({from: this.from, to: this.to});
  }

  onToDateChange(to: Date) {
    this.to = to;
    this.rangeChange.emit({from: this.from, to: this.to});
  }
}
