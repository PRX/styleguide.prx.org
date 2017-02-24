import { Component } from '@angular/core';

require('pikaday/css/pikaday.css');
require('pikaday/css/triangle.css');
require('./global-styles.css');

@Component({
  selector: 'prx-styleguide',
  template: `<prx-datepicker 
              [date]="today" (dateChange)="dateChange($event)">
            </prx-datepicker>`
})
export class AppComponent {
  today = new Date();

  dateChange(value: Date) {
    console.log(value + 'is an instanceof Date === ' + (value instanceof Date));
  }
}
