import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptionsArgs, RequestOptions } from '@angular/http';
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

  constructor(private http: Http, private hal: HalService) { }

  config(authHost: string) {
    this.authHost = authHost;
  }

  getUserinfo(): Observable<Userinfo> {
    let url = `${this.authHost}/userinfo?scope=profile+apps`;
    let optionsArgs:RequestOptionsArgs = { withCredentials: true };
    let options = new RequestOptions(optionsArgs);
    return this.http.get(url, options)
                    .map(response => response.json() as Userinfo)
                    .catch(this.handleError);
  }

  getUserDoc(userinfo: Userinfo): HalObservable<HalDoc> {
    let url = userinfo.href.match(/^(https?:\/\/.+?)(\/.+)/);
    return this.hal.public(url[1], url[2]);
  }

  private handleError(error: any): Promise<any> {
    console.error('userinfo error:', error);
    return Promise.reject(error.message || error);
  }

}
