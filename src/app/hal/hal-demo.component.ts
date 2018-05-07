import { Component } from '@angular/core';
import { HalService, HalObservable, HalDoc } from 'ngx-prx-styleguide';
import { Env } from '../core.env';

@Component({
  selector: 'hal-demo',
  styles: [`
    pre {
      overflow: scroll;
      width: 600px;
      height: 300px;
      background: #fff;
      border: 1px solid #ccc;
      padding: 10px 20px;
    }
    pre.error {
      border-color: #f00;
    }
  `],
  template: `
    <section class="main demo">
      <h1>HalModule</h1>
      <section>
        <h2>Setup:</h2>
        <ul>
          <li>
            Generally, instead of using the HalService directly, you'll want to
            declare your own service extending the abstract HalBaseService. This
            gives you a standard config/helper setup to build on. Just implement
            the <code>host()</code>, <code>path()</code> and <code>ttl()</code>
            getters.
          </li>
          <li>
            To make authorized requests, you just need to have the
            <code>prx-auth</code> component setup somewhere in your app, and the
            HalService will automagically find it.
          </li>
        </ul>
      </section>
      <section>
        <h2>Usage:</h2>
        <ul>
          <li>
            Get yourself the root HalDoc for your api host, via your
            <code>myHalService.root</code> observable.
          </li>
          <li>
            Navigate the API via the 3 HalObservable methods: follow, followList,
            and followItems.
          </li>
          <li>
            Chain observables: <code>cms.root.follow('prx:story', {{ '{' }}id: 123}))</code>
          </li>
        </ul>
      </section>
      <section>
        <h2>HalService Demo:</h2>
        <prx-auth *ngIf="loadAuth" [host]="authHost" [client]="authClient">
        </prx-auth>
        <button (click)="loadCms()">CMS Root</button>
        <button (click)="loadCmsStory()">Follow CMS Story</button>
        <button (click)="loadAuthStory()">Follow Authorized CMS Story</button>
        <pre [class.error]="error">{{code}}</pre>
      </section>
    </section>
  `,
})
export class HalDemoComponent {

  cmsHost = Env.CMS_HOST;
  code = '';
  error = false;
  loadAuth = false;
  authHost = Env.AUTH_HOST;
  authClient = Env.AUTH_CLIENT_ID;

  constructor(private hal: HalService) {}

  loadCms() {
    this.show(this.hal.public(this.cmsHost));
  }

  loadCmsStory() {
    this.show(this.hal.public(this.cmsHost).follow('prx:story', {id: 187931}));
  }

  loadAuthStory() {
    this.loadAuth = true;
    this.show(this.hal.authorized(this.cmsHost).follow('prx:story', {id: 187931}));
  }

  show(obs: HalObservable<HalDoc>) {
    this.code = 'loading...';
    this.error = false;
    obs.subscribe(
      (doc: any) => this.code = doc.toJSON(true),
      (err: any) => {
        this.code = err;
        this.error = true;
      }
    );
  }

}
