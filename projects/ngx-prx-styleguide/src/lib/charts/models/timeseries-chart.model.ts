export interface TimeseriesDatumModel {
  value: number;
  date: number;
}

export interface TimeseriesChartModel {
  data: TimeseriesDatumModel[];
  label: string;
  color: string;
}
