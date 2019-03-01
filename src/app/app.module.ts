import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AuthGuard, DeactivateGuard, UnauthGuard } from 'ngx-prx-styleguide';

import { AppComponent }  from './app.component';
import { routing, routingProviders, routingComponents } from './app.routing';
import { tabDemoRouting, tabDemoComponents } from './tab/tab.routing';

import { geoDemoComponents } from './geo/index';

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
  TagsModule,
  ToastrModule,
  ToastrService
} from 'ngx-prx-styleguide';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
    TagsModule,
    ToastrModule,
    routing,
    tabDemoRouting
  ],
  declarations: [ AppComponent, routingComponents, tabDemoComponents, geoDemoComponents ],
  providers:    [ routingProviders,
                  AuthGuard, DeactivateGuard, UnauthGuard,
                  ModalService, TabService, ToastrService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
