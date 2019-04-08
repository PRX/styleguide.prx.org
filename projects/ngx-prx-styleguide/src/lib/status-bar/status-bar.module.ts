import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarTextComponent } from './status-bar-text/status-bar-text.component';
import { StatusBarComponent } from './status-bar.component';
import { StatusBarLinkComponent } from './status-bar-link/status-bar-link.component';

@NgModule({
  declarations: [StatusBarTextComponent, StatusBarComponent, StatusBarLinkComponent],
  imports: [
    CommonModule
  ],
  exports: [StatusBarTextComponent, StatusBarComponent, StatusBarLinkComponent]
})
export class StatusBarModule { }
