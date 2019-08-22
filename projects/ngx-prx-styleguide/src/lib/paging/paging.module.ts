import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagingComponent } from './paging.component';

@NgModule({
  declarations: [
    PagingComponent
  ],
  exports: [
    PagingComponent
  ],
  imports: [
    CommonModule
  ],
  providers: []
})

export class PagingModule { }
