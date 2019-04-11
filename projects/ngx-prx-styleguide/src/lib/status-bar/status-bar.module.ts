import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarTextComponent } from './status-bar-text/status-bar-text.component';
import { StatusBarComponent } from './status-bar.component';
import { StatusBarLinkComponent } from './status-bar-link/status-bar-link.component';
import { StatusBarIconComponent } from './status-bar-icon/status-bar-icon.component';
import { StatusBarImageComponent } from './status-bar-image/status-bar-image.component';
import { IconModule, iconNames, iconColorOptions } from '../icon/icon.module';
import { ImageModule } from '../image/image.module';

export {iconNames, iconColorOptions };

@NgModule({
  declarations: [StatusBarTextComponent, StatusBarComponent, StatusBarLinkComponent, StatusBarIconComponent, StatusBarImageComponent],
  imports: [
    CommonModule,
    IconModule,
    ImageModule
  ],
  exports: [StatusBarTextComponent, StatusBarComponent, StatusBarLinkComponent, StatusBarIconComponent, StatusBarImageComponent]
})
export class StatusBarModule { }
