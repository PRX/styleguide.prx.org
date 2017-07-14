import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

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
    SpinnerModule,
    TabModule,
    ToastrModule,
    routing,
    tabDemoRouting
  ],
  declarations: [ AppComponent, routingComponents, tabDemoComponents ],
  providers:    [ routingProviders, ModalService, TabService, ToastrService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
