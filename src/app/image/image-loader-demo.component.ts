import { Component } from '@angular/core';
import { MockHalDoc } from 'ngx-prx-styleguide';

@Component({
  selector: 'app-image-loader-demo',
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
        Usage:
        <pre class="code">
          &lt;prx-image [src]="pickSrc" [imageDoc]="pickDoc"&gt;&lt;/prx-image&gt;
        </pre>
        Example:
        <br/>
        <prx-image [src]="pickSrc" [imageDoc]="pickDoc"></prx-image>
        <p class="form-group">
          <label>Pick a Src</label>
          <select [(ngModel)]="pickSrc">
            <option value="">None</option>
            <option value="http://placebear.com/g/1000/1000">Actual URL</option>
            <option value="http://fake.url/doesnotexist.png">Bad URL</option>
          </select>
        </p>
        <p class="form-group">
          <label>Pick an Image Doc</label>
          <select [ngModel]="whichDoc" (ngModelChange)="setDoc($event)">
            <option value="">None</option>
            <option value="good">Doc with image</option>
            <option value="medium">Doc without image</option>
            <option value="bad">Doc with error</option>
          </select>
        </p>
      </aside>
    </section>
  `,
  styleUrls: ['./image-loader-demo.component.css']
})

export class ImageLoaderDemoComponent {

  pickSrc = '';
  whichDoc = '';
  pickDoc: MockHalDoc;

  setDoc(which: string) {
    if (which === 'good') {
      this.pickDoc = new MockHalDoc({});
      this.pickDoc.mock('prx:image', {_links: {enclosure: {href: 'http://placebear.com/1000/1000'}}});
    } else if (which === 'medium') {
      this.pickDoc = new MockHalDoc({});
    } else if (which === 'bad') {
      this.pickDoc = new MockHalDoc({});
      this.pickDoc.mockError('prx:image', 'something went horribly wrong');
      this.pickDoc.has = () => true; // TODO: mockError not showing in has()
    } else {
      this.pickDoc = null;
    }
  }
}
