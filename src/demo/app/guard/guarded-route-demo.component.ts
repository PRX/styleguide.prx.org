import { Component } from '@angular/core';

@Component({
  template: `
    <section class="main demo">
      <h1>Looks like you're logged in!</h1>
      <p>Return to <a [routerLink]="['/guard']">AuthGuard example</a></p>
    </section>
  `
})

export class GuardedRouteDemoComponent {}