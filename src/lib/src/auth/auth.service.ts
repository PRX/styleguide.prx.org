import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/skip';

@Injectable()
export class AuthService {

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
    let nonce = this.getNonce();
    return `${url}&nonce=${nonce}&response_type=token&prompt=${prompt}`;
  }

  setToken(authToken: string) {
    if (authToken) {
      this.token.next(authToken);
    } else {
      this.token.next(null);
    }
  }

  // refresh and wait for a new auth token
  refreshToken(): Observable<string> {
    this.refresh.next(true);
    return this.token.skip(1);
  }

  private getNonce(): string {
    let nonce: string[] = [];
    for (let i = 0; i < 8; i++) {
      nonce.push(this.randomInt(0, 15).toString(16));
    }
    return nonce.join('');
  }

  private randomInt(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }

}
