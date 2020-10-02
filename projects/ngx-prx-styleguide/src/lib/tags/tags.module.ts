import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TooltipModule } from '../tooltip/tooltip.module';

import { TagsComponent } from './tags.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgSelectModule, TooltipModule],
  declarations: [TagsComponent],
  exports: [TagsComponent]
})
export class TagsModule {}
