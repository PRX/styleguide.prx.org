import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { DatepickerComponent } from './datepicker.component';
import { DaterangeComponent } from './daterange.component';
import { TimepickerComponent } from './timepicker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DatepickerComponent,
    DaterangeComponent,
    TimepickerComponent,
  ],
  providers: [
  ],
  exports: [
    DatepickerComponent,
    DaterangeComponent,
    TimepickerComponent,
  ],
})
export class DatepickerModule { }
