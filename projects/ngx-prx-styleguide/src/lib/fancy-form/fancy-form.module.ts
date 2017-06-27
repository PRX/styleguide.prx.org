import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalModule } from '../modal/modal.module';

import { AdvancedConfirmDirective } from './advanced-confirm.directive';
import { CapitalizePipe } from './capitalize.pipe';
import { FancyFieldComponent } from './fancy-field.component';

@NgModule({
  declarations: [
    AdvancedConfirmDirective,
    CapitalizePipe,
    FancyFieldComponent
  ],
  exports: [
    AdvancedConfirmDirective,
    CapitalizePipe,
    FancyFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ModalModule
  ],
  providers: []
})

export class FancyFormModule { }
