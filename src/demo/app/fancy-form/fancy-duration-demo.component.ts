import { Component } from '@angular/core';
import { DemoModel } from '../model/demo.model';
import { HalDoc } from 'ngx-prx-styleguide';

@Component({
  moduleId: module.id,
  selector: 'fancy-duration-demo',
  template: `
    <section class="main demo">
      <h1>FancyDuration</h1>
      <p>
        The Fancy Duration component is used to create forms fields for audio duration. If a field is entered out of range
        for seconds or minutes, the time will auto adjust accordingly.
      </p>
      <ul>
        <li>
          <code>@Input() model: BaseModel</code>
          - the model containing the named property
        </li>
        <li>
          <code>@Input() name: string</code>
          - name of model attribute
        </li>
        <li>
          <code>@Input() label: string</code>
          - the field label presented to the user
        </li>
        <li>
          <code>@Input() tiny: boolean</code>
          - show a more condensed presentation
        </li>
        <li>
          <code>@Input() advancedConfirm: string</code>
          - a confirmation message for "advanced" fields
        </li>
      </ul>
      <aside>
        Usage:
        <pre class="code">
          &lt;prx-fancy-duration [model]="model" name="duration" label="Duration"
            advancedConfirm="Are you sure?"&gt;
          &lt;/prx-fancy-duration&gt;
        </pre>
        Example:
        <prx-fancy-duration [model]="model" name="duration" label="Duration"
                            advancedConfirm="Are you sure?"></prx-fancy-duration>
      </aside>
      <aside>
        <h2><code>tiny</code></h2>
        Usage:
        <pre class="code">
          &lt;prx-fancy-duration tiny="true" [model]="model" name="duration" label="Duration"
            advancedConfirm="Are you sure?"&gt;
          &lt;/prx-fancy-duration&gt;
        </pre>
        Example:
        <prx-fancy-duration tiny="true" [model]="model" name="duration" label="Duration"
                            advancedConfirm="Are you sure?"></prx-fancy-duration>
      </aside>
    </section>
  `
})

export class FancyDurationDemoComponent {
  model = new DemoModel(null,
    new HalDoc({
      lengthMinimum: 65
    }, null));
}
