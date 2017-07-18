import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-demo',
  template: `
    <section class="main demo">
      <h1>Login</h1>
      <p>Return to <a [routerLink]="['/guard']">AuthGuard example</a></p>
      <div class="login">
        <p *ngIf="!errorMsg">You must login to use this app</p>
        <p *ngIf="errorMsg" class="error">{{errorMsg}}</p>
        <prx-login (success)="loginSuccess()" (failure)="loginFailure($event)">
        </prx-login>
      </div>
    </section>
  `
})

export class LoginDemoComponent {

  errorMsg: string;

  constructor(private router: Router) {}

  loginSuccess() {
    this.errorMsg = null;
    this.router.navigate(['/']);
  }

  loginFailure(reason: string) {
    this.errorMsg = reason;
  }

}
