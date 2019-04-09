import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickyDirective } from './sticky.directive';
import { StickyService } from './sticky.service';

@NgModule({
  declarations: [StickyDirective],
  imports: [
    CommonModule
  ],
  exports: [StickyDirective],
  providers: [StickyService]
})
export class StickyModule { }
