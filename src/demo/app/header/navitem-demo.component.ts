import {Component} from '@angular/core';

@Component({
  selector: 'navitem-demo',
  template: `
    <section class="main demo">
      <h1>Nav Item</h1>
      <p>
        The Nav Item Component provides a router link within the application or an href link outside the application.
      </p>
      <dl>
        <dt>module</dt><dd><code>HeaderModule</code></dd>
        <dt>selector</dt><dd><code>prx-navitem</code></dd>
      </dl>
      <ul>
        <li><code>@Input() route: string</code> - a route within the application</li>
        <li><code>@Input() href: string</code> - an external link</li>
        <li><code>@Input() text: string</code> - linked text</li>
      </ul> 
      <aside>
        Router Link Usage:
        <pre class="code">
          &lt;prx-navitem route="/" text="PRX StyleGuide"&gt;&lt;/prx-navitem&gt;
        </pre>
        Href Link Usage
        <pre class="code">
          &lt;prx-navitem href="https://metrics.prx.org" text="Metrics"&gt;&lt;/prx-navitem&gt;
        </pre>
      </aside>
    </section>
  `
})

export class NavItemDemoComponent {}
