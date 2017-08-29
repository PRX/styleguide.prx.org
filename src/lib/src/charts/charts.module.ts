import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexedChartComponent } from './indexed-chart.component';
import { TimeseriesChartComponent } from './timeseries-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IndexedChartComponent,
    TimeseriesChartComponent
  ],
  providers: [
  ],
  exports: [
    IndexedChartComponent,
    TimeseriesChartComponent
  ]
})
export class ChartsModule { }
