import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { routing, routingProviders, routingComponents } from './app.routing';

import {
  AuthModule,
  ChartsModule,
  DatepickerModule,
  HalModule,
  HeaderModule,
  ImageModule,
  SpinnerModule
} from 'ngx-prx-styleguide';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    ChartsModule,
    DatepickerModule,
    FormsModule,
    HalModule,
    HeaderModule,
    ImageModule,
    SpinnerModule,
    routing
  ],
  declarations: [ AppComponent, routingComponents ],
  providers:    [ routingProviders ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
