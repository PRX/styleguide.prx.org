import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { HalService } from './hal.service';
import './doc/halobservable';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    HalService
  ],
  exports: []
})
export class HalModule { }
