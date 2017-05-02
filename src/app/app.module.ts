import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrxStyleguideModule } from 'ngx-prx-styleguide';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, PrxStyleguideModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
