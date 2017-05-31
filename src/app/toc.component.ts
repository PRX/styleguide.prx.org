import { Component } from '@angular/core';

@Component({
  selector: 'table-of-contents',
  template: `
    <section>
      <ul>
        <li><a [routerLink]="['auth']"><b>Auth</b></a></li>
        <li><a [routerLink]="['charts']"><b>Charts</b></a></li>
        <li><a [routerLink]="['datepicker']"><b>DatePicker</b></a></li>
      </ul>
    </section>
  `,
})
export class TocComponent { }
