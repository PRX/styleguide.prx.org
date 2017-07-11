import {Component} from '@angular/core';

@Component({
  selector: 'navuser-demo',
  template: `
    <section class="main demo">
      <h2>Nav User</h2>
      <p>
        The Nav Item Component shows the username and projected content based on selectors.
      </p>
      <dl>
        <dt>module</dt><dd><code>HeaderModule</code></dd>
        <dt>selector</dt><dd><code>prx-navuser</code></dd>
      </dl>
      <ul>
        <li><code>@Input() userName: string</code> - username to be displayed</li>
        <li><code>user-loaded</code> - content that is shown when username is present</li>
        <li><code>user-loading</code> - content that is shown when username is not present</li>
      </ul>
      <aside>
        Usage:
        <pre class="code">
          &lt;prx-navuser userName="Mary"&gt;
            &lt;div class="user-loading"&gt;Authenticating...&lt;/div&gt;
            &lt;div class="user-loaded"&gt;Sign Out&lt;/div&gt;
          &lt;/prx-navuser&gt;
        </pre>
      </aside>
    </section>
  `
})

export class NavUserDemoComponent {}
