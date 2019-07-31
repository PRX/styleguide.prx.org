
import {skip} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  ReplaySubject } from 'rxjs';


@Injectable()
export class AuthService {

  static AUTHORIZATION_DENIED = 'AUTHORIZATION_DENIED';

  authHost: string;
  authClient: string;

  token = new ReplaySubject<string>(1);
  refresh = new ReplaySubject<boolean>(1);

  config(authHost: string, authClient: string) {
    this.authHost = authHost;
    this.authClient = authClient;
  }

  url(prompt = 'none') {
    let url = `${this.authHost}/authorize?client_id=${this.authClient}`;
    if (!url.match(/^http/)) {
      url = url.match(/\.org|\.tech/) ? `https://${url}` : `http://${url}`;
    }
    const nonce = this.getNonce();
    return `${url}&nonce=${nonce}&response_type=token&scope=apps&prompt=${prompt}`;
  }

  setToken(authToken: string) {
    if (authToken) {
      this.token.next(authToken);
    } else {
      this.token.next(null);
    }
  }

  setError(authError: any) {
    this.token.error(authError);
  }

  // refresh and wait for a new auth token
  refreshToken(): Observable<string> {
    this.refresh.next(true);
    return this.token.pipe(skip(1));
  }

  failAuthorization() {
    this.setToken(AuthService.AUTHORIZATION_DENIED);
  }

  parseToken(tokStr: string) {
    if (tokStr === AuthService.AUTHORIZATION_DENIED) { return false; }

    // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript
    let base64decoded = tokStr.replace(/-/g, '+').replace(/_/g, '/');
    const payload = base64decoded.split('.')[1];
    if (!payload) {
      throw new Error('Invalid xxxx.yyyy token string structure');
    }
    switch (payload.length % 4) {
      case 0:
        break;
      case 2:
        base64decoded += '==';
        break;
      case 3:
        base64decoded += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }
    return JSON.parse(atob(payload));
  }

  private getNonce(): string {
    const nonce: string[] = [];
    for (let i = 0; i < 8; i++) {
      nonce.push(this.randomInt(0, 15).toString(16));
    }
    return nonce.join('');
  }

  private randomInt(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }

}
