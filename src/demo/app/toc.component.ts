import { Component } from '@angular/core';

@Component({
  selector: 'table-of-contents',
  template: `    
    <section>
      <h1>Navigation</h1>
      <ul>
        <li>
          <a [routerLink]="['header']">HeaderComponent</a> - a fixed position navigation bar that shows 
          a home logo link and supports other navigation items with projected content
        </li>
        <li>
          <a [routerLink]="['navitem']">NavItemComponent</a> - provides a router link within the application 
          or an href link outside the application
        </li>
        <li>
          <a [routerLink]="['navuser']">NavUserComponent</a> - shows the username and selector based projected content
        </li>
      </ul>
    </section>
    <hr>
    <section>
        <h1>Global CSS</h1>
        <ul>
          <li>
            <a [routerLink]="['reset']">Reset</a> - resets the styling of HTML elements to a consistent baseline 
            to reset the browser's 'user agent' stylesheet
          </li>
          <li><a [routerLink]="['layout']">Layout</a></li>
        </ul>
    </section>
    <hr>
    <section>
      <h1>Data Visualization</h1>
      <ul>
        <li><a [routerLink]="['charts']">Charts</a> - C3 chart components</li>
      </ul>
    </section>
    <hr>
    <section>
      <h1>PRX Services</h1>
      <ul>
        <li><a [routerLink]="['auth']">Auth</a> - authentication via id.prx.org</li>
        <li><a [routerLink]="['hal']">Hal</a> - base classes for using PRX hal-based services</li>
      </ul>
    </section>
    <hr>
    <section>
      <h1>Form Controls</h1>
      <ul>
        <li><a [routerLink]="['datepicker']">DatePicker</a> - Pikaday datepicker component</li>
      </ul>
    </section>
  `,
})
export class TocComponent { }
