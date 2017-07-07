import { Component } from '@angular/core';
import { AuthService, HalService, HalDoc } from 'ngx-prx-styleguide';

@Component({
  selector: 'demo-app',
  template: `
    <prx-header>
      <prx-navitem route="/" text="PRX StyleGuide"></prx-navitem>
      <prx-navuser userName="Mary">
        <div class="user-loaded profile-image-placeholder"></div>
      </prx-navuser>
    </prx-header>
    <main>
      <article>
        <router-outlet></router-outlet>
      </article>
    </main>
    <prx-footer></prx-footer>
  `,
  styles: [`
    .profile-image-placeholder {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid rgb(112, 142, 151);
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
export class AppComponent { }
