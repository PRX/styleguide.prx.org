export * from './src/app/components';
export { ChartsModule,
  IndexedChartModel, LegendItemModel, TimeseriesChartModel, TimeseriesDatumModel,
// TODO: read somewhere that components should also be exported for component libs, need to confirm
  LegendComponent, LegendItemComponent,
  LineIndexedChartComponent, PieChartComponent,
  StackedBarCategoryRotatedChartComponent,
  StackedBarTimeseriesChartComponent,
  LineTimeseriesChartComponent } from 'chart.prx.org';
