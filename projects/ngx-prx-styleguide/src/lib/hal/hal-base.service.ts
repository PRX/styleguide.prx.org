
import {mergeMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HalDoc } from './doc/haldoc';
import { HalObservable } from './doc/halobservable';
import { HalService } from './hal.service';

@Injectable()
export abstract class HalBaseService {

    constructor(private hal: HalService) {
      const preloadRootDoc = this.root;
    }

    abstract get host(): string;
    abstract get path(): string;
    abstract get ttl(): number;

    get root(): HalObservable<HalDoc> {
      return this.hal.authorized(this.host, this.path, this.ttl);
    }

    follow(rel: string, params: {} = null): HalObservable<HalDoc> {
      return <HalObservable<HalDoc>> this.root.pipe(mergeMap((rootDoc) => {
        return rootDoc.follow(rel, params);
      }));
    }

    followList(rel: string, params: {} = null): HalObservable<HalDoc[]> {
      return <HalObservable<HalDoc[]>> this.root.pipe(mergeMap((rootDoc) => {
        return rootDoc.followList(rel, params);
      }));
    }

    followItems(rel: string, params: {} = null): HalObservable<HalDoc[]> {
      return <HalObservable<HalDoc[]>> this.root.pipe(mergeMap((rootDoc) => {
        return rootDoc.followItems(rel, params);
      }));
    }

  }
