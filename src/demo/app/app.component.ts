import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <h1>PRX Styleguide Demo</h1>
    <section>
      <h2>Date Picker</h2>
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
      <span class="changed" *ngIf="dateChanged">Changed: {{dateChanged}}</span>
    </section>
    <section>
      <h2>Time Picker</h2>
      <ul>
        <li>Something something blah blah blah.</li>
      </ul>
      <prx-timepicker [date]="today" (timeChange)="onTimeChange($event)"></prx-timepicker>
      <span class="changed" *ngIf="timeChanged">Changed: {{timeChanged}}</span>
    </section>
  `,
})
export class AppComponent {

  today = new Date();
  dateChanged: string;
  timeChanged: string;

  onDateChange(value: Date) {
    this.dateChanged = value.toString();
  }

  onTimeChange(value: Date) {
    this.timeChanged = value.toString();
  }

}
