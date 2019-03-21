import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { FancyFormModule } from './fancy-form.module';
import { BaseModel, RelatedMap } from '../model/base.model';
import { HalDoc } from '../hal/doc/haldoc';
import { Observable, of as ofasobservableOf } from 'rxjs';

// Setup simple model for the stories.
class SimpleModel extends BaseModel {
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
  key(): string { return 'simple-model'; };
  related(): RelatedMap { return {}; };
  saveNew(data: {}): Observable<HalDoc> { return ofasobservableOf(this.doc); };
};
const model = new SimpleModel(null, new HalDoc({
  foo: 'bar'
}, null));

// Force model change so examples using model will be visible. T_T
model.set('foo', 'baz');

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    FancyFormModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Forms Controls|Inputs/Fancy Button', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const btnText = text('Text', 'Click');
      const colorOptions = {
        Default: null,
        Orange: 'orange',
        Plain: 'plain',
        Red: 'red',
        Green: 'green'
      };
      const colorSelect = select('Color', colorOptions, null);
      const isColorSelected = (c: string) => c === colorSelect;
      const visible = boolean('Visible', true);
      const working = boolean('Working', false);
      const disabled = boolean('Diabled', false);
      const onClick = action('Button Clicked');

      return {
        template: `
          <prx-button
            [orange]="isColorSelected('orange')"
            [plain]="isColorSelected('plain')"
            [red]="isColorSelected('red')"
            [green]="isColorSelected('green')"
            [visible]="visible"
            [working]="working"
            [disabled]="disabled"
            (click)="onClick($event)"
          >{{ btnText }}</prx-button>
        `,
        props: {
          btnText,
          isColorSelected,
          visible,
          working,
          disabled,
          onClick
        }
      }
    },
    {
      notes: {
        markdown:`
# Fancy Button

The Button Component is a button used with PRX Models in Fancy Forms.

----

__Module__ \`FancyFormModule\`

__Selector__ \`prx-button\`

----

- \`@Input() model: BaseModel\` \\- Model for checking isSaving, invalid, or changed states.
- \`@Input() orange: boolean\` \\- Flag for orange button style. Defaults to \`false\`.
- \`@Input() plain: boolean\` \\- Flag for plain button style. Defaults to \`false\`.
- \`@Input() red: boolean\` \\- Flag for red button style. Defaults to \`false\`.
- \`@Input() green: boolean\` \\- Flag for green button style. Defaults to \`false\`.
- \`@Input() working: boolean\` \\- Override to show spinner.
- \`@Input() disabled: boolean\` \\- Override to appear disabled.
- \`@Input() visible: boolean\` \\- Override to control visibility.
`
      }
    }
  );


storiesOf('Forms Controls|Inputs/Fancy Button/Examples', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Orange Button',
    () => ({
      template: `
        <prx-button [model]="model" orange=1 disabled=0 >Publish</prx-button>
      `,
      props: {
        model
      }
    }),
    {
      notes: {
        markdown: `
### Usage
\`\`\`html
<prx-button [model]="model" orange=1 disabled=0 >Publish</prx-button>
\`\`\`
        `
      }
    }
  )
  .add(
    'Plain Button',
    () => ({
      template: `
        <prx-button [model]="model" plain=1 disabled=0 >Discard</prx-button>
      `,
      props: {
        model
      }
    }),
    {
      notes: {
        markdown: `
### Usage
\`\`\`html
<prx-button [model]="model" plain=1 disabled=0 >Discard</prx-button>
\`\`\`
        `
      }
    }
  )
  .add(
    'Red Button',
    () => ({
      template: `
        <prx-button [model]="model" red=1 disabled=0 >Delete</prx-button>
      `,
      props: {
        model
      }
    }),
    {
      notes: {
        markdown: `
### Usage
\`\`\`html
<prx-button [model]="model" red=1 disabled=0 >Delete</prx-button>
\`\`\`
        `
      }
    }
  )
  .add(
    'Green Button',
    () => ({
      template: `
        <prx-button [model]="model" green=1 disabled=0 >Create</prx-button>
      `,
      props: {
        model
      }
    }),
    {
      notes: {
        markdown: `
### Usage
\`\`\`html
<prx-button [model]="model" green=1 disabled=0 >Create</prx-button>
\`\`\`
        `
      }
    }
  )
  .add(
    'Working State',
    () => ({
      template: `
        <prx-button [model]="model" working=1 disabled=0 >Create</prx-button>
      `,
      props: {
        model
      }
    }),
    {
      notes: {
        markdown: `
### Usage
\`\`\`html
<prx-button [model]="model" working=1 disabled=0 >Create</prx-button>
\`\`\`
        `
      }
    }
  )
  .add(
    'Disabled State',
    () => ({
      template: `
        <prx-button [model]="model" disabled=1 >Saved</prx-button>
      `,
      props: {
        model
      }
    }),
    {
      notes: {
        markdown: `
### Usage
\`\`\`html
<prx-button [model]="model" disabled=1 >Saved</prx-button>
\`\`\`
        `
      }
    }
  );
