import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TocComponent } from './toc.component';
import { ChartsDemoComponent } from './charts/charts-demo.component';
import { DatepickerDemoComponent } from './datepicker/datepicker-demo.component';

export const routes: Routes = [
  { path: '',           component: TocComponent },
  { path: 'charts',     component: ChartsDemoComponent },
  { path: 'datepicker', component: DatepickerDemoComponent }
];

export const routingComponents: any[] = [
  TocComponent,
  ChartsDemoComponent,
  DatepickerDemoComponent
];

export const routingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
