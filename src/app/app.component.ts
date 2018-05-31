import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <prx-header>
      <prx-navitem route="/" text="PRX StyleGuide"></prx-navitem>
      <prx-navuser [userinfo]="userinfo">
        <div class="user-loaded profile-image-placeholder"></div>
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
  `,
  styles: [`
    .profile-image-placeholder {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid rgb(0, 141, 177);
      background-color: #7b9fa7;
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
    }
    @media screen and (min-width: 768px) {
      .profile-image-placeholder {
        border-width: 2px;
        width: 40px;
        height: 40px;
       }
     }
  `]
})
export class AppComponent {
  userinfo = {
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
