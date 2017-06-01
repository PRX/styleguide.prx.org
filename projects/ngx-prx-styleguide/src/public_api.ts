export { ChartsModule }         from './src/charts/charts.module';
export { IndexedChartModel }    from './src/charts/models/indexed-chart.model';
export { LegendItemModel }      from './src/charts/models/legend-item.model';
export { TimeseriesChartModel } from './src/charts/models/timeseries-chart.model';
export { TimeseriesDatumModel } from './src/charts/models/timeseries-datum.model';

export { AuthModule } from './src/auth/auth.module';
export { AuthService } from './src/auth/auth.service';

export { DatepickerModule } from './src/datepicker/datepicker.module';

export { HalModule } from './src/hal/hal.module';
export { HalService } from './src/hal/hal.service';
export { HalDoc } from './src/hal/doc/haldoc';
export { HalObservable } from './src/hal/doc/halobservable';
// TODO: better way to extend observables? perhaps on-the-fly?
import './src/hal/doc/halobservable';

export { HeaderModule } from './src/header/header.module';
