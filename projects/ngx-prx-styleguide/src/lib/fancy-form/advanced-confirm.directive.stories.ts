import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { FancyFormModule } from './fancy-form.module';
import { BaseModel, RelatedMap } from '../model/base.model';
import { HalDoc } from '../hal/doc/haldoc';
import { Observable, of as ofasobservableOf } from 'rxjs';
import { ModalService } from '../modal/modal.service';

// Setup simple model for the stories.
class ConfirmModel extends BaseModel {
  public foo: string;

  constructor(parent: HalDoc, demo?: HalDoc, loadRelated = true) {
    super();
    this.init(parent, demo, loadRelated);
  }

  SETABLE = ['foo'];

  encode(): {} { return {}; };
  decode(): void {
    this.foo = this.doc['foo'];
  };
  key(): string { return 'confirm-model'; };
  related(): RelatedMap { return {}; };
  saveNew(data: {}): Observable<HalDoc> { return ofasobservableOf(this.doc); };
};
const model = new ConfirmModel(null, new HalDoc({
  foo: 'bar'
}, null));

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    FancyFormModule
  ],
  schemas: [],
  declarations: [],
  providers: [ModalService],
});

storiesOf('Forms Controls|Directives/Advanced Confirm', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      // For some reason, text knob encodes HTML entities. We need to decode them.
      const decodeHtml = (label: string, value: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = text(label, value);
        return txt.value;
      };
      const confirmMessage = decodeHtml('Confirmation Message', 'That\'s a risky move');
      const onChange = action('Value changed');

      return {
        template: `
          <div>
            <input
              [prxAdvancedConfirm]="confirmMessage"
              [prxModel]="model"
              prxName="foo"
              (ngModelChange)="model.set('foo', $event)"
              [ngModel]="model.foo"
              (change)="onChange($event.target.value)"
            >
          </div>
        `,
        props: {
          model,
          confirmMessage,
          onChange
        }
      }
    },
    {
      notes: {
        markdown:`
# Advanced Confirm

Advanced Confirm is a directive that is designed to work with BaseModel and
FancyField to ask the user to confirm changes to "advanced" fields. If the user
does not confirm the change, the field should be reverted back to the previous
value. Advanced fields are those that may potentially cause issues or unexpected
behavior that once set should only be changed for specific reasons that we need
to ensure the user is aware of.

----

__Module__ \`FancyFormModule\`

__Selector__ \`[prxAdvancedConfirm]\`

----

- \`@Input() prxAdvancedConfirm: string\` \\- Confirmation message.
- \`@Input() prxModel: BaseModel\` \\- Model. Model should be not new for confirmation.
- \`@Input() prxName: string\` \\- Name of field. Field should be changed and not invalid for confirmation.
- \`@Input() prxEvent: string = 'blur'\` \\- Event name to check value for changes. Only 'blur' or 'change' events supported. Use 'change' on \`<select>\` elements.
`
      }
    }
  );

