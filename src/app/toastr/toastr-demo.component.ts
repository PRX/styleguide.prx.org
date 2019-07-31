import { Component } from '@angular/core';
import { ToastrService } from 'ngx-prx-styleguide';

@Component({
  selector: 'app-toastr-demo',
  template: `
    <section class="main demo">
      <h1>Toastr</h1>
      <p>
        The Toastr Service and Component are for displaying toast notifications within the application.
        The <code>&lt;prx-toastr&gt;</code> should be included in the application at the top level of the app component
        as it is in this demo app. ToastrService is injected into components that show toasts.
      </p>
      <dl>
        <dt>module</dt><dd><code>ToastrModule</code></dd>
        <dt>selector</dt><dd><code>prx-toastr</code></dd>
        <dt>service</dt><dd><code>ToastrService</code></dd>
      </dl>
      <aside>
        <h2>Usage:</h2>
        <ul>
          <li>
            <code>info(message: string)</code> shows an info toast
          </li>
          <li>
            <code>success(message: string)</code> shows a success toast
          </li>
          <li>
            <code>error(message: string)</code> shows an error toast
          </li>
          <li>
            <code>show(options: &#123;message: string, status: string&#125;)</code> shows toast with given options
          </li>
        </ul>
        Example:
        <button (click)="info('in case you cared')">Info</button>
        <button (click)="success('you did something')">Success</button>
        <button (click)="error('you tried, but something bad happened')">Error</button>
      </aside>
    </section>
  `,
})
export class ToastrDemoComponent {
  constructor(private toastr: ToastrService) {}

  info(msg: string) {
    this.toastr.info(msg);
  }

  success(msg: string) {
    this.toastr.success(msg);
  }

  error(msg: string) {
    this.toastr.error(msg);
  }
}
