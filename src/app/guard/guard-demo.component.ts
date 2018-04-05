import { Component } from '@angular/core';
import { AuthService } from 'ngx-prx-styleguide';
import { Env } from '../core.env';

@Component({
  template: `
    <section class="main demo">
      <h1>AuthGuard, DeactivateGuard, and UnauthGuard</h1>
      <p>
        The AuthGuard, DeactivateGuard, and UnauthGuard Services are used in conjunction with the Angular Router to guard
        protected routes by requiring a login token. 
      </p>
      <aside>
        Usage:
        <ul>
          <li>
            Your application should have a <code>'login'</code> route. The <code>AuthGuard</code> Service will redirect to
            this route when the user is not logged in.
          </li>
          <li>The <code>prx-auth</code> component should be present and shown somewhere on the page in the component hierarchy.</li>
          <li>Protected routes use <code>canActivate: [AuthGuard], canDeactivate: [DeactivateGuard]</code></li>
          <li>Login route uses <code>canActivate: [UnauthGuard]</code></li>
          <li>Optionally, to determine login status, subscribe to the <code>AuthService</code> token</li>
          <li>
            Sample routes as follows:
            <pre class="code">
            [
              &#123;
                path: 'guard/guarded',
                component: GuardedComponent,
                canActivate: [AuthGuard], canDeactivate: [DeactivateGuard]
              &#125;,
              &#123;
                path: 'login',
                component: LoginComponent,
                canActivate: [UnauthGuard]
              &#125;
            ]
            </pre>
          </li>
        </ul>
        Example:
        <prx-auth [host]="authHost" [client]="authClient"></prx-auth>
        <p>You are {{status}}</p>
        <button *ngIf="loggedIn" (click)="setToken(null)">Logout</button>
        <p><a [routerLink]="['guarded']">Guarded Route</a></p>
      </aside>
    </section>
  `
})

export class GuardDemoComponent {
  authHost = Env.AUTH_HOST;
  authClient = Env.AUTH_CLIENT_ID;
  status = 'waiting...';
  loggedIn = false;

  constructor(private auth: AuthService) {
    auth.token.subscribe((token: string) => {
      if (token) {
        this.status = 'logged in with token "' + token.substr(-6) + '"';
        this.loggedIn = true;
      } else {
        this.status = 'logged out';
        this.loggedIn = false;
      }
    });
  }

  setToken(token: string) {
    this.auth.setToken(token);
  }
}
