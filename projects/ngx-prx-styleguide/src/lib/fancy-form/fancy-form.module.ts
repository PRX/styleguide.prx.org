import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalModule } from '../modal/modal.module';
import { SelectModule } from '../select/select.module';
import { SpinnerModule } from '../spinner/spinner.module';

import * as moduleExports from './';

@NgModule({
  declarations: [
    moduleExports.AdvancedConfirmDirective,
    moduleExports.ButtonComponent,
    moduleExports.CapitalizePipe,
    moduleExports.CheckboxComponent,
    moduleExports.FancyDurationComponent,
    moduleExports.FancyFieldComponent,
    moduleExports.PadZeroPipe
  ],
  exports: [
    moduleExports.AdvancedConfirmDirective,
    moduleExports.ButtonComponent,
    moduleExports.CapitalizePipe,
    moduleExports.CheckboxComponent,
    moduleExports.FancyDurationComponent,
    moduleExports.FancyFieldComponent,
    moduleExports.PadZeroPipe
  ],
  imports: [CommonModule, FormsModule, RouterModule, ModalModule, SelectModule, SpinnerModule],
  providers: []
})
export class FancyFormModule {}
