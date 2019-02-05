import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'datepicker-demo',
  template: `
    <section class="main demo">
      <h1>Date Picker</h1>
      <p>The prx-datepicker is an ng2 wrapper for <a href="https://github.com/dbushell/Pikaday">Pikaday</a></p>
      <dl>
        <dt>module</dt><dd><code>DatepickerModule</code></dd>
        <dt>selector</dt><dd><code>prx-datepicker</code></dd>
      </dl>
      <ul>
        <li>
          <code>@Input() format: string</code> (optional) sets the datepicker format shown in the form field.
          Formatting options are <a href="https://momentjs.com/docs/#/displaying/format/">moment</a> based. Defaults to MM/DD/YYYY
        </li>
        <li>
          <code>@Input() container: ElementRef</code> (optional) an element reference for an always open calendar picker
        </li>
        <li>
          <code>@Input() date: Date</code> (optional) sets datepicker date
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
      </aside>
      <aside>
        <p>Demonstrating changing bound <code>@Input() date</code></p>
        <button (click)="timeTravel(-1, 'weeks')">Go Back One Week</button>
        <button (click)="timeTravel(-1, 'months')">Go Back One Month</button>
        <button (click)="timeTravel(-1, 'years')">Go Back One Year</button>
        <button (click)="endOfDay()">End of Day</button>
      </aside>
      <aside>
        <p>Specify the date format</p>
        Usage:
        <pre class="code">
          &lt;prx-datepicker format="YYYY-MM-DD" [date]="today" (dateChange)="onDateChange($event)"&gt;&lt;/prx-datepicker&gt;
        </pre>
        Example:
        <prx-datepicker format="YYYY-MM-DD" [date]="today" (dateChange)="onDateChange($event)"></prx-datepicker>
        <span class="changed" *ngIf="dateChanged">Changed: {{dateChanged}}</span>
      </aside>
      <aside>
        <p>Can be used in conjunction with a time picker</p>
        Usage:
        <pre class="code">
          &lt;prx-datepicker [date]="today" (dateChange)="onDateChange($event)"&gt;&lt;/prx-datepicker&gt;
          &lt;prx-timepicker [date]="today" (timeChange)="onDateChange($event)"&gt;&lt;/prx-timepicker&gt;
        </pre>
        Example:
        <prx-datepicker [date]="today" (dateChange)="onDateChange($event)"></prx-datepicker>
        <prx-timepicker [date]="today" (timeChange)="onDateChange($event)"></prx-timepicker>
        <span class="changed" *ngIf="dateChanged">Changed: {{dateChanged}}</span>
      </aside>
      <aside>
        <p>With UTC dates</p>
        Usage:
        <pre class="code">
          &lt;prx-datepicker [date]="utcDate" UTC="true" (dateChange)="onUTCDateChange($event)"&gt;&lt;/prx-datepicker&gt;
          &lt;prx-timepicker [date]="utcDate" UTC="true" (timeChange)="onUTCDateChange($event)"&gt;&lt;/prx-timepicker&gt;
        </pre>
        Examples:
        <prx-datepicker [date]="utcDate" UTC="true" (dateChange)="onUTCDateChange($event)"></prx-datepicker>
        <prx-timepicker [date]="utcDate" UTC="true" (timeChange)="onUTCDateChange($event)"></prx-timepicker>
        <span class="changed" *ngIf="utcDateChanged">Changed: {{utcDateChanged}}</span>
      </aside>
    </section>
  `,
  styles: ['.changed { padding-left: 20px; font-style: italic;}']
})
export class DatepickerDemoComponent {

  today = new Date();
  dateChanged: string;
  utcDate = new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 23, 59, 59));
  utcDateChanged: string;

  onDateChange(value: Date) {
    this.today = value;
    this.dateChanged = value.toString();
  }

  onUTCDateChange(value: Date) {
    this.utcDate = value;
    this.utcDateChanged = value.toUTCString();
  }

  timeTravel(howMuch: any, period: any) {
    this.today = moment(this.today).add(howMuch, period).toDate();
  }

  endOfDay() {
    this.today = moment().hours(23).minutes(59).seconds(59).milliseconds(999).toDate();
  }
}
