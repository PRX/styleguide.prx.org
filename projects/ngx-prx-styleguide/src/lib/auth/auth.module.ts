import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';
import { UserinfoService } from './userinfo.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
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
