import { Component } from '@angular/core';
import { DemoModel } from '../model/demo.model';
import { HalDoc } from 'ngx-prx-styleguide';

@Component({
  moduleId: module.id,
  selector: 'advanced-confirm-demo',
  template: `
    <section class="main demo">
      <h1>AdvancedConfirm</h1>
      <p>
        Advanced Confirm is a directive that is designed to work with BaseModel and FancyField to ask the user to confirm
        changes to "advanced" fields. If the user does not confirm the change, the field should be reverted back to the 
        previous value. Advanced fields are those that may potentially cause issues or unexpected behavior that once set
        should only be changed for specific reasons that we need to ensure the user is aware of.
      </p>
      <dl>
        <dt>module</dt><dd><code>FancyFormModule</code></dd>
        <dt>selector</dt><dd><code>[prxAdvancedConfirm]</code></dd>
      </dl>
      <ul>
        <li>
          <code>@Input() prxAdvancedConfirm: string;</code>
            - confirmation message 
        </li>
        <li>
          <code>@Input() prxModel: BaseModel;</code>
           - model, model should be not new for confirmation
        </li>
        <li>
          <code>@Input() prxName: string;</code>
           - name of field, field should be changed and not invalid for confirmation
        </li>
        <li>
          <code>@Input() prxEvent</code>
           - event name, defaults to 'blur', select should use 'change' 
        </li>
      </ul>
      <aside>
        Usage:
        <pre class="code">
          &lt;input
              prxAdvancedConfirm="That's a risky move" 
              [prxModel]="model" 
              prxName="foo" 
              (ngModelChange)="model.set('foo', $event)"
              [ngModel]="model.foo"&gt;
        </pre>
        Example:
        <input prxAdvancedConfirm="That's a risky move" [prxModel]="model" prxName="foo" 
               (ngModelChange)="model.set('foo', $event)" [ngModel]="model.foo">
      </aside>
    </section>
  `
})

export class AdvancedConfirmDemoComponent {
  model = new DemoModel(null, new HalDoc({foo: 'bar'}, null));
}
