import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UnauthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.token.map((token) => {
      if (token) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    }).first();
  }

}
