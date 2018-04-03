import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptionsArgs, RequestOptions } from '@angular/http';

export class Userinfo {
  sub: number;
  name: string;
  given_name: string;
  family_name: string;
  preferred_username: string;
  apps: any;
}

@Injectable()
export class UserinfoService {

  authHost: string;

  constructor(private http: Http) { }

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

  private handleError(error: any): Promise<any> {
    console.error('userinfo error:', error);
    return Promise.reject(error.message || error);
  }

}
