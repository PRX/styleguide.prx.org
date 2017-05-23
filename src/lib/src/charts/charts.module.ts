import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegendComponent } from './legend/legend.component';
import { LegendItemComponent } from './legend/legend-item.component';
import { LineIndexedChartComponent } from './line-indexed-chart/line-indexed-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { StackedBarCategoryRotatedChartComponent } from './stacked-bar-category-rotated-chart/stacked-bar-category-rotated-chart.component';
import { StackedBarTimeseriesChartComponent } from './stacked-bar-timeseries-chart/stacked-bar-timeseries-chart.component';
import { LineTimeseriesChartComponent } from './line-timeseries-chart/line-timeseries-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LegendComponent,
    LegendItemComponent,
    LineIndexedChartComponent,
    PieChartComponent,
    StackedBarCategoryRotatedChartComponent,
    StackedBarTimeseriesChartComponent,
    LineTimeseriesChartComponent
  ],
  providers: [
  ],
  exports: [
    LineIndexedChartComponent,
    PieChartComponent,
    StackedBarCategoryRotatedChartComponent,
    StackedBarTimeseriesChartComponent,
    LineTimeseriesChartComponent
  ]
})
export class ChartsModule { }
