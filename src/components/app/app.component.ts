import { Component } from '@angular/core';

require('!!style-loader!css-loader!pikaday/css/pikaday.css');
require('!!style-loader!css-loader!pikaday/css/triangle.css');
require('!!style-loader!css-loader!../../styles.css');

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
