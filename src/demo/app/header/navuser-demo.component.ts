import {Component} from '@angular/core';

@Component({
  selector: 'navuser-demo',
  template: `
    <section class="main demo">
      <h2>Nav User</h2>
      <p>
        The Nav User Component typically the user image and a user apps dropdown menu. It has two selectors for
        projected content, <code>.user-loading</code> and <code>.user-loaded</code>. Typically, the user image
        is shown when loaded and the <code>prx-spinner</code> is used when loading.
      </p>
      <ul>
        
      </ul>
      <dl>
        <dt>module</dt><dd><code>HeaderModule</code></dd>
        <dt>selector</dt><dd><code>prx-navuser</code></dd>
      </dl>
      <ul>
        <li>
          <code>@Input() userinfo: Userinfo</code> as defined in <code><a [routerLink]="['/auth']">UserinfoService</a></code>, e.g.
          <pre class="code">
          userinfo = &#123;
            sub: 1,
            email: 'somebody@somewhere.org',
            preferred_username: 'somebody',
            name: 'Some body',
            href: '',
            apps: &#123;
              'exchange.prx.org': 'https://exchange.prx.org',
              'metrics.prx.org': 'https://metrics.prx.org',
              'publish.prx.org': 'https://publish.prx.org'
            &#125;
          &#125;;
          </pre>
        </li>
        <li><code>.user-loaded</code> - content that is shown when username is present</li>
        <li><code>.user-loading</code> - content that is shown when username is not present</li>
      </ul>
      <aside>
        Usage:
        <pre class="code">
          &lt;prx-navuser [userinfo]="userinfo"&gt;
            &lt;div class="user-loading"&gt;Authenticating...&lt;/div&gt;
            &lt;div class="user-loaded"&gt;Sign Out&lt;/div&gt;
          &lt;/prx-navuser&gt;
        </pre>
      </aside>
    </section>
  `
})

export class NavUserDemoComponent {}
