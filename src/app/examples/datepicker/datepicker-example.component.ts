import { Component } from '@angular/core';

@Component({
  selector: 'app-datepicker-example',
  template: `
    <section>
      <ul>
        <li>The prx-datepicker is an ng2 wrapper for <a href="https://github.com/dbushell/Pikaday">Pikaday</a></li>
        <li>
          It takes an optional Input <code>date</code> of type <code>Date</code> and an optional
          Output that has a parameter of type <code>Date</code>
        </li>
        <li>
          If a date has been selected or entered by the user, the datepicker's input control will have the class <code>changed</code>.
        </li>
        <li>
          If the user enters an invalid date, the datepicker's input control will have the class <code>invalid</code>.
        </li>
      </ul>
      <prx-datepicker [date]="today" (dateChange)="onDateChange($event)"></prx-datepicker>
    </section>
  `
})

export class DatepickerExampleComponent {
  today = new Date();

  onDateChange(value: Date) {
    console.log(value + 'is an instanceof Date === ' + (value instanceof Date));
  }
}
