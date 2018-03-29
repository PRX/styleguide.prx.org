import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.token.map((token) => {
      if (token) {
        if (token === 'AUTHORIZATION_FAIL') {
          this.router.navigate(['/permission-denied']);
          return false;
        } else {
          return true;
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }).first();
  }

}
