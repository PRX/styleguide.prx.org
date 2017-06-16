import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TocComponent } from './toc.component';
import { AuthDemoComponent } from './auth/auth-demo.component';
import { ChartsDemoComponent } from './charts/charts-demo.component';
import { DatepickerDemoComponent } from './datepicker/datepicker-demo.component';
import { HalDemoComponent } from './hal/hal-demo.component';
import { HeaderDemoComponent } from './header/header-demo.component';
import { NavItemDemoComponent } from './header/navitem-demo.component';
import { NavUserDemoComponent } from './header/navuser-demo.component';
import { AppDemoComponent } from './global-css/app-demo.component';
import { ButtonDemoComponent } from './global-css/button-demo.component';
import { FormDemoComponent } from './global-css/form-demo.component';
import { LayoutDemoComponent } from './global-css/layout-demo.component';
import { ResetDemoComponent } from './global-css/reset-demo.component';

export const routes: Routes = [
  { path: '',               component: TocComponent },
  { path: 'auth',           component: AuthDemoComponent },
  { path: 'charts',         component: ChartsDemoComponent },
  { path: 'datepicker',     component: DatepickerDemoComponent },
  { path: 'global/app',     component: AppDemoComponent },
  { path: 'global/button',  component: ButtonDemoComponent },
  { path: 'global/form',    component: FormDemoComponent },
  { path: 'global/layout',  component: LayoutDemoComponent },
  { path: 'global/reset',   component: ResetDemoComponent },
  { path: 'hal',            component: HalDemoComponent },
  { path: 'header',         component: HeaderDemoComponent },
  { path: 'navitem',        component: NavItemDemoComponent },
  { path: 'navuser',        component: NavUserDemoComponent },
];

export const routingComponents: any[] = [
  TocComponent,
  AuthDemoComponent,
  ChartsDemoComponent,
  DatepickerDemoComponent,
  AppDemoComponent,
  ButtonDemoComponent,
  FormDemoComponent,
  LayoutDemoComponent,
  ResetDemoComponent,
  HalDemoComponent,
  HeaderDemoComponent,
  NavItemDemoComponent,
  NavUserDemoComponent
];

export const routingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
