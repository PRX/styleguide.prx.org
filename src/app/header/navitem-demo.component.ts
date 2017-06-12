import {Component} from '@angular/core';

@Component({
  selector: 'nav-demo',
  template: `
    <h2>Nav Item</h2>
    <p>
      The Nav Item Component provides a router link within the application or an href link outside the application dependent
      on its <code>Input()</code>s: <code>route</code>, <code>href</code>, and <code>text</code>
    </p>
    <p>
      Router Link Usage:
    </p>
    <pre>
      &lt;prx-navitem route="/" text="PRX StyleGuide"&gt;&lt;/prx-navitem&gt;
    </pre>
    <p>
      Href Link Usage
    </p>
    <pre>
      &lt;prx-navitem href="https://metrics.prx.org" text="Metrics"&gt;&lt;/prx-navitem&gt;
    </pre>
  `
})

export class NavItemDemoComponent {}
