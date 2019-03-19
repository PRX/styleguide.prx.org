import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { FancyFormModule } from './fancy-form.module';
import { BaseModel, RelatedMap } from '../model/base.model';
import { HalDoc } from '../hal/doc/haldoc';
import { Observable, of as ofasobservableOf } from 'rxjs';
import { ModalModule } from '../modal/modal.module';
import { ModalService } from '../modal/modal.service';

// Setup simple model for the stories.
class DurationModel extends BaseModel {
  public duration: number;

  constructor(parent: HalDoc, doc?: HalDoc, loadRelated = true) {
    super();

    // Merge default data with localstore data.
    let data: any = doc && doc.asJSON() || {};
    if (this.isStored()) {
      this.restore();
      data = {
        ...data,
        ...this.encode()
      };
    }

    // Init with merged data.
    this.init(parent, new HalDoc(data, null), loadRelated);

    // Override doc with default docs so discard reverts to default values,
    // even after a page reload.
    this.doc = doc;
  }

  SETABLE = ['duration'];

  encode(): {} {
    let data: any = {};
    for (let f of this.SETABLE) {
      data[f] = this[f];
    }
    return data;
  };

  decode(): void {
    for (let f of this.SETABLE) {
      this[f] = this.doc[f];
    }
  };

  key(): string { return 'duration-model'; };
  related(): RelatedMap { return {}; };
  saveNew(data: {}): Observable<HalDoc> { return ofasobservableOf(this.doc); };
};
const model = new DurationModel(null, new HalDoc({
  duration: 0
}, null));

// Module metadata for stories.
const componentMetaData = moduleMetadata({
  imports: [
    FancyFormModule,
    ModalModule
  ],
  schemas: [],
  declarations: [],
  providers: [ModalService],
});

storiesOf('Forms Controls|Inputs/Fancy Duration', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(componentMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      // For some reason, text knob encodes HTML entities. We need to decode them.
      const decodeHtml = (label: string, value: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = text(label, value);
        return txt.value;
      };
      const label = decodeHtml('Label', 'Duration');
      const tiny = boolean('Tiny', false);
      const advancedConfirm = decodeHtml('Advanced Confirm Message', '');

      return {
        template: `
          <prx-fancy-duration [model]="model" name="duration" [label]="label" [tiny]="tiny" [advancedConfirm]="advancedConfirm"></prx-fancy-duration>
        `,
        props: {
          model,
          label,
          tiny,
          advancedConfirm
        }
      }
    },
    {
      notes: {
        markdown:`
# Fancy Duration

The Fancy Duration component is used to create forms fields for audio duration.
If a field is entered out of range for seconds or minutes, the time will auto
adjust accordingly.

----

__Module__ \`FancyFormModule\`

__Selector__ \`prx-fancy-duration\`

----

- \`@Input() model: BaseModel\` \\- _(required with any type)_ Model containing the named property. Not providing a model along with any field type property will disable the field.
- \`@Input() name: string\` \\- _(required with model)_ Name of model attribute, and optional explicit changed/invalid bindings.
- \`@Input() label: string\` \\- The field label presented to the user.
- \`@Input() tiny: boolean\` \\- Show a more condensed presentation.
- \`@Input() advancedConfirm: string\` \\- A confirmation message for "advanced" fields.

----

### Usage
\`\`\`html
<prx-fancy-duration [model]="model" name="duration" label="Duration"></prx-fancy-duration>
\`\`\`
`
      }
    }
  );
