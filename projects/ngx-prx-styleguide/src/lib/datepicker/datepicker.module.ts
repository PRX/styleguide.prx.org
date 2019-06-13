import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IconModule } from '../icon/icon.module';

import { CalpickerComponent } from './calpicker.component';
import { DatepickerComponent } from './datepicker.component';
import { DaterangeComponent } from './daterange.component';
import { TimepickerComponent } from './timepicker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconModule
  ],
  declarations: [
    CalpickerComponent,
    DatepickerComponent,
    DaterangeComponent,
    TimepickerComponent,
  ],
  providers: [
  ],
  exports: [
    CalpickerComponent,
    DatepickerComponent,
    DaterangeComponent,
    TimepickerComponent,
  ],
})
export class DatepickerModule { }
