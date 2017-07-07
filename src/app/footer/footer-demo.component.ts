import {Component} from '@angular/core';

@Component({
  selector: 'footer-demo',
  template: `
    <section class="main demo">
      <h1>Footer</h1>
      <p>
        The Footer Component provides an HTML5 footer element containing various PRX links.
        You can see an example of this footer component in the demo application below.
      </p>
      <dl>
        <dt>module</dt><dd><code>FooterModule</code></dd>
        <dt>selector</dt><dd><code>prx-footer</code></dd>
      </dl>
      <aside>
        Usage:
        <pre class="code">
          &lt;prx-footer&gt;&lt;/prx-footer&gt;
        </pre>
      </aside>
    </section>
  `
})

export class FooterDemoComponent {}
