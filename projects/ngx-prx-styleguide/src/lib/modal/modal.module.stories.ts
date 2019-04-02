import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, select, number } from '@storybook/addon-knobs';
import { Component, Input } from '@angular/core';
import { ModalModule } from './modal.module';
import { ModalService } from './modal.service';

// Need a component to inject ToastrService into.
@Component ({
  selector:'modal-button',
  template: `
    <button (click)="onClick($event)"><ng-content></ng-content></button>
  `
})
class ModalButtonComponent {

  @Input() title: string;
  @Input() body: string;
  @Input() primaryButtonLabel: string;
  @Input() secondaryButtonLabel: string;
  @Input() width: number;
  @Input() height: number;

  constructor(private modal: ModalService) {}

  onClick() {
    this.modal.show({
      title: this.title,
      body: this.body,
      primaryButton: this.primaryButtonLabel,
      secondaryButton: this.secondaryButtonLabel,
      width: this.width,
      height: this.height
    });
  }

}

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    ModalModule
  ],
  schemas: [],
  declarations: [ModalButtonComponent],
  providers: [],
});

storiesOf('Services|Modal', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const title = text('Title', 'Hello');
      const body = text('Body', 'Are you the one I am looking for?');
      const primaryButtonLabel = text('Primary Button Label', undefined);
      const secondaryButtonLabel = text('Secondary Button Label', undefined);
      const width = number('Modal Width', undefined);
      const height = number('Modal Height', undefined);

      return {
        template: `
          <prx-modal></prx-modal>
          <modal-button
            [title]="title"
            [body]="body"
            [primaryButtonLabel]="primaryButtonLabel"
            [secondaryButtonLabel]="secondaryButtonLabel"
            [width]="width"
            [height]="height"
          >Show Modal</modal-button>
        `,
        props: {
          title,
          body,
          primaryButtonLabel,
          secondaryButtonLabel,
          width,
          height
        }
      }
    },
    {
      notes: {
        markdown:`
# Modal

The Modal Service and Component are for displaying modals within the
application. The \`<prx-modal>\` should be included in the application at the top
level of the app component as it is in this demo app. ModalService is injected
into components that show modals.

----

__Module__ \`ToastrModule\`

__Selector__ \`prx-toastr\`

__Service__ \`ToastrService\`

----

## ModalService Methods

- \`alert(title: string, body?: string, callback?: Function)\` \\- Opens an alert modal and if provided, calls the callback function when the user clicks the primary button.
- \`confirm(title: string, message: string, callback: Function, primaryButtonLabel = 'Okay', secondaryButtonLabel = 'Cancel')\` \\- Opens a confirmation modal and calls the callback function with true or false depending if the user clicked the primary or the secondary button.
- \`show(options: ModalState)\` \\- Opens a modal with the given ModalState.
- \`hide()\` \\- Closes modal if open.

----

## ToastrService Usage

\`\`\`javascript
@Component ({
  selector:'modal-button',
  template: \`
    <button (click)="onClick($event)"><ng-content></ng-content></button>
  \`
})
class ModalButtonComponent {

  @Input() title: string;
  @Input() body: string;
  @Input() primaryButtonLabel: string;
  @Input() secondaryButtonLabel: string;
  @Input() width: number;
  @Input() height: number;

  constructor(private modal: ModalService) {}

  onClick() {
    this.modal.show({
      title: this.title,
      body: this.body,
      primaryButton: this.primaryButtonLabel,
      secondaryButton: this.secondaryButtonLabel,
      width: this.width,
      height: this.height
    });
  }

}
\`\`\`

\`\`\`html
<prx-modal></prx-modal>
<modal-button
  [title]="title"
  [body]="body"
  [primaryButtonLabel]="primaryButtonLabel"
  [secondaryButtonLabel]="secondaryButtonLabel"
  [width]="width"
  [height]="height"
>Show Modal</modal-button>
\`\`\`
`
      }
    }
  );
