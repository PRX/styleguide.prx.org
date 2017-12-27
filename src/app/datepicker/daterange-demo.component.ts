import { Component } from '@angular/core';

@Component({
  selector: 'daterange-demo',
  template: `
    <section class="main demo">
      <h1>Date Range</h1>
      <p>The prx-daterange component is a date range picker with
        "from" and a "to" dates represented by a pair of <code>prx-datepicker</code>s.
      </p>
      <dl>
        <dt>module</dt><dd><code>DatepickerModule</code></dd>
        <dt>selector</dt><dd><code>prx-daterange</code></dd>
      </dl>
      <ul>
        <li>
          <code>@Input() format: string</code> (optional) sets the datepicker format shown in the form fields.
          Formatting options are <a href="https://momentjs.com/docs/#/displaying/format/">moment</a> based. Defaults to YYYY-MM-DD
        </li>
        <li>
          <code>@Input() from: Date</code> (optional) sets "from" date
        </li>
        <li>
          <code>@Input() to: Date</code> (optional) sets "to" date
        </li>
        <li>
          <code>@Output() rangeChange: EventEmitter&lt;&#123;from: Date, to: Date&#125;&gt;</code>
          (optional) emitted when either "from" or "to" date is selected
        </li>
      </ul>
      <aside>
        Usage:
        <pre class="code">
          &lt;prx-daterange [from]="from" [to]="to" (rangeChange)="onRangeChange($event)"&gt;&lt;/prx-daterange&gt;
        </pre>
        Example:
        <prx-daterange [from]="from" [to]="to" (rangeChange)="onRangeChange($event)"></prx-daterange>
        <span class="changed" *ngIf="rangeChanged">Changed: {{rangeChanged}}</span>
      </aside>
    </section>
  `,
  styles: ['.changed { padding-left: 20px; font-style: italic;}']
})
export class DaterangeDemoComponent {

  from = new Date();
  to = new Date();
  rangeChanged: string;

  onRangeChange(range: {from: Date, to: Date}) {
    this.from = range.from;
    this.to = range.to;
    this.rangeChanged = this.from.toString() + ' - ' + this.to.toString();
  }
}