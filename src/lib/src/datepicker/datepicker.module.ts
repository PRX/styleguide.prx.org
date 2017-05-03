import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { DatepickerComponent } from './datepicker.component';
import { TimepickerComponent } from './timepicker.component';

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
export class DatepickerModule { }
