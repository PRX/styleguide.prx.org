import { Component } from '@angular/core';
import { HalService, HalObservable, HalDoc } from 'ngx-prx-styleguide';

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
    <h1>HalModule</h1>
    <section>
      <h2>HalService Usage:</h2>
    </section>
    <section>
      <h2>HalService Demo:</h2>
      <button (click)="loadCms()">CMS Root</button>
      <button (click)="loadCmsStory()">Follow CMS Story</button>
      <pre [class.error]="error">{{code}}</pre>
    </section>
  `,
})
export class HalDemoComponent {

  cmsHost = 'cms-staging.prx.tech';
  code = '';
  error = false;

  constructor(private hal: HalService) {
    // hal.public(this.cmsHost, '/api/v1/stories/187931').subscribe((doc: any) => {
    //   this.code = doc.toJSON(true);
    // });
  }

  loadCms() {
    this.show(this.hal.public(this.cmsHost));
  }

  loadCmsStory() {
    this.show(this.hal.public(this.cmsHost).follow('prx:story', {id: 187931}));
  }

  show(obs: HalObservable<HalDoc>) {
    this.code = 'loading...';
    this.error = false;
    obs.subscribe(
      doc => this.code = doc.toJSON(true),
      err => {
        this.code = err;
        this.error = true;
      }
    );
  }

}
