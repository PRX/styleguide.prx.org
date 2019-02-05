import { Component } from '@angular/core';

@Component({
  selector: 'prx-header',
  styleUrls: ['./header.component.css'],
  template: `
    <header>
      <h1><a [routerLink]="['/']">PRX</a></h1>
      <nav>
        <ng-content></ng-content>
      </nav>
    </header>
    `
})

export class HeaderComponent {}
