import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <main>
      <h1><a [routerLink]="['/']">PRX StyleGuide</a></h1>
      <article>
        <router-outlet></router-outlet>
      </article>
    </main>
  `,
})
export class AppComponent { }
