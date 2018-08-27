import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryChartComponent } from './category-chart.component';
import { IndexedChartComponent } from './indexed-chart.component';
import { TimeseriesChartComponent } from './timeseries-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CategoryChartComponent,
    IndexedChartComponent,
    TimeseriesChartComponent
  ],
  providers: [
  ],
  exports: [
    CategoryChartComponent,
    IndexedChartComponent,
    TimeseriesChartComponent
  ]
})
export class ChartsModule { }
