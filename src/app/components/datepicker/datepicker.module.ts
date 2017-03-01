import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DatepickerComponent } from './datepicker.component';
import { TimepickerComponent } from './timepicker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DatepickerComponent,
    TimepickerComponent
  ],
  exports: [
    DatepickerComponent,
    TimepickerComponent
  ],
  providers: []
})
export class DatepickerModule { }