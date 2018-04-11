import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';
import { UserinfoService } from './userinfo.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  providers: [
    AuthService,
    UserinfoService
  ],
  exports: [
    AuthComponent,
    LoginComponent
  ]
})
export class AuthModule { }
