import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HalService } from './hal.service';
import './doc/halobservable';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    HalService
  ],
  exports: [
    HttpClientModule
  ]
})
export class HalModule { }
