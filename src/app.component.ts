import { Component } from '@angular/core';

require('pikaday/css/pikaday.css');
require('pikaday/css/triangle.css');
require('c3/c3.css');
require('./global-styles.css');

@Component({
  selector: 'prx-styleguide',
  template: `
    <app-datepicker-example></app-datepicker-example>
    <app-line-indexed-chart-example></app-line-indexed-chart-example>
  `
})
export class AppComponent {
}
