import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TocComponent } from './toc.component';
import { AuthDemoComponent } from './auth/auth-demo.component';
import { ChartsDemoComponent } from './charts/charts-demo.component';
import { DatepickerDemoComponent } from './datepicker/datepicker-demo.component';
import { HalDemoComponent } from './hal/hal-demo.component';

export const routes: Routes = [
  { path: '',           component: TocComponent },
  { path: 'auth',       component: AuthDemoComponent },
  { path: 'charts',     component: ChartsDemoComponent },
  { path: 'datepicker', component: DatepickerDemoComponent },
  { path: 'hal',        component: HalDemoComponent }
];

export const routingComponents: any[] = [
  TocComponent,
  AuthDemoComponent,
  ChartsDemoComponent,
  DatepickerDemoComponent,
  HalDemoComponent
];

export const routingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
