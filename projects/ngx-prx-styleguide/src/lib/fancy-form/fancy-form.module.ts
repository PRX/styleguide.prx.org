import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalModule } from '../modal/modal.module';
import { SelectModule } from '../select/select.module';
import { SpinnerModule } from '../spinner/spinner.module';

import { AdvancedConfirmDirective } from './advanced-confirm.directive';
import { ButtonComponent } from './button.component';
import { CapitalizePipe } from './capitalize.pipe';
import { CheckboxComponent } from './checkbox.component';
import { FancyDurationComponent } from './fancy-duration.component';
import { FancyFieldComponent } from './fancy-field.component';
import { PadZeroPipe } from './padzero.pipe';

@NgModule({
  declarations: [
    AdvancedConfirmDirective,
    ButtonComponent,
    CapitalizePipe,
    CheckboxComponent,
    FancyDurationComponent,
    FancyFieldComponent,
    PadZeroPipe
  ],
  exports: [
    AdvancedConfirmDirective,
    ButtonComponent,
    CapitalizePipe,
    CheckboxComponent,
    FancyDurationComponent,
    FancyFieldComponent,
    PadZeroPipe
  ],
  imports: [CommonModule, FormsModule, RouterModule, ModalModule, SelectModule, SpinnerModule],
  providers: []
})
export class FancyFormModule {}
