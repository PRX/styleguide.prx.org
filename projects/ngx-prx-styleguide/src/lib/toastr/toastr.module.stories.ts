import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { ToastrModule } from './toastr.module';
import { Component, Input } from '@angular/core';
import { ToastrService } from './toastr.service';

// Need a component to inject ToastrService into.
@Component ({
  selector:'toastr-button',
  template: `
    <button (click)="onClick($event)"><ng-content></ng-content></button>
  `
})
class ToasterButtonComponent {

  @Input() status: string;
  @Input() message: string;

  constructor(private toastr: ToastrService) {}

  onClick() {
    this.toastr.show({
      message: this.message,
      status: this.status
    });
  }

}

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    ToastrModule
  ],
  schemas: [],
  declarations: [ToasterButtonComponent],
  providers: [],
});

storiesOf('Services|Toastr', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const statuses = ['info', 'error', 'success'];
      const status = select('Status', statuses, null);
      const message = text('Message', 'May the force be with you.');

      return {
        template: `
          <prx-toastr></prx-toastr>
          <toastr-button
            [status]="status"
            [message]="message"
          >Make A Toast</toastr-button>
        `,
        props: {
          message,
          status
        }
      }
    },
    {
      notes: {
        markdown:`
# Toastr

The Toastr Service and Component are for displaying toast notifications within
the application. The \`<prx-toastr>\` should be included in the application at
the top level of the app component as it is in this demo app. ToastrService is
injected into components that show toasts.

----

__Module__ \`ToastrModule\`

__Selector__ \`prx-toastr\`

__Service__ \`ToastrService\`

----

## ToastrService Methods

- \`info(message: string)\` \\- Shows an info toast.
- \`success(message: string)\` \\- Shows an success toast.
- \`error(message: string)\` \\- Shows an error toast.
- \`show(options: {message: string, status: string})\` \\- Shows toast with given options.

----

## ToastrService Usage

\`\`\`javascript
@Component ({
  selector:'toastr-button',
  template: \`
    <button (click)="onClick($event)"><ng-content></ng-content></button>
  \`
})
class ToasterButtonComponent {

  @Input() status: string;
  @Input() message: string;

  constructor(private toastr: ToastrService) {}

  onClick() {
    this.toastr.show({
      message: this.message,
      status: this.status
    });
  }

}
\`\`\`

\`\`\`html
<prx-toastr></prx-toastr>
<toastr-button
  [status]="status"
  [message]="message"
>Make A Toast</toastr-button>
\`\`\`
`
      }
    }
  );
