import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';

import { TzDatepickerComponent } from './tz-datepicker.component';
import { DatepickerModule } from '../datepicker/datepicker.module';
import { SpinnerModule } from '../spinner/spinner.module';
import { TzTimestampValidatorDirective } from './tz-timestamp-validator.directive';
import { TzDataService } from './tz-data.service';

@NgModule({
  imports: [CommonModule, FormsModule, NgSelectModule, HttpClientModule, DatepickerModule, SpinnerModule],
  declarations: [TzDatepickerComponent, TzTimestampValidatorDirective],
  providers: [TzDataService],
  exports: [TzDatepickerComponent]
})
export class TzDatepickerModule {}
