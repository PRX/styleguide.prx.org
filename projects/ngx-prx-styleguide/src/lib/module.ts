import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { DatepickerComponent } from './datepicker/datepicker.component';
import { TimepickerComponent } from './datepicker/timepicker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DatepickerComponent,
    TimepickerComponent,
  ],
  providers: [
  ],
  exports: [
    DatepickerComponent,
    TimepickerComponent,
  ],
})
export class PrxStyleguideModule { }
