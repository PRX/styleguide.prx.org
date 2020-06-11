import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing, routingProviders, routingComponents } from './app.routing';

@NgModule({
  imports: [BrowserModule, HttpClientModule, routing],
  declarations: [AppComponent, routingComponents],
  providers: [routingProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
