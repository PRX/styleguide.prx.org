import { Component } from '@angular/core';
import { DemoModel } from '../model/demo.model';
import { HalDoc } from 'ngx-prx-styleguide';

@Component({
  moduleId: module.id,
  selector: 'fancy-field-demo',
  template: `
    <section class="main demo">
      <h1>FancyField</h1>
      <p>
        The Fancy Field component is used to create PRX forms fields. It supports, text, number, checkbox, select, and
        textarea input types. It will also handle formatting of labels and hints along with your projected content. This
        component is intended to work with models extended from BaseModel, but it will also create disabled form fields
        without a model. When working with BaseModel, any validation errors that occur will be shown within the fancy field.
      </p>
      <dl>
        <dt>module</dt><dd><code>FancyFormModule</code></dd>
        <dt>selector</dt><dd><code>prx-fancy-field</code></dd>
      </dl>
      <ul>
        <li>
          <code>@Input() model: BaseModel</code>
           - the model containing the named property
        </li>
        <li>
          <code>@Output() onChange: EventEmitter&lt;any&gt;</code>
           - whenever the field changes, the new value is emitted
        </li>  
        <li>
          <code>@Input() name: string</code>
           - name of model attribute, and optional explicit changed/invalid bindings
        </li>
        <li>
          <code>@Input() changed: string</code>
           - an alternate field name can be provided for BaseModel field change checking, otherwise <code>name</code> is used
        </li>
        <li>
          <code>@Input() invalid: string</code>
           - an alternate field name can be provided for BaseModel field validation, otherwise <code>name</code> is used
        </li>
        <li>
          <code>@Input() label: string</code>
           - the field label presented to the user
        </li>
        <li>
          <code>@Input() invalidlabel: string</code>
           - an alternate label can be provided for validation messages, otherwise <code>label</code> is used
        </li>
        <li>
          <code>@Input() hideinvalid: boolean</code>
           - set to false if validation messages are not desired
        </li>
        <li>
          <code>@Input() advancedConfirm: string</code>
           - a confirmation message for "advanced" fields
        </li>
        <li>
          <code>@Input() strict: boolean</code>
           - whether or not validation is strict
        </li>
        <li>
          <code>@Input() prompt: string</code>
           - prompt/label for a checkbox field
        </li>
      </ul>
      <aside>
        <h2><code>textinput</code></h2>
        <p>The most basic of fields is a textinput. Use the textinput parameter to set input type=text.</p>
        Usage:
        <pre class="code">
          &lt;prx-fancy-field textinput [model]="model" name="foo" label="Foo"&gt;
            &lt;div class="fancy-hint"&gt;foo bar baz&lt;/div&gt;
          &lt;/prx-fancy-field&gt;
        </pre>
        Example:
        <prx-fancy-field textinput [model]="model" name="foo" label="Foo">
          <div class="fancy-hint">foo bar baz</div>
        </prx-fancy-field>
      </aside>
      
      <aside>
        <h2><code>number</code></h2>
        <p>Use the number parameter to get an HTML5 number field.</p>
        Usage:
        <pre class="code">
          &lt;prx-fancy-field number [model]="model" name="count" label="How many?"&gt;
            &lt;div class="fancy-hint"&gt;Give us your best guess.&lt;/div&gt;
          &lt;/prx-fancy-field&gt;
        </pre>
        Example:
        <prx-fancy-field number [model]="model" name="count" label="How many?">
          <div class="fancy-hint">Give us your best guess.</div>
        </prx-fancy-field>
      </aside>
      
      <aside>
        <h2><code>checkbox</code></h2>
        <p>Use the checkbox parameter to get an HTML5 number field. Checkbox does not show the changed indicator.</p>
        Usage:
        <pre class="code">
          &lt;prx-fancy-field checkbox [model]="model" name="complete" prompt="Are you done yet?" label="Foo"&gt;
            &lt;div class="fancy-hint"&gt;psst, you're not.&lt;/div&gt;
          &lt;/prx-fancy-field&gt;
        </pre>
        Example:
        <prx-fancy-field checkbox [model]="model" name="complete" prompt="Are you done yet?" label="Foo">
          <div class="fancy-hint">psst, you're not.</div>
        </prx-fancy-field>
      </aside>
      
      <aside>
        <h2><code>select</code></h2>
        <p>
          Use the select parameter to get a select dropdown.
          Options can be provided as a single array of strings or an array of arrays of <code>[display: string, value: any]</code>.
        </p>
        Usage:
        <pre class="code">
          const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];
          // OR 
          const colors = [['red', 'R'], ['yellow', 'Y'], ['blue', 'B']]
          
          &lt;prx-fancy-field [model]="model" name="color" label="Favorite color" [select]="colors"&gt;
            &lt;div class="fancy-hint"&gt;It doesn't have to be your absolute favorite, but you can only pick one.&lt;/div&gt;
          &lt;/prx-fancy-field&gt;
        </pre>
        Example:
        <prx-fancy-field [model]="model" name="color" label="Favorite color" [select]="colors">
          <div class="fancy-hint">It doesn't have to be your absolute favorite, but you can only pick one.</div>
        </prx-fancy-field>
      </aside>
      
      <aside>
        <h2><code>textarea</code></h2>
        <p>Use textarea for longer text fields.</p>
        Usage:
        <pre class="code">
          &lt;prx-fancy-field textarea [model]="model" name="script" label="Your script"&gt;
            &lt;div class="fancy-hint"&gt;
              This sponsor does not require final script approval.
              Save your script here for storage and convenience.
            &lt;/div&gt;
          &lt;/prx-fancy-field&gt;
        </pre>
        Example:
        <prx-fancy-field textarea [model]="model" name="script" label="Your script">
          <div class="fancy-hint">
            This sponsor does not require final script approval.
            Save your script here for storage and convenience.
          </div>
        </prx-fancy-field>
      </aside>
      
      <aside>
        <h2><code>.nested</code></h2>
        <p>Use content projection with the <code>.nested</code> selector to include anything in a fancy-field. Maybe a date picker?</p>
        Usage:
        <pre class="code">
          &lt;prx-fancy-field label="Arrival"&gt;
            &lt;div class="fancy-hint"&gt;When should we expect you?&lt;/div&gt;
            &lt;prx-datepicker [date]="model.arrival" (onDateChange)="model.set('arrival', $event)" [changed]="model.changed('arrival')"&gt;
            &lt;/prx-datepicker&gt;
            &lt;prx-timepicker [date]="model.arrival" (onTimeChange)="model.set('arrival', $event)" [changed]="model.changed('arrival')"&gt;
            &lt;/prx-timepicker&gt;
          &lt;/prx-fancy-field&gt;
        </pre>
        Example:
        <prx-fancy-field label="Arrival">
          <div class="fancy-hint">When should we expect you?</div>
          <prx-datepicker [date]="model.arrival" (onDateChange)="model.set('arrival', $event)" [changed]="model.changed('arrival')">
          </prx-datepicker>
          <prx-timepicker [date]="model.arrival" (onTimeChange)="model.set('arrival', $event)" [changed]="model.changed('arrival')">
          </prx-timepicker>
        </prx-fancy-field>
      </aside>

      <aside>
        <h2>no <code>model</code></h2>
        <p>If model is undefined or not provided, the field will be disabled.</p>
        Usage:
        <pre class="code">
          &lt;prx-fancy-field textinput name="nada" label="Nope"&gt;
            &lt;div class="fancy-hint"&gt;This field is disabled because there is no model.&lt;/div&gt;
          &lt;/prx-fancy-field&lt;
        </pre>
        Example:
        <prx-fancy-field textinput name="nada" label="Nope">
          <div class="fancy-hint">This field is disabled because there is no model.</div>
        </prx-fancy-field>
      </aside>
      
      <aside>
        <h2><code>small</code></h2>
        <p>Use the small parameter to get an <code>h4</code> label rather than <code>h3</code>.</p>
        Usage:
        <pre class="code">
          &lt;prx-fancy-field small textinput [model]="model" name="foo" label="Foo"&gt;
            &lt;div class="fancy-hint"&gt;Labels can be made small.&lt;/div&gt;
          &lt;/prx-fancy-field&gt;
        </pre>
        Example:
        <prx-fancy-field small textinput [model]="model" name="foo" label="Foo">
          <div class="fancy-hint">Labels can be made small.</div>
        </prx-fancy-field>
      </aside>
      
      <aside>
        <h2><code>inline</code></h2>
        <p>Labels can be shown inline. Typically inline fields do not provide a hint.</p>
        Usage:
        <pre class="code">
          &lt;prx-fancy-field inline textinput [model]="model" name="foo" label="Foo"&gt;
          &lt;/prx-fancy-field&gt;
        </pre>
        Example:
        <prx-fancy-field inline textinput [model]="model" name="foo" label="Foo"></prx-fancy-field>
      </aside>
      
      <aside>
        <h2><code>required</code></h2>
        <p>
          In order for fields to actually be required, they must use the REQUIRED validator with their model.
          The required parameter here adds the red * styling. That is all.
        </p>
        Usage:
        <pre class="code">
          &lt;prx-fancy-field required textinput [model]="model" name="mustProvide" label="First and Last Name"&gt;
            &lt;div class="fancy-hint"&gt;Please provide your full name.&lt;/div&gt;
          &lt;/prx-fancy-field&gt;
        </pre>
        Example:
        <prx-fancy-field required textinput [model]="model" name="mustProvide" label="First and Last Name">
          <div class="fancy-hint">Please provide your full name.</div>
        </prx-fancy-field>
      </aside>
      
      <aside>
        <h2><code>.fancy-hint</code></h2>
        <p>Use content projection with the <code>.fancy-hint</code> selector to show a field hint. Hints typically end with punctuation.</p>
        Usage:
        <pre class="code">
          &lt;div class="fancy-hint"&gt;Hint text&lt;/div&gt;
        </pre>
        Example:
        <prx-fancy-field textinput name="showhint" label="Hint">
          <div class="fancy-hint">Providing a hint is optional, but they are more frequently used than not.</div>
        </prx-fancy-field>
      </aside>
    </section>
  `
})

export class FancyFieldDemoComponent {
  model = new DemoModel(null,
    new HalDoc({
      foo: 'bar',
      complete: true,
      count: 11,
      color: 'yellow',
      script: 'Visit blue apron dot com slash exciting show name to get your first three deliveries free.',
      arrival: new Date(),
      feedId: '196',
      mustProvide: 'delete this text'
    }, null));

  colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];
}
