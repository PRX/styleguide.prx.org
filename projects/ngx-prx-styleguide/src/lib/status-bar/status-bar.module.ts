import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as moduleExports from './';
import { IconModule } from '../icon/icon.module';
import { ImageModule } from '../image/image.module';

@NgModule({
  declarations: [
    moduleExports.StatusBarTextComponent,
    moduleExports.StatusBarComponent,
    moduleExports.StatusBarLinkComponent,
    moduleExports.StatusBarIconComponent,
    moduleExports.StatusBarImageComponent
  ],
  imports: [CommonModule, IconModule, ImageModule],
  exports: [
    moduleExports.StatusBarTextComponent,
    moduleExports.StatusBarComponent,
    moduleExports.StatusBarLinkComponent,
    moduleExports.StatusBarIconComponent,
    moduleExports.StatusBarImageComponent
  ]
})
export class StatusBarModule {}
