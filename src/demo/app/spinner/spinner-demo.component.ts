import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'spinner-demo',
  template: `
    <section class="main demo">
      <h1>Spinner</h1>
      <p>
        The Spinner Component shows a loading indicator. Typically the spinner is displayed with <code>*ngIf</code> until
        a resource has finished loading.
      </p>
      <p>
        The animation uses <code>position: absolute</code>, so it should be inside a <code>position: relative</code> container. 
      </p>
      <dl>
        <dt>module</dt><dd><code>SpinnerModule</code></dd>
        <dt>selector</dt><dd><code>prx-spinner</code></dd>
      </dl>
      <ul>
        <li><code>@Input() set spinning(value: boolean)</code> - toggles the animation</li>
        <li><code>@Input() delay: number</code> - defaults to 300 seconds</li>
        <li><code>@Input() inverse: boolean</code> - defaults to false but when true will show a grey background color</li>
        <li><code>@Input() overlay: boolean</code>
          - defaults to false but when true will show the spinner with an absolutely positioned overlay behind</li>
        <li><code>@Input() overlayFixed: boolean</code> - defaults to false but when true will show the overlay with fixed positioning</li>
        <li><code>@Input() loadingMessage: string</code> - if provided, will show loading message above spinner</li>
      </ul>
      <aside>
        Usage:
        <pre class="code">
          &lt;prx-spinner *ngIf="loading" loadingMessage="Please wait..."&gt;&lt;/prx-spinner&gt;
          &lt;prx-spinner delay="2000"&gt;&lt;/prx-spinner&gt;
          &lt;prx-spinner inverse="true"&gt;&lt;/prx-spinner&gt;
        </pre>
        Example:
        <div class="container fixed-size blue"><prx-spinner loadingMessage="Please wait..."></prx-spinner></div>
        <div class="container fixed-size blue"><prx-spinner delay="2000"></prx-spinner></div>
        <div class="container fixed-size"><prx-spinner inverse="true"></prx-spinner></div>
      </aside>
      <aside class="container">
        Usage:
        <pre class="code">
          &lt;prx-spinner *ngIf="loading" overlay="true" loadingMessage="Please wait..."&gt;&lt;/prx-spinner&gt;
        </pre>
        Example:
        <prx-spinner *ngIf="showOverlay" overlay="true" loadingMessage="Please wait..."></prx-spinner>
        <p>
          <button (click)="showOverlaySpinner()">Show Overlay Spinner</button>
        </p>
        <p>
          <button (click)="increment()">Click me</button>
          <span *ngIf="clickedTimes">Clicked: {{clickedTimes}} times</span>
        </p>
      </aside>
      <aside>
        Usage:
        <pre class="code">
          &lt;prx-spinner *ngIf="loading" overlay="true" overlayFixed="true" loadingMessage="Please wait..."&gt;&lt;/prx-spinner&gt;
        </pre>
        Example:
        <p>
          <prx-spinner *ngIf="showFixedOverlay" overlay="true" overlayFixed="true" loadingMessage="Please wait..."></prx-spinner>
        </p>
        <button (click)="showFixedOverlaySpinner()">Show Fixed Overlay Spinner</button>
      </aside>
    </section>
  `,
  styleUrls: ['spinner-demo.component.css']
})

export class SpinnerDemoComponent {
  clickedTimes = 0;
  showFixedOverlay = false;
  showOverlay = false;

  showOverlaySpinner() {
    this.showOverlay = true;
    setTimeout(() => this.showOverlay = false, 3000);
  }

  showFixedOverlaySpinner() {
    this.showFixedOverlay = true;
    setTimeout(() => this.showFixedOverlay = false, 3000);
  }

  increment() {
    this.clickedTimes++;
  }
}
