import { Component } from '@angular/core';
import { DemoModel } from '../model/demo.model';
import { HalDoc } from 'ngx-prx-styleguide';

@Component({
  moduleId: module.id,
  selector: 'button-demo',
  template: `
    <section class="main demo">
      <h1>Button</h1>
      <p>
        The Button Component is a button used with PRX Models in Fancy Forms. Use one of the style options, orange, plain, red, or green.
      </p>
      <dl>
        <dt>module</dt><dd><code>FancyFormModule</code></dd>
        <dt>selector</dt><dd><code>prx-button</code></dd>
      </dl>
      <ul>
        <li>
          <code>@Input() model: BaseModel</code>
          - the model for checking isSaving, invalid, or changed states
        </li>
        <li>
          <code>@Input() orange: boolean</code>
          - defaults to false; if true, button color is orange
        </li>
        <li>
          <code>@Input() plain: boolean</code>
          - defaults to false; if true, button color is grey/plain
        </li>
        <li>
          <code>@Input() red: boolean</code>
          - defaults to false; if true, button color is red
        </li>
        <li>
          <code>@Input() green: boolean</code>
          - defaults to false; if true, button color is green
        </li>
        <li>
          <code>@Input() working: boolean</code>
          - override to show spinner
        </li>
        <li>
          <code>@Input() disabled: boolean</code>
          - override to appear disabled
        </li>
        <li>
          <code>@Input() visible: boolean</code>
          - override to control display
        </li>
      </ul>
      <aside>
        <h2><code>orange</code></h2>
        Usage:
        <pre class="code">
          &lt;prx-button [model]="model" orange=1 disabled=0&gt;
            Publish
          &lt;/prx-button&gt;
        </pre>
        Example:
        <prx-button [model]="model" orange=1 disabled=0>Publish</prx-button>
      </aside>
      <aside>
        <h2><code>plain</code></h2>
        Usage:
        <pre class="code">
          &lt;prx-button [model]="model" plain=1 disabled=0&gt;
            Discard
          &lt;/prx-button&gt;
        </pre>
        Example:
        <prx-button [model]="model" plain=1 disabled=0>Discard</prx-button>
      </aside>
      <aside>
        <h2><code>red</code></h2>
        Usage:
        <pre class="code">
          &lt;prx-button [model]="model" red=1&gt;
            Delete
          &lt;/prx-button&gt;
        </pre>
        Example:
        <prx-button [model]="model" red=1>Delete</prx-button>
      </aside>
      <aside>
        <h2><code>green</code></h2>
        Usage:
        <pre class="code">
          &lt;prx-button [model]="model" green=1 disabled=0&gt;
            Create
          &lt;/prx-button&gt;
        </pre>
        Example:
        <prx-button [model]="model" green=1 disabled=0>Create</prx-button>
      </aside>
      <aside>
        <h2><code>working</code></h2>
        Usage:
        <pre class="code">
          &lt;prx-button [model]="model" working=1&gt;
            Saving
          &lt;/prx-button&gt;
        </pre>
        Example:
        <prx-button [model]="model" working=1>Saving</prx-button>
      </aside>
      <aside>
        <h2><code>disabled</code></h2>
        Usage:
        <pre class="code">
          &lt;prx-button [model]="model" disabled=1&gt;
            Saved
          &lt;/prx-button&gt;
        </pre>
        Example:
        <prx-button [model]="model" disabled=1>Saved</prx-button>
      </aside>
      <aside>
        <h2><code>visible</code></h2>
        Usage:
        <pre class="code">
          &lt;prx-button [model]="model" visible=1 disabled=0&gt;
            Save
          &lt;/prx-button&gt;
        </pre>
        Example:
        <prx-button [model]="model" visible=1 disabled=0>Save</prx-button>
      </aside>
    </section>
  `
})

export class ButtonDemoComponent {
  model = new DemoModel(null, new HalDoc({}, null));
}
