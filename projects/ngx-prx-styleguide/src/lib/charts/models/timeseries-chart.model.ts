import { TimeseriesDatumModel } from './timeseries-datum.model';

export class TimeseriesChartModel {
  constructor(
    public data: TimeseriesDatumModel[],
    public label: string,
    public color: string,
  ) {  }
}
