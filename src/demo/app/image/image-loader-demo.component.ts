import {Component} from '@angular/core';
import { HalService, HalDoc } from 'ngx-prx-styleguide';

@Component({
  moduleId: module.id,
  selector: 'image-loader-demo',
  template: `
    <section class="main demo">
      <h1>ImageLoader</h1>
      <p>
        The Image Loader Component loads an image from a url or a haldoc.
      </p>
      <p>
        Because it uses <code>background-image</code> for display, the <code>prx-image</code> element should be given a width 
        and a height. It defaults to <code>display: inline-block</code> but can be overridden to <code>display: block</code>.
      </p>
      <p>
        If <code>src</code> is not given and <code>imageDoc</code> has no <code>prx-image</code>, a placeholder image is shown.
        If an error occurs loading <code>src</code> or the <code>prx-image</code>, a placeholder error image is shown.
      </p>
      <dl>
        <dt>module</dt><dd><code>ImageModule</code></dd>
        <dt>selector</dt><dd><code>prx-image</code></dd>
      </dl>
      <ul>
        <li><code>@Input() src: string</code> - loads image from url</li>
        <li><code>@Input() imageDoc: HalDoc</code> - load image from a HalDoc containing a <code>prx-image</code></li>
      </ul>
      <aside>
        Usage <code>src</code>:
        <pre class="code">
          &lt;prx-image src="http://fake.url/doesnotexist.png"&gt;&lt;/prx-image&gt;
        </pre>
        Example:
        <prx-image src="http://fake.url/doesnotexist.png"></prx-image>
      </aside>
      <aside>
        Usage <code>imageDoc</code>:
        <pre class="code">
          &lt;prx-image [imageDoc]="storyDoc"&gt;&lt;/prx-image&gt;
        </pre>
        Example:
        <prx-image *ngIf="storyDoc" [imageDoc]="storyDoc"></prx-image>
      </aside>
    </section>
  `,
  styleUrls: ['./image-loader-demo.component.css']
})

export class ImageLoaderDemoComponent {
  cmsHost = 'cms-staging.prx.tech';
  storyDoc: HalDoc;

  constructor(private hal: HalService) {
    this.loadCmsStory();
  }

  loadCmsStory() {
    this.hal.public(this.cmsHost).follow('prx:story', {id: 187931}).subscribe(doc => this.storyDoc = doc);
  }
}
