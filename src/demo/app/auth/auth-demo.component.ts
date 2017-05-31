import { Component } from '@angular/core';
import { AuthService } from 'ngx-prx-styleguide';

@Component({
  selector: 'auth-demo',
  styles: [`
    .login { width: 400px; }
    .login b { color: #f00; }
  `],
  template: `
    <h1>Auth Module</h1>
    <section>
      <h2>AuthService Usage:</h2>
      <ul>
        <li>Include the <pre>AuthModule</pre> in your app</li>
        <li>
          In your top-level component, include
          <pre>&lt;prx-auth host="thePrxAuthHost" client="yourClientId"&gt;&lt;/prx-auth&gt;</pre>
        </li>
        <li>Make sure you have a <pre>callback.html</pre> somewhere in your assets</li>
        <li>Subscribe to <pre>AuthService.token</pre></li>
      </ul>
      <prx-auth [host]="authHost" [client]="authClient"></prx-auth>
      <h3>Status: {{status}}</h3>
      <button (click)="refresh()">Refresh token</button>
    </section>
    <section>
      <h2>LoginComponent</h2>
      <b *ngIf="loggedIn">You are logged in - delete your prx session cookie to demo the login</b>
      <div *ngIf="!loggedIn" class="login">
        <prx-login (success)="loginSuccess()" (failure)="loginFailure($event)">
        </prx-login>
        <b *ngIf="reason">{{reason}}</b>
      </div>
    </section>
  `,
})
export class AuthDemoComponent {

  authHost = 'id-staging.prx.tech';
  authClient = 'lVN05vLI8aCADh7lzbrL0AkDvEfPNuoEPpL2umL5';
  status = 'waiting...';
  loggedIn = false;
  reason: string;

  constructor(private auth: AuthService) {
    auth.token.subscribe((token: string) => {
      if (token) {
        this.status = 'logged in with ' + token.substr(-6);
        this.loggedIn = true;
      } else {
        this.status = 'logged out';
        this.loggedIn = false;
      }
    });
  }

  refresh() {
    this.status = 'refreshing...';
    this.auth.refreshToken();
  }

  loginSuccess() {
    this.loggedIn = true;
    this.reason = null;
  }

  loginFailure(reason: string) {
    this.loggedIn = false;
    this.reason = reason;
  }

}
