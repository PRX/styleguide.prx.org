import {Component} from '@angular/core';

@Component({
  selector: 'nav-demo',
  template: `
    <h2>Nav Item</h2>
    <p class="desc">
      The Nav Item Component provides a router link within the application or an href link outside the application dependent
      on its <code>Input()</code>s: <code>route</code>, <code>href</code>, and <code>text</code>
    </p>
    <aside class="example">
      Router Link Usage:
      <pre class="code">
        &lt;prx-navitem route="/" text="PRX StyleGuide"&gt;&lt;/prx-navitem&gt;
      </pre>
      Href Link Usage
      <pre class="code">
        &lt;prx-navitem href="https://metrics.prx.org" text="Metrics"&gt;&lt;/prx-navitem&gt;
      </pre>
    </aside>
  `
})

export class NavItemDemoComponent {}
