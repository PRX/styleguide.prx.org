import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TooltipContentComponent, TooltipDirective],
  exports: [TooltipContentComponent, TooltipDirective],
  entryComponents: [TooltipContentComponent]
})
export class TooltipModule {}
