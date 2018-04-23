import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'checkbox-demo',
  template: `
    <section class="main demo">
      <h1>Checkboxes</h1>
      <p>
        A fancy Checkbox Component, with configurable color and size. With all
        the usual bindings/emitters you'd expect in a quality checkbox.
      </p>
      <dl>
        <dt>module</dt><dd><code>FancyFormModule</code></dd>
        <dt>selector</dt><dd><code>prx-checkbox</code></dd>
      </dl>
      <ul>
        <li>
          <code>@Input() disabled: boolean</code>
          - disable the form input
        </li>
        <li>
          <code>@Input() small: boolean</code>
          - a much smaller checkbox
        </li>
        <li>
          <code>@Input() color: string</code>
          - set the hex color of the checkbox (defaults to PRX-orange #ff9600)
        </li>
        <li>
          <code>@Input/Output() checked: boolean</code>
          - 2 way data binding to checkbox state
        </li>
        <li>
          <code>@Output() change: boolean</code>
          - Supplemantary output event for changes
        </li>
      </ul>
      <aside>
        <h2><b>With a label</b></h2>

        Usage:
        <pre class="code">
          &lt;prx-checkbox [(checked)]="isChecked" [disabled]="isDisabled"
            [small]="isSmall" [color]="myColor"&gt;My Label&lt;/prx-checkbox&gt;
        </pre>

        <p>Example:</p>
        <p><prx-checkbox [(checked)]="isChecked" [disabled]="isDisabled"
          [small]="isSmall" [color]="myColor">My Label</prx-checkbox></p>
        <p>Am I checked? <b *ngIf="isChecked">YES</b><b *ngIf="!isChecked">NO</b></p>
        <p class="form-group">
          <label>Is disabled?</label>
          <select [(ngModel)]="isDisabled">
            <option value="1">Yup</option>
            <option value="0">Nope</option>
          </select>
        </p>
        <p class="form-group">
          <label>Is small?</label>
          <select [(ngModel)]="isSmall">
            <option value="1">Yup</option>
            <option value="0">Nope</option>
          </select>
        </p>
        <p class="form-group">
          <label>Checkbox Color</label>
          <select [(ngModel)]="myColor">
            <option value="#ff9600">Orange</option>
            <option value="#61A85D">Green</option>
            <option value="#0089bc">Blue</option>
          </select>
        </p>
      </aside>
      <aside>
        <h2><b>Without a label</b></h2>

        Usage:
        <pre class="code">
          &lt;prx-checkbox (change)="checkedChanged($event)"&gt;&lt;/prx-checkbox&gt;
        </pre>

        <p>Example:</p>
        <p><prx-checkbox (change)="checkedChanged($event)"></prx-checkbox></p>
        <p>Am I checked?
          <b *ngIf="check2Undefined">Unknown</b>
          <b *ngIf="!check2Undefined && check2">YES</b>
          <b *ngIf="!check2Undefined && !check2">NO</b>
        </p>
      </aside>
    </section>
  `
})

export class CheckboxDemoComponent {
  isChecked = true;
  isDisabled = 0;
  isSmall = 0;
  myColor = '#ff9600';

  check2Undefined = true;
  check2: boolean;

  checkedChanged(val: boolean) {
    this.check2Undefined = false;
    this.check2 = val;
  }
}
