
import {map} from 'rxjs/operators';
import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { HalDoc } from './doc/haldoc';
import { HalLink } from './doc/hallink';
import { HalObservable } from './doc/halobservable';
import { HalRemote } from './remote/halremote';

@Injectable()
export class HalService {

  private remotes: { [key: string]: HalRemote; } = {};

  constructor(private http: HttpClient, @Optional() private auth: AuthService) {}

  public(host: string, path = '/api/v1', ttl?: number): HalObservable<HalDoc> {
    return this.remoteGet(this.loadRemote(host, false, ttl), path);
  }

  authorized(host: string, path = '/api/v1', ttl?: number): HalObservable<HalDoc> {
    if (!this.auth) {
      throw new Error('Tried to load authorized HAL resource without <prx-auth>!');
    }
    return this.remoteGet(this.loadRemote(host, true, ttl), path);
  }

  private remoteGet(remote: HalRemote, path: string): HalObservable<HalDoc> {
    const link = HalLink.from(path);
    return <HalObservable<HalDoc>> remote.get(link).pipe(map(obj => new HalDoc(obj, remote)));
  }

  private loadRemote(host: string, withAuth: boolean, ttl: number): HalRemote {
    const key = withAuth ? `${host}.auth` : `${host}.public`;
    if (!this.remotes[key]) {
      this.remotes[key] = new HalRemote(host, this.http, withAuth ? this.auth : null, ttl);
    }
    return this.remotes[key];
  }

}
