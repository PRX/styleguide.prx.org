import { Component } from '@angular/core';
import { AuthService, HalService, HalDoc } from 'ngx-prx-styleguide';

@Component({
  selector: 'demo-app',
  template: `
    <prx-auth *ngIf="loadAuth" [host]="authHost" [client]="authClient">
    </prx-auth>
    <prx-header>
      <prx-navitem route="/" text="PRX StyleGuide"></prx-navitem>
      <prx-navuser [userName]="userName">
        <div class="user-loading profile-image-placeholder"></div>
        <prx-image *ngIf="userImageDoc" class="user-loaded" [imageDoc]="userImageDoc"></prx-image>
      </prx-navuser> 
    </prx-header>
    <main>
      <article>
        <section class="main demo">
          <router-outlet></router-outlet>
        </section>
      </article>
    </main>
  `,
  styles: [`
    /* this placeholder should go away once we have the ImageLoaderComponent moved over and use it in this example */
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
export class AppComponent {
  authHost = 'id-staging.prx.tech';
  authClient = 'lVN05vLI8aCADh7lzbrL0AkDvEfPNuoEPpL2umL5';
  cmsHost = 'cms-staging.prx.tech';
  userImageDoc: HalDoc;
  userName: string;

  constructor(
    private auth: AuthService,
    private hal: HalService,
  ) {
    auth.token.subscribe(token => this.loadAccount(token));
  }

  loadAccount(token: string) {
    if (token) {
      this.hal.authorized(this.cmsHost).followItems('prx:accounts').subscribe((docs: HalDoc[]) => {
        const individualAccount = docs.find(d => d['type'] === 'IndividualAccount');
        this.userImageDoc = individualAccount;
        this.userName = individualAccount['name'];
      });
    } else {
      this.userImageDoc = null;
      this.userName = null;
    }
  }
}
