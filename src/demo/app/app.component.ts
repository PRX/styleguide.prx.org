import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <prx-header>
      <prx-navitem route="/" text="PRX StyleGuide"></prx-navitem>
      <prx-navuser [userinfo]="userinfo" (click)="toggleUserInfo()">
        <prx-image class="user-loaded" src="../assets/images/user_placeholder.png"></prx-image>
        <prx-spinner class="user-loading"></prx-spinner>
      </prx-navuser>
    </prx-header>
    <prx-modal></prx-modal>
    <main>
      <article>
        <router-outlet></router-outlet>
      </article>
    </main>
    <prx-footer>
      <p>
        And also some footer content, including a <a href="#">link to something</a>.
      </p>
      <a href="#">And also a standalone link</a>
    </prx-footer>
    <prx-toastr></prx-toastr>
  `
})
export class AppComponent {
  userinfo: any;
  toggleUserInfo() {
    if (this.userinfo) {
      this.userinfo = null;
    } else {
      this.userinfo = {
        sub: 1,
        email: 'somebody@somewhere.org',
        preferred_username: 'somebody',
        name: 'Some body',
        href: '',
        apps: {
          'exchange.prx.org': 'https://exchange.prx.org',
          'metrics.prx.org': 'https://metrics.prx.org',
          'publish.prx.org': 'https://publish.prx.org'
        }
      };
    }
  }
}
