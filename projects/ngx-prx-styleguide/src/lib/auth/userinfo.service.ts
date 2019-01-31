
import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HalDoc } from '../hal/doc/haldoc';
import { HalObservable } from '../hal/doc/halobservable';
import { HalService } from '../hal/hal.service';

export class Userinfo {
  sub: number;
  name: string;
  given_name: string;
  family_name: string;
  preferred_username: string;
  apps: any;
  href: string;
}

@Injectable()
export class UserinfoService {

  authHost: string;
  userinfo: Userinfo;

  constructor(private http: HttpClient, private hal: HalService) { }

  config(authHost: string) {
    this.authHost = authHost;
  }

  getUserinfo(): Observable<Userinfo> {
    const url = `${this.authHost}/userinfo`;
    const params = new HttpParams().set('scope', 'profile+apps');
    return this.http.get(url, {params, withCredentials: true}).pipe(
                    catchError(this.handleError));
  }

  getUserDoc(userinfo: Userinfo): HalObservable<HalDoc> {
    const url = userinfo.href.match(/^(https?:\/\/.+?)(\/.+)/);
    return this.hal.public(url[1], url[2]);
  }

  private handleError(error: any): Promise<any> {
    console.error('userinfo error:', error);
    return Promise.reject(error.message || error);
  }

}
