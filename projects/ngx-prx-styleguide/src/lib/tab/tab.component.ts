import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { BaseModel } from '../model/base.model';
import { TabService } from './tab.service';

@Component({
  selector: 'prx-tabs',
  styleUrls: ['tab.component.css'],
  template: `
    <div class="main">
      <section>
        <div class="subnav">
          <ng-content></ng-content>
        </div>
        <div class="page">
          <prx-spinner *ngIf="!model"></prx-spinner>
          <router-outlet></router-outlet>
        </div>
      </section>
    </div>
  `
})

export class TabComponent implements OnInit, OnChanges {

  @Input() model: BaseModel;

  constructor(private tab: TabService) {}

  ngOnInit() {
    if (this.model) {
      this.tab.setModel(this.model);
    }
  }

  ngOnChanges(changes: any) {
    if (changes.model && changes.model.currentValue) {
      this.tab.setModel(changes.model.currentValue);
    }
  }

}
