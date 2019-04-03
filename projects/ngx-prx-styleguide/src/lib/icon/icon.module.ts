import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconChevronComponent } from './icon-chevron/icon-chevron.component';
import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconChevronComponent, IconComponent],
  imports: [
    CommonModule
  ],
  exports: [IconChevronComponent, IconComponent]
})
export class IconModule { }
