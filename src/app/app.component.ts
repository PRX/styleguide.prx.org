import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <h2>DatePicker:</h2>
    <prx-datepicker [date]="now" [changed]="changed"></prx-datepicker>
  `,
})
export class AppComponent {

  now = new Date();
  changed = false;

  constructor() {}
}
