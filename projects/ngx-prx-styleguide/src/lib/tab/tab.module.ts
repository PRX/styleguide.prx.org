import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabComponent } from './tab.component';
import { TabService } from './tab.service';

@NgModule({
  declarations: [
    TabComponent
  ],
  exports: [
    TabComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [TabService]
})

export class TabModule { }
