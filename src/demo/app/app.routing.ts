import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TocComponent } from './toc.component';
import { AdvancedConfirmDemoComponent } from './fancy-form/advanced-confirm-demo.component';
import { AuthDemoComponent } from './auth/auth-demo.component';
import { BaseModelDemoComponent } from './model/base-model-demo.component';
import { CapitalizeDemoComponent } from './fancy-form/capitalize-demo.component';
import { ChartsIndexedDemoComponent } from './charts/charts-indexed-demo.component';
import { ChartsTimeseriesDemoComponent } from './charts/charts-timeseries-demo.component';
import { CheckboxDemoComponent } from './fancy-form/checkbox-demo.component';
import { DatepickerDemoComponent } from './datepicker/datepicker-demo.component';
import { DaterangeDemoComponent } from './datepicker/daterange-demo.component';
import { FancyButtonDemoComponent } from './fancy-form/button-demo.component';
import { FancyDurationDemoComponent } from './fancy-form/fancy-duration-demo.component';
import { FancyFieldDemoComponent } from './fancy-form/fancy-field-demo.component';
import { PadZeroDemoComponent } from './fancy-form/padzero-demo.component';
import { FooterDemoComponent } from './footer/footer-demo.component';
import { HalDemoComponent } from './hal/hal-demo.component';
import { HeaderDemoComponent } from './header/header-demo.component';
import { NavItemDemoComponent } from './header/navitem-demo.component';
import { NavUserDemoComponent } from './header/navuser-demo.component';
import { HeroDemoComponent } from './hero/hero-demo.component';
import { GuardDemoComponent } from './guard/guard-demo.component';
import { GuardedRouteDemoComponent } from './guard/guarded-route-demo.component';
import { LoginDemoComponent } from './guard/login-demo.component';
import { AppDemoComponent } from './global-css/app-demo.component';
import { ButtonDemoComponent } from './global-css/button-demo.component';
import { FormDemoComponent } from './global-css/form-demo.component';
import { IconDemoComponent } from './global-css/icon-demo.component';
import { LayoutDemoComponent } from './global-css/layout-demo.component';
import { ResetDemoComponent } from './global-css/reset-demo.component';
import { ImageLoaderDemoComponent } from './image/image-loader-demo.component';
import { ModalDemoComponent } from './modal/modal-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { SpinnerDemoComponent } from './spinner/spinner-demo.component';
import { ToastrDemoComponent } from './toastr/toastr-demo.component';

import { AuthGuard, DeactivateGuard, UnauthGuard } from 'ngx-prx-styleguide';

export const routes: Routes = [
  { path: '',                     component: TocComponent },
  { path: 'auth',                 component: AuthDemoComponent },
  { path: 'charts/indexed',       component: ChartsIndexedDemoComponent },
  { path: 'charts/timeseries',    component: ChartsTimeseriesDemoComponent },
  { path: 'footer',               component: FooterDemoComponent },
  { path: 'form/advancedconfirm', component: AdvancedConfirmDemoComponent},
  { path: 'form/button',          component: FancyButtonDemoComponent },
  { path: 'form/checkbox',        component: CheckboxDemoComponent },
  { path: 'form/datepicker',      component: DatepickerDemoComponent },
  { path: 'form/daterange',       component: DaterangeDemoComponent },
  { path: 'form/capitalize',      component: CapitalizeDemoComponent },
  { path: 'form/fancy-duration',  component: FancyDurationDemoComponent },
  { path: 'form/fancy-field',     component: FancyFieldDemoComponent },
  { path: 'form/padzero',         component: PadZeroDemoComponent },
  { path: 'form/select',          component: SelectDemoComponent },
  { path: 'guard/guarded',        component: GuardedRouteDemoComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuard] },
  { path: 'guard',                component: GuardDemoComponent },
  { path: 'global/app',           component: AppDemoComponent },
  { path: 'global/button',        component: ButtonDemoComponent },
  { path: 'global/icons',         component: IconDemoComponent },
  { path: 'global/form',          component: FormDemoComponent },
  { path: 'global/layout',        component: LayoutDemoComponent },
  { path: 'global/reset',         component: ResetDemoComponent },
  { path: 'hal',                  component: HalDemoComponent },
  { path: 'header',               component: HeaderDemoComponent },
  { path: 'header/navitem',       component: NavItemDemoComponent },
  { path: 'header/navuser',       component: NavUserDemoComponent },
  { path: 'hero',                 component: HeroDemoComponent },
  { path: 'image/imageloader',    component: ImageLoaderDemoComponent },
  { path: 'login',                component: LoginDemoComponent, canActivate: [UnauthGuard] },
  { path: 'modal',                component: ModalDemoComponent },
  { path: 'model',                component: BaseModelDemoComponent },
  { path: 'toastr',               component: ToastrDemoComponent },
  { path: 'util/spinner',         component: SpinnerDemoComponent }
];

export const routingComponents: any[] = [
  TocComponent,
  AdvancedConfirmDemoComponent,
  AuthDemoComponent,
  BaseModelDemoComponent,
  ButtonDemoComponent,
  CapitalizeDemoComponent,
  ChartsIndexedDemoComponent,
  ChartsTimeseriesDemoComponent,
  CheckboxDemoComponent,
  DatepickerDemoComponent,
  DaterangeDemoComponent,
  AppDemoComponent,
  ButtonDemoComponent,
  FancyButtonDemoComponent,
  FancyDurationDemoComponent,
  FancyFieldDemoComponent,
  FooterDemoComponent,
  FormDemoComponent,
  GuardDemoComponent,
  GuardedRouteDemoComponent,
  LayoutDemoComponent,
  LoginDemoComponent,
  ModalDemoComponent,
  ResetDemoComponent,
  HalDemoComponent,
  HeaderDemoComponent,
  HeroDemoComponent,
  IconDemoComponent,
  ImageLoaderDemoComponent,
  NavItemDemoComponent,
  NavUserDemoComponent,
  PadZeroDemoComponent,
  SelectDemoComponent,
  SpinnerDemoComponent,
  ToastrDemoComponent
];

export const routingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
