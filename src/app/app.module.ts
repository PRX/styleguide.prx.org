import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AuthGuard, DeactivateGuard, UnauthGuard } from 'ngx-prx-styleguide';

import { AppComponent }  from './app.component';
import { routing, routingProviders, routingComponents } from './app.routing';
import { tabDemoRouting, tabDemoComponents } from './tab/tab.routing';

import {
  AuthModule,
  ChartsModule,
  DatepickerModule,
  FooterModule,
  HalModule,
  HeaderModule,
  HeroModule,
  FancyFormModule,
  ImageModule,
  ModalModule,
  ModalService,
  SelectModule,
  SpinnerModule,
  TabModule,
  TabService,
  ToastrModule,
  ToastrService
} from 'ngx-prx-styleguide';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    ChartsModule,
    DatepickerModule,
    FooterModule,
    FancyFormModule,
    HalModule,
    HeaderModule,
    HeroModule,
    ImageModule,
    ModalModule,
    SelectModule,
    SpinnerModule,
    TabModule,
    ToastrModule,
    routing,
    tabDemoRouting
  ],
  declarations: [ AppComponent, routingComponents, tabDemoComponents ],
  providers:    [ routingProviders,
                  AuthGuard, DeactivateGuard, UnauthGuard,
                  ModalService, TabService, ToastrService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
