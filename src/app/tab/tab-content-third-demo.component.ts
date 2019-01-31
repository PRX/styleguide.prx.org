import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TabService } from 'ngx-prx-styleguide';
import { DemoModel } from '../model/demo.model';

@Component({
  selector: 'tab-content-third-demo',
  template: `
    <section class="demo" *ngIf="demo">
      <h1>Third Tab</h1>
      <p>Provided as example. Nothing to see here.</p>
    </section>
  `
})
export class TabContentThirdDemoComponent {
  tabSub: Subscription;
  demo: DemoModel;

  constructor(tab: TabService) {
    this.tabSub = tab.model.subscribe((d: DemoModel) => {
      this.demo = d;
    });
  }
}
