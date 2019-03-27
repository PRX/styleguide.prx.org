import { Component } from '@angular/core';

@Component({
  selector: 'sb-root',
  template: `
    <h1>You don't have to run this app.</h1>
    <p>This is a place holder application for Storbook to use as a base to initialize.</p>
    <p>Use this apps <code>styles.css</code> to load third-party css into the content iframe of Storybook.</p>
  `,
  styles: []
})
export class AppComponent {
  title = 'ngx-prx-styleguide-storybook';
}
