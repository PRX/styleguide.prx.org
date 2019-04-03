import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarTextComponent } from './status-bar-text/status-bar-text.component';
import { StatusBarComponent } from './status-bar.component';

@NgModule({
  declarations: [StatusBarTextComponent, StatusBarComponent],
  imports: [
    CommonModule
  ],
  exports: [StatusBarTextComponent, StatusBarComponent]
})
export class StatusBarModule { }
