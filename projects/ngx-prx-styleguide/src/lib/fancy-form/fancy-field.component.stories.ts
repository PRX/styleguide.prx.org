import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, boolean, button, array } from '@storybook/addon-knobs';
import { FancyFormModule } from './fancy-form.module';
import { BaseModel, RelatedMap } from '../model/base.model';
import { REQUIRED } from '../model/base.invalid';
import { HalDoc } from '../hal/doc/haldoc';
import { Observable, of as ofasobservableOf } from 'rxjs';

const notesIOList = `
- \`@Input() model: BaseModel\` \\- _(required)_ Model containing the named property.
- \`@Input() name: string\` \\- _(required)_ Name of model attribute, and optional explicit changed/invalid bindings.
- \`@Input() changed: string\` \\- An alternate field name can be provided for BaseModel field change checking, otherwise name is used.
- \`@Input() invalid: string\` \\- An alternate field name can be provided for BaseModel field validation, otherwise name is used.
- \`@Input() label: string\` \\- The field label presented to the user.
- \`@Input() invalidlabel: string\` \\- An alternate label can be provided for validation messages, otherwise label is used.
- \`@Input() advancedConfirm: string\` \\- A confirmation message for "advanced" fields.
- \`@Input() prompt: string\` \\- A prompt/label for a checkbox field.
- \`@Input() hideinvalid: boolean\` \\- Add attribute to not show validation errors.
- \`@Input() strict: boolean\` \\- Whether or not validation is strict; if true, will prevent saving the model if it is invalid.
- \`@Output() onChange: EventEmitter<any>\` \\- Emits new value whenever field is changed.
`

// Setup simple model for the stories.
class FieldsModel extends BaseModel {
  public fullName: string;
  public complete: boolean;
  public count: number;
  public color: string;
  public colors: string[];
  public script: string;
  public arrival: Date;
  public mustProvide: string;
  public duration: number;

  SETABLE = ['fullName', 'complete', 'count', 'color', 'colors', 'script', 'arrival', 'mustProvide', 'duration'];

  VALIDATORS = {
    mustProvide: [REQUIRED(true)]
  };

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


    for (let f of this.SETABLE) {
      this.VALIDATORS[f] = this.VALIDATORS[f] || [];
    }
  }

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

  key(): string { return 'fields-model'; };

  related(): RelatedMap { return {}; };

  saveNew(data: {}): Observable<HalDoc> { return ofasobservableOf(this.doc); };
};
const model = new FieldsModel(null, new HalDoc({
  fullName: 'John Doe',
  complete: true,
  count: 11,
  color: 'yellow',
  colors: ['red', 'yellow'],
  script: 'Visit blue apron dot com slash exciting show name to get your first three deliveries free.',
  arrival: new Date(),
  mustProvide: 'delete this text'
}, null));

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    FancyFormModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Forms Controls|Inputs/Fancy Field', module)
.addDecorator(centered)
  .add('Overview', () => ({
    template: 'See <strong>Notes</strong> tab for overview.'
  }), {
    notes: {
      markdown: `
# Fancy Fields

The Fancy Field component is used to create PRX forms fields. It supports,
text, number, checkbox, select, and textarea input types. It will also
handle formatting of labels and hints along with your projected content.
This component is intended to work with models extended from BaseModel,
but it will also create disabled form fields without a model. When working
with BaseModel, any validation errors that occur will be shown within the
fancy field.

----

__Module__ \`FancyFormModule\`

__Selector__ \`prx-fancy-field\`

----

- \`@Input() model: BaseModel\` \\- _(required)_ Model containing the named property.
- \`@Input() name: string\` \\- _(required)_ Name of model attribute, and optional explicit changed/invalid bindings.
- \`@Input() changed: string\` \\- An alternate field name can be provided for BaseModel field change checking, otherwise name is used.
- \`@Input() invalid: string\` \\- An alternate field name can be provided for BaseModel field validation, otherwise name is used.
- \`@Input() label: string\` \\- The field label presented to the user.
- \`@Input() invalidlabel: string\` \\- An alternate label can be provided for validation messages, otherwise label is used.
- \`@Input() advancedConfirm: string\` \\- A confirmation message for "advanced" fields.
- \`@Input() prompt: string\` \\- A prompt/label for a checkbox field.
- \`@Input() hideinvalid: boolean\` \\- Add attribute to not show validation errors.
- \`@Input() strict: boolean\` \\- Whether or not validation is strict; if true, will prevent saving the model if it is invalid.
- \`@Output() onChange: EventEmitter<any>\` \\- Emits new value whenever field is changed.
`
    }
  });

