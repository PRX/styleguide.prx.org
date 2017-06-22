import { Component } from '@angular/core';

@Component({
  selector: 'table-of-contents',
  template: `
    <section>
      <h2>Navigation</h2>
      <ul>
        <li>
          <a [routerLink]="['header']">HeaderComponent</a> - a fixed position navigation bar that shows 
          a home logo link and supports other navigation items using projected content
        </li>
        <li>
          <a [routerLink]="['header/navitem']">NavItemComponent</a> - provides a router link within the application 
          or an href link outside the application
        </li>
        <li>
          <a [routerLink]="['header/navuser']">NavUserComponent</a> - shows the username and selector based projected content
        </li>
      </ul>
    </section>
    <hr>
    <section>
      <h2>Global CSS</h2>
      <ul>
        <li>
          <a [routerLink]="['global/reset']">Reset</a> - resets the styling of HTML elements to a consistent baseline 
          to reset the browser's 'user agent' stylesheet
        </li>
        <li><a [routerLink]="['global/app']">App</a> - overall app consistent look and feel</li>
        <li><a [routerLink]="['global/layout']">Layout</a> - base page layout structure</li>
        <li><a [routerLink]="['global/form']">Form</a> - form element styling</li>
        <li><a [routerLink]="['global/button']">Button</a> - global button styling</li>
      </ul>
    </section>
    <hr>
    <section>
      <h2>Data Visualization</h2>
      <ul>
        <li><a [routerLink]="['charts']">Charts</a> - C3 chart components</li>
      </ul>
    </section>
    <hr>
    <section>
      <h2>PRX Services</h2>
      <ul>
        <li><a [routerLink]="['auth']">Auth</a> - authentication via id.prx.org</li>
        <li><a [routerLink]="['hal']">Hal</a> - base classes for using PRX hal-based services</li>
      </ul>
    </section>
    <hr>
    <section>
      <h2>Form Controls</h2>
      <ul>
        <li><a [routerLink]="['datepicker']">DatePicker</a> - Pikaday datepicker component</li>
      </ul>
    </section>
    <section>
      <h2>Images</h2>
      <ul>
        <li>
          <a [routerLink]="['image/imageloader']">ImageLoader</a> - a component that attempts to load 
          images and will show a placeholder if it doesn't exist or an error image if an error occurs.
        </li>
      </ul>
    </section>
  `,
})
export class TocComponent { }
