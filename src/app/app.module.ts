import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { routing, routingProviders, routingComponents } from './app.routing';

import {
  AuthModule,
  ChartsModule,
  DatepickerModule,
  HalModule,
  HeaderModule
} from 'ngx-prx-styleguide';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    ChartsModule,
    DatepickerModule,
    HalModule,
    HeaderModule,
    routing
  ],
  declarations: [ AppComponent, routingComponents ],
  providers:    [ routingProviders ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