const makeFieldStory = ({inputType = null, propName = null, defaultLabel = null, defaultHint = null, defaultPrompt = null}) => () => {
  // For some reason, text knob encodes HTML entities. We need to decode them.
  const decodeHtml = (label: string, value: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = text(label, value);
    return txt.value;
  };
  const label = decodeHtml('Label', defaultLabel);
  const hint = decodeHtml('Hint Text', defaultHint);
  const prompt = inputType === 'checkbox' ? decodeHtml('Option Label', defaultPrompt) : null;
  const required = boolean('Required', false);
  const hideInvalid = boolean('Hide Invalid Message', false);
  const isSelect = inputType === 'select' || inputType === 'multiselect';
  const defaultSelectOptions = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];
  const selectOptions = isSelect ? array('Options', defaultSelectOptions) : null;
  let fieldTypeAttr = inputType;

  const onChange = action(`Field Value Changed for ${propName} via ${inputType}`);

  model.VALIDATORS[propName] = required ? [REQUIRED(true)] : [];

  button("Discard Changes", () => model.discard());

  if (isSelect) {
    fieldTypeAttr = `[${inputType}]="selectOptions"`;
  }

  return {
    template: `
      <div style="min-width: 50vw;">
        <prx-fancy-field
          ${fieldTypeAttr}
          [model]="model"
          [name]="propName"
          [label]="label"
          [prompt]="prompt"
          [required]="required"
          [hideinvalid]="hideInvalid || undefined"
          (onChange)="onChange($event)"
        >
          <div class="fancy-hint" *ngIf="hint">{{ hint }}</div>
        </prx-fancy-field>
      </div>
    `,
    props: {
      propName,
      model,
      label,
      hint,
      prompt,
      required,
      hideInvalid,
      selectOptions,
      onChange
    }
  };
};

storiesOf('Forms Controls|Inputs/Fancy Field', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Text Input (Knobs)',
    makeFieldStory({
      inputType: 'textinput',
      propName: 'fullName',
      defaultLabel: 'Full Name',
      defaultHint: 'Enter your full name as you like it to be displayed.'
    }),
    {
      notes: {
        markdown:`
# Text Input

The most basic of fields is a text input. Use the \`textinput\` property to set input \`[type="text"]\`.

----

__Module__ \`FancyFormModule\`

__Selector__ \`prx-fancy-field\`

__Property__ \`textinput\`

----

\`\`\`html
<prx-fancy-field textinput [model]="model" name="fullName" label="Full Name">
  <div class="fancy-hint">Enter your full name as you like it to be displayed.</div>
</prx-fancy-field>
\`\`\`
`
      }
    }
  )
  .add(
    'Number Imput (Knobs)',
    makeFieldStory({
      inputType: 'number',
      propName: 'count',
      defaultLabel: 'How many?',
      defaultHint: 'Give us your best guess.'
    }),
    {
      notes: {
        markdown:`
# Number Input

Use the \`number\` property to set input \`[type="number"]\`.

----

__Module__ \`FancyFormModule\`

__Selector__ \`prx-fancy-field\`

__Property__ \`number\`

----

\`\`\`html
<prx-fancy-field number [model]="model" name="count" label="How many?">
  <div class="fancy-hint">Give us your best guess.</div>
</prx-fancy-field>
\`\`\`
`
      }
    }
  )
  .add(
    'Checkbox (Knobs)',
    makeFieldStory({
      inputType: 'checkbox',
      propName: 'complete',
      defaultLabel: 'Something Something Darkside',
      defaultHint: 'Something something something...',
      defaultPrompt: 'Complete!'
    }),
    {
      notes: {
        markdown:`
# Number Input

Use the \`number\` property to set input \`[type="number"]\`.

----

__Module__ \`FancyFormModule\`

__Selector__ \`prx-fancy-field\`

__Property__ \`number\`

----

\`\`\`html
<prx-fancy-field number [model]="model" name="count" label="How many?">
  <div class="fancy-hint">Give us your best guess.</div>
</prx-fancy-field>
\`\`\`
`
      }
    }
  )
  .add(
    'Select (Knobs)',
    makeFieldStory({
      inputType: 'select',
      propName: 'color',
      defaultLabel: 'Favorite color',
      defaultHint: 'It doesn\'t have to be your absolute favorite, but you can only pick one.'
    }),
    {
      notes: {
        markdown:`
# Select Input

Use the \`select\` property to get a select dropdown.

----

__Module__ \`FancyFormModule\`

__Selector__ \`prx-fancy-field\`

__Property__ \`[select]="options: string[] | string[][]"\`

----

\`\`\`javascript
/*
  Options can be an array of string values.
*/
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];

/*
  To provide display labels that differ from the values, make each item a two item array.
  First item is the label. Second item is the value.
*/
const colorsByStatus = [['Success', 'green'], ['Warning', 'orange'], ['Info', 'blue']];
\`\`\`

\`\`\`html
<prx-fancy-field [select]="colors" [model]="model" name="color" label="Favorite color">
  <div class="fancy-hint">It doesn't have to be your absolute favorite, but you can only pick one.</div>
</prx-fancy-field>
\`\`\`
`
      }
    }
  );

