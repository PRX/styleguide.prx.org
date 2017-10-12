import { Component } from '@angular/core';
import { OverlaySpinnerService } from 'ngx-prx-styleguide';

@Component({
  moduleId: module.id,
  selector: 'overlay-spinner-demo',
  template: `
    <section class="main demo">
      <h1>Overlay Spinner</h1>
      <p>
        The Overlay Spinner shows a loading indicator over the entire application and disables the application behind it.
        The <code>&lt;prx-overlay-spinner&gt;</code> should be included in the application at the top level of the app
        component as it is in this demo app.
        <code>OverlaySpinnerService</code> is injected into components that show and hide an overlay spinner.
      </p>
      <dl>
        <dt>module</dt><dd><code>SpinnerModule</code></dd>
        <dt>selector</dt><dd><code>prx-overlay-spinner</code></dd>
        <dt>service</dt><dd><code>OverlaySpinnerService</code></dd>
      </dl>
      <aside>
        Usage:
        <p>Place the Overlay Spinner in the top level app component.</p>
        <pre class="code">
          &lt;prx-overlay-spinner&gt;&lt;/prx-overlay-spinner&gt;
        </pre>
        <p>Inject the <code>OverlaySpinnerService</code> into the component that will show and hide the overlay spinner.</p>
        <pre class="code">
          constructor(private overlay: OverlaySpinnerService)
        </pre>
        <p>Call show and hide on the overlay.</p>
        <pre class="code">
          this.overlay.show()
          this.overlay.hide()
        </pre>
        Example:
        <p>
          <button (click)="showOverlaySpinner()">Show Overlay Spinner</button>
        </p>
        <p>
          <button (click)="increment()">Click me</button>
          <span *ngIf="clickedTimes">Clicked: {{clickedTimes}} times</span>
        </p>
      </aside>
    </section>
  `
})

export class OverlaySpinnerDemoComponent {
  clickedTimes = 0;

  constructor(private overlay: OverlaySpinnerService) {}

  showOverlaySpinner() {
    this.overlay.show();
    setTimeout(() => {
      this.overlay.hide();
    }, 3000);
  }

  increment() {
    this.clickedTimes++;
  }
}
