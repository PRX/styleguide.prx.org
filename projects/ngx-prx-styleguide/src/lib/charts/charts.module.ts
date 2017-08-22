import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineIndexedChartComponent } from './line-indexed-chart/line-indexed-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { StackedAreaTimeseriesChartComponent } from './stacked-area-timeseries-chart/stacked-area-timeseries-chart.component';
import { StackedBarCategoryRotatedChartComponent } from './stacked-bar-category-rotated-chart/stacked-bar-category-rotated-chart.component';
import { StackedBarTimeseriesChartComponent } from './stacked-bar-timeseries-chart/stacked-bar-timeseries-chart.component';
import { LineTimeseriesChartComponent } from './line-timeseries-chart/line-timeseries-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LineIndexedChartComponent,
    PieChartComponent,
    StackedAreaTimeseriesChartComponent,
    StackedBarCategoryRotatedChartComponent,
    StackedBarTimeseriesChartComponent,
    LineTimeseriesChartComponent
  ],
  providers: [
  ],
  exports: [
    LineIndexedChartComponent,
    PieChartComponent,
    StackedAreaTimeseriesChartComponent,
    StackedBarCategoryRotatedChartComponent,
    StackedBarTimeseriesChartComponent,
    LineTimeseriesChartComponent
  ]
})
export class ChartsModule { }
