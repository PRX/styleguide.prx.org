import { Component } from '@angular/core';

require('pikaday/css/pikaday.css');
require('pikaday/css/triangle.css');
require('./global-styles.css');

@Component({
  selector: 'prx-styleguide',
  template: `<app-datepicker-example></app-datepicker-example>`
})
export class AppComponent {
}
