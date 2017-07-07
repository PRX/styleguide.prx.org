import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalModule } from '../modal/modal.module';
import { SpinnerModule } from '../spinner/spinner.module';

import { AdvancedConfirmDirective } from './advanced-confirm.directive';
import { ButtonComponent } from './button.component';
import { CapitalizePipe } from './capitalize.pipe';
import { FancyDurationComponent } from './fancy-duration.component';
import { FancyFieldComponent } from './fancy-field.component';
import { PadZeroPipe } from './padzero.pipe';

@NgModule({
  declarations: [
    AdvancedConfirmDirective,
    ButtonComponent,
    CapitalizePipe,
    FancyDurationComponent,
    FancyFieldComponent,
    PadZeroPipe
  ],
  exports: [
    AdvancedConfirmDirective,
    ButtonComponent,
    CapitalizePipe,
    FancyDurationComponent,
    FancyFieldComponent,
    PadZeroPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ModalModule,
    SpinnerModule
  ],
  providers: []
})

export class FancyFormModule { }