import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'spinner-demo',
  template: `
    <section class="main demo">
      <h1>Spinner</h1>
      <p>
        The Spinner Component shows a loading indicator. Typically the spinner is displayed with <code>*ngIf</code> until
        a resource has finished loading.
      </p>
      <p>
        The animation uses <code>position: absolute</code>, so it should be inside a <code>position: relative</code> container. 
      </p>
      <dl>
        <dt>module</dt><dd><code>SpinnerModule</code></dd>
        <dt>selector</dt><dd><code>prx-spinner</code></dd>
      </dl>
      <ul>
        <li><code>@Input() set spinning(value: boolean)</code> - toggles the animation</li>
        <li><code>@Input() delay: number</code> - defaults to 300 seconds</li>
        <li><code>@Input() inverse: boolean</code> - defaults to false but when true will show a grey background color</li>
      </ul>
      <aside>
        Usage:
        <pre class="code">
          &lt;prx-spinner *ngIf="loading"&gt;&lt;/prx-spinner&gt;
          &lt;prx-spinner delay="2000"&gt;&lt;/prx-spinner&gt;
          &lt;prx-spinner inverse="true"&gt;&lt;/prx-spinner&gt;
        </pre>
        Example:
        <div class="container blue"><prx-spinner></prx-spinner></div>
        <div class="container blue "><prx-spinner delay="2000"></prx-spinner></div>
        <div class="container"><prx-spinner inverse="true"></prx-spinner></div>
      </aside>
    </section>
  `,
  styleUrls: ['spinner-demo.component.css']
})

export class SpinnerDemoComponent {}
