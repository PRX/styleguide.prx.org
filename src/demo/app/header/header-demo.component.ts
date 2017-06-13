import {Component} from '@angular/core';

@Component({
  selector: 'nav-demo',
  template: `
    <h2>Header</h2>
    <p class="desc">
      The Header Component is a fixed position navigation bar that shows a home logo link and supports other navigation
      items using projected content. You can see an example of this header component in use in the navigation bar above.
    </p>
    <aside class="example">
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
  `
})

export class HeaderDemoComponent {}
