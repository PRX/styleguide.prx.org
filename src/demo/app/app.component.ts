import { Component } from '@angular/core';

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
        <section class="main">
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
export class AppComponent { }
