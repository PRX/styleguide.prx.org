import { Component } from '@angular/core';

@Component({
  selector: 'table-of-contents',
  template: `
    <section>
      <h2>Navigation</h2>
      <p>In the header above you see the following components in use</p>
      <ul>
        <li>HeaderComponent 
          - a fixed position navigation bar that shows a home logo link and supports other navigation items with projected content</li>
        <li>NavItemComponent
          - a component that provides a router link within the application or an href link outside the application dependent 
          on its <code>Input()</code>s: <code>route</code>, <code>href</code>, and <code>text</code></li>
        <li>NavUserComponent 
          - a component that shows the username and projected content based on selectors for <code>user-loaded</code> or <code>user-loading</code></li>
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
