import { Component } from '@angular/core';

@Component({
  selector: 'table-of-contents',
  template: `
    <section>
      <h2>Navigation</h2>
      <p>In the header above you see the following components in use</p>
      <ul>
        <li>HeaderComponent</li>
        <li>NavItemComponent</li>
        <li>NavUserComponent</li>
      </ul>
    </section>
    <hr>
    <section>
      <h2>Data Visualization</h2>
      <ul>
        <li><a [routerLink]="['charts']"><b>Charts</b></a></li>
      </ul>
    </section>
    <hr>
    <section>
      <h2>Form Controls</h2>
      <ul>
        <li><a [routerLink]="['datepicker']"><b>DatePicker</b></a></li>
      </ul>
    </section>
  `,
})
export class TocComponent { }
