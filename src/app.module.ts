import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  AppComponent,
  DatepickerComponent
} from './components';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent, DatepickerComponent ],
  imports: [ BrowserModule ]
})
export class AppModule {}