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
  HeroModule,
  FancyFormModule,
  ImageModule,
  ModalModule,
  ModalService,
  SpinnerModule
} from 'ngx-prx-styleguide';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
    ChartsModule,
    DatepickerModule,
    FancyFormModule,
    FormsModule,
    HalModule,
    HeaderModule,
    HeroModule,
    ImageModule,
    ModalModule,
    SpinnerModule,
    routing
  ],
  declarations: [ AppComponent, routingComponents ],
  providers:    [ routingProviders, ModalService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
