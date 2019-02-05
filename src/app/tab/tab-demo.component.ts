import { Component, OnInit } from '@angular/core';
import { DemoModel } from '../model/demo.model';
import { HalDoc } from 'ngx-prx-styleguide';

@Component({
  selector: 'tab-content-demo',
  template: `    
    <prx-tabs [model]="demo">
      <nav>
        <a routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" [routerLink]="['/tab']">First</a>
        <a routerLinkActive="active" [routerLink]="['second']">Second</a>
        <a routerLinkActive="active" [routerLink]="['third']">Third</a>
        <a disabled>Disabled</a>
      </nav>
    </prx-tabs>
  `
})
export class TabDemoComponent implements OnInit {
  demo: DemoModel;

  ngOnInit() {
    setTimeout(() => {
      this.demo = new DemoModel(null, new HalDoc({}, null));
    }, 3000);
  }
}
