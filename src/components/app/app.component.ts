import { Component } from '@angular/core';


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
