import {Component} from '@angular/core';

@Component({
  selector: 'nav-demo',
  template: `
    <h2>Nav User</h2>
    <p>
      The Nav Item Component shows the username and projected content based
      on selectors for <code>user-loaded</code> or <code>user-loading</code>
    </p>
    <aside>
      Usage:
      <pre class="code">
        &lt;prx-navuser userName="Mary"&gt;
          &lt;div class="user-loading"&gt;Authenticating...&lt;/div&gt;
          &lt;div class="user-loaded"&gt;Sign Out&lt;/div&gt;
        &lt;/prx-navuser&gt;
      </pre>
    </aside>
  `
})

export class NavUserDemoComponent {}
