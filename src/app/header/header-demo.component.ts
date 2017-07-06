import {Component} from '@angular/core';

@Component({
  selector: 'nav-demo',
  template: `
    <section class="main demo">
      <h1>Header</h1>
      <p>
        The Header Component is a fixed position navigation bar that shows a home logo link and supports other navigation
        items using projected content. You can see an example of this header component in use in the navigation bar above.
      </p>
      <dl>
        <dt>module</dt><dd><code>HeaderModule</code></dd>
        <dt>selector</dt><dd><code>prx-header</code></dd>
      </dl>
      <aside>
        Usage:
        <pre class="code">
          &lt;prx-header&gt;
            &lt;prx-navitem route="/" text="PRX StyleGuide"&gt;&lt;/prx-navitem&gt;
            &lt;prx-navuser userName="Mary"&gt;
              &lt;div class="user-loaded"&gt;Sign Out&lt;/div&gt;
            &lt;/prx-navuser&gt; 
          &lt;/prx-header&gt;
        </pre>
      </aside>
    </section>
  `
})

export class HeaderDemoComponent {}
