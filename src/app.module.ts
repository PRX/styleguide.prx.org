import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DatepickerModule } from './app/components';
import { ChartsModule } from 'chart.prx.org';

import { exampleComponents } from './app.routing';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    exampleComponents
  ],
  imports: [ BrowserModule, DatepickerModule, ChartsModule ]
})
export class AppModule {}
