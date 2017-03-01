import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DatepickerModule } from './app/components';

import { exampleComponents } from './app.routing';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    exampleComponents
  ],
  imports: [ BrowserModule, DatepickerModule ]
})
export class AppModule {}
