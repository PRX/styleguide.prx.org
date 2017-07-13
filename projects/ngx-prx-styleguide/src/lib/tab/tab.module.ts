import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from '../spinner/spinner.module';
import { TabComponent } from './tab.component';
import { TabService } from './tab.service';

@NgModule({
  declarations: [
    TabComponent
  ],
  exports: [
    TabComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SpinnerModule
  ],
  providers: [TabService]
})

export class TabModule { }
