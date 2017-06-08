import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TocComponent } from './toc.component';
import { AuthDemoComponent } from './auth/auth-demo.component';
import { ChartsDemoComponent } from './charts/charts-demo.component';
import { DatepickerDemoComponent } from './datepicker/datepicker-demo.component';
import { HalDemoComponent } from './hal/hal-demo.component';
import { HeaderDemoComponent } from './nav/header-demo.component';
import { NavItemDemoComponent } from './nav/navitem-demo.component';
import { NavUserDemoComponent } from './nav/navuser-demo.component';
import { ResetDemoComponent } from './global-css/reset-demo.component';

export const routes: Routes = [
  { path: '',           component: TocComponent },
  { path: 'auth',       component: AuthDemoComponent },
  { path: 'charts',     component: ChartsDemoComponent },
  { path: 'datepicker', component: DatepickerDemoComponent },
  { path: 'hal',        component: HalDemoComponent },
  { path: 'header',        component: HeaderDemoComponent },
  { path: 'navitem',        component: NavItemDemoComponent },
  { path: 'navuser',        component: NavUserDemoComponent },
  { path: 'reset',      component: ResetDemoComponent }
];

export const routingComponents: any[] = [
  TocComponent,
  AuthDemoComponent,
  ChartsDemoComponent,
  DatepickerDemoComponent,
  HalDemoComponent,
  HeaderDemoComponent,
  NavItemDemoComponent,
  NavUserDemoComponent,
  ResetDemoComponent
];

export const routingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
