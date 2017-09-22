import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'datepicker-demo',
  template: `
    <section class="main demo">
      <h1>Datepicker Module</h1>
      <section>
        <h2>Date Picker</h2>
        <p>The prx-datepicker is an ng2 wrapper for <a href="https://github.com/dbushell/Pikaday">Pikaday</a></p>
        <dl>
          <dt>selector</dt><dd><code>prx-datepicker</code></dd>
        </dl>
        <ul>
          <li>
            <code>@Input() date: Date</code> (optional) bound input to sets datepicker date
          </li>
          <li>
           <code>@Output() dateChange: EventEmitter&lt;Date&gt;</code> (optional) emitted when date is selected
          </li>
          <li>
            <code>@Input() changed: boolean</code> (optional) if true, applies the class changed to the <code>input</code> element
          </li>
          <li>
            If the user enters an invalid date, the datepicker's input control will have the class <code>invalid</code>.
          </li>
        </ul>
        <aside>
          Usage:
          <pre class="code">
            &lt;prx-datepicker [date]="today" (dateChange)="onDateChange($event)"&gt;&lt;/prx-datepicker&gt;
          </pre>
          Example:
          <prx-datepicker [date]="today" (dateChange)="onDateChange($event)"></prx-datepicker>
          <span class="changed" *ngIf="dateChanged">Changed: {{dateChanged}}</span>
          <hr>
          <div>
            <p>Demonstrating changing bound <code>@Input() date</code></p>
            <button (click)="timeTravel(-1, 'weeks')">Go Back One Week</button>
            <button (click)="timeTravel(-1, 'months')">Go Back One Month</button>
            <button (click)="timeTravel(-1, 'years')">Go Back One Year</button>
          </div>
        </aside>
      </section>
      <section>
        <h2>Time Picker</h2>
        <ul>
          <li>Something something blah blah blah.</li>
        </ul>
        <prx-timepicker [date]="today" (timeChange)="onTimeChange($event)"></prx-timepicker>
        <span class="changed" *ngIf="timeChanged">Changed: {{timeChanged}}</span>
      </section>
    </section>
  `,
  styles: ['.changed { padding-left: 20px; font-style: italic;}']
})
export class DatepickerDemoComponent {

  today = new Date();
  dateChanged: string;
  timeChanged: string;

  onDateChange(value: Date) {
    this.today = value;
    this.dateChanged = value.toString();
  }

  onTimeChange(value: Date) {
    this.timeChanged = value.toString();
  }

  timeTravel(howMuch: number, period: string) {
    this.today = moment(this.today).add(howMuch, period).toDate();
  }
}
