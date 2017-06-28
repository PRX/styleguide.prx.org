import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalModule } from '../modal/modal.module';

import { AdvancedConfirmDirective } from './advanced-confirm.directive';
import { CapitalizePipe } from './capitalize.pipe';
import { FancyDurationComponent } from './fancy-duration.component';
import { FancyFieldComponent } from './fancy-field.component';
import { PadZeroPipe } from './padzero.pipe';

@NgModule({
  declarations: [
    AdvancedConfirmDirective,
    CapitalizePipe,
    FancyDurationComponent,
    FancyFieldComponent,
    PadZeroPipe
  ],
  exports: [
    AdvancedConfirmDirective,
    CapitalizePipe,
    FancyDurationComponent,
    FancyFieldComponent,
    PadZeroPipe
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
