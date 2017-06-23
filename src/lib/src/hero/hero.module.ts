import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerModule } from '../spinner/spinner.module';
import { HeroComponent } from './hero.component';

@NgModule({
  declarations: [
    HeroComponent
  ],
  exports: [
    HeroComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule
  ],
  providers: []
})

export class HeroModule { }
