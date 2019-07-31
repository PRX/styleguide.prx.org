import {Component} from '@angular/core';

@Component({
  selector: 'app-footer-demo',
  template: `
    <section class="main demo">
      <h1>Footer</h1>
      <p>
        The Footer Component provides an HTML5 footer element containing various PRX links.
        You can see an example of this footer component in the demo application below.
      </p>
      <p>
        Any content inside the prx-footer will be projected into the left-most column.
      </p>
      <dl>
        <dt>module</dt><dd><code>FooterModule</code></dd>
        <dt>selector</dt><dd><code>prx-footer</code></dd>
      </dl>
      <aside>
        Usage:
        <pre class="code">
          &lt;prx-footer&gt;
            &lt;p&gt;
              And also some footer content, including a &lt;a href="#"&gt;link to something&lt;/a&gt;.
            &lt;/p&gt;
            &lt;a href="#"&gt;And also a standalone link&lt;/a&gt;
          &lt;/prx-footer&gt;
        </pre>
      </aside>
    </section>
  `
})

export class FooterDemoComponent {}
