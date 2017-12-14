import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'checkbox-demo',
  template: `
    <section class="main demo">
      <h1>Checkboxes</h1>
      <p>
        The Button Component is a button used with PRX Models in Fancy Forms. Use one of the style options, orange,
        plain, red, or green.
      </p>
      <dl>
        <dt>module</dt><dd><code>FancyFormModule</code></dd>
        <dt>selector</dt><dd><code>prx-checkbox</code></dd>
      </dl>
      <ul>
        <li>
          <code>@Input() checked: boolean</code>
          - set checked state
        </li>
        <li>
          <code>@Output() checked: boolean</code>
          - get checked state
        </li>
        <li>
          <code>@Input() disabled: boolean</code>
          - disable the form input
        </li>
        <li>
          <code>@Input() color: string</code>
          - set the hex color of the checkbox (defaults to PRX-orange #f59f51)
        </li>
      </ul>
      <aside>
        <h2><b>With a label</b></h2>

        Usage:
        <pre class="code">
          &lt;prx-checkbox [(checked)]="isChecked" [disabled]="isDisabled" [color]="myColor"&gt;My Label&lt;/prx-checkbox&gt;
        </pre>

        <p>Example:</p>
        <p><prx-checkbox [(checked)]="isChecked" [disabled]="isDisabled" [color]="myColor">My Label</prx-checkbox></p>
        <p>Am I checked? <b *ngIf="isChecked">YES</b><b *ngIf="!isChecked">NO</b></p>
        <p class="form-group">
          <label>Is disabled?</label>
          <select [(ngModel)]="isDisabled">
            <option value="1">Yup</option>
            <option value="0">Nope</option>
          </select>
        </p>
        <p class="form-group">
          <label>Checkbox Color</label>
          <select [(ngModel)]="myColor">
            <option value="#f59f51">Orange</option>
            <option value="#61A85D">Green</option>
            <option value="#368aa2">Blue</option>
          </select>
        </p>
      </aside>
      <aside>
        <h2><b>Without a label</b></h2>

        Usage:
        <pre class="code">
          &lt;prx-checkbox [(checked)]="isChecked2"&gt;&lt;/prx-checkbox&gt;
        </pre>

        <p>Example:</p>
        <p><prx-checkbox [(checked)]="isChecked2"></prx-checkbox></p>
        <p>Am I checked? <b *ngIf="isChecked2">YES</b><b *ngIf="!isChecked2">NO</b></p>
      </aside>
    </section>
  `
})

export class CheckboxDemoComponent {
  isChecked = true;
  isChecked2 = true;
  isDisabled = 0;
  myColor = '#f59f51';
}
