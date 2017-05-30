import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <prx-header>
      <prx-navitem route="/" text="PRX StyleGuide"></prx-navitem>
      <prx-navuser userName="Mary"></prx-navuser> 
    </prx-header>
    <main>
      <article>
        <router-outlet></router-outlet>
      </article>
    </main>
  `,
})
export class AppComponent { }
