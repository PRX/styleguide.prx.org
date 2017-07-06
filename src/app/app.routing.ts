import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TocComponent } from './toc.component';
import { AdvancedConfirmDemoComponent } from './fancy-form/advanced-confirm-demo.component';
import { ButtonDemoComponent } from './fancy-form/button-demo.component';
import { AuthDemoComponent } from './auth/auth-demo.component';
import { BaseModelDemoComponent } from './model/base-model-demo.component';
import { CapitalizeDemoComponent } from './fancy-form/capitalize-demo.component';
import { ChartsDemoComponent } from './charts/charts-demo.component';
import { DatepickerDemoComponent } from './datepicker/datepicker-demo.component';
import { FancyDurationDemoComponent } from './fancy-form/fancy-duration-demo.component';
import { FancyFieldDemoComponent } from './fancy-form/fancy-field-demo.component';
import { PadZeroDemoComponent } from './fancy-form/padzero-demo.component';
import { HalDemoComponent } from './hal/hal-demo.component';
import { HeaderDemoComponent } from './header/header-demo.component';
import { NavItemDemoComponent } from './header/navitem-demo.component';
import { NavUserDemoComponent } from './header/navuser-demo.component';
import { HeroDemoComponent } from './hero/hero-demo.component';
import { AppDemoComponent } from './global-css/app-demo.component';
import { ButtonDemoComponent } from './global-css/button-demo.component';
import { FormDemoComponent } from './global-css/form-demo.component';
import { LayoutDemoComponent } from './global-css/layout-demo.component';
import { ResetDemoComponent } from './global-css/reset-demo.component';
import { ImageLoaderDemoComponent } from './image/image-loader-demo.component';
import { ModalDemoComponent } from './modal/modal-demo.component';
import { SpinnerDemoComponent } from './spinner/spinner-demo.component';

export const routes: Routes = [
  { path: '',                     component: TocComponent },
  { path: 'auth',                 component: AuthDemoComponent },
  { path: 'charts',               component: ChartsDemoComponent },
  { path: 'form/advancedconfirm', component: AdvancedConfirmDemoComponent},
  { path: 'form/button',          component: ButtonDemoComponent },
  { path: 'form/datepicker',      component: DatepickerDemoComponent },
  { path: 'form/capitalize',      component: CapitalizeDemoComponent },
  { path: 'form/fancy-duration',  component: FancyDurationDemoComponent },
  { path: 'form/fancy-field',     component: FancyFieldDemoComponent },
  { path: 'form/padzero',         component: PadZeroDemoComponent },
  { path: 'global/app',           component: AppDemoComponent },
  { path: 'global/button',        component: ButtonDemoComponent },
  { path: 'global/form',          component: FormDemoComponent },
  { path: 'global/layout',        component: LayoutDemoComponent },
  { path: 'global/reset',         component: ResetDemoComponent },
  { path: 'hal',                  component: HalDemoComponent },
  { path: 'header',               component: HeaderDemoComponent },
  { path: 'header/navitem',       component: NavItemDemoComponent },
  { path: 'header/navuser',       component: NavUserDemoComponent },
  { path: 'hero',                 component: HeroDemoComponent },
  { path: 'image/imageloader',    component: ImageLoaderDemoComponent },
  { path: 'modal',                component: ModalDemoComponent },
  { path: 'model',                component: BaseModelDemoComponent },
  { path: 'util/spinner',         component: SpinnerDemoComponent }
];

export const routingComponents: any[] = [
  TocComponent,
  AdvancedConfirmDemoComponent,
  AuthDemoComponent,
  BaseModelDemoComponent,
  ButtonDemoComponent,
  CapitalizeDemoComponent,
  ChartsDemoComponent,
  DatepickerDemoComponent,
  AppDemoComponent,
  ButtonDemoComponent,
  FancyDurationDemoComponent,
  FancyFieldDemoComponent,
  FormDemoComponent,
  LayoutDemoComponent,
  ModalDemoComponent,
  ResetDemoComponent,
  HalDemoComponent,
  HeaderDemoComponent,
  HeroDemoComponent,
  ImageLoaderDemoComponent,
  NavItemDemoComponent,
  NavUserDemoComponent,
  PadZeroDemoComponent,
  SpinnerDemoComponent
];

export const routingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
