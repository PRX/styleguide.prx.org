import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, number, boolean, array, select, radios, color, date, button } from '@storybook/addon-knobs';
import { FancyFormModule } from './fancy-form.module';
import { DemoModel } from './../../../../../src/app/model/demo.model'; // TODO: Move this to storybook app.
import { HalDoc } from 'ngx-prx-styleguide';

HalDoc

import '../../assets/styles/_reset.scss';
import '../../assets/styles/_button.scss';

const model = new DemoModel(null, new HalDoc({}, null));

const componentMetaData = moduleMetadata({
  imports: [
    FancyFormModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Forms Controls|Fancy Button', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(componentMetaData)
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
          <div class="centered-wrapper">
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
          </div>
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


storiesOf('Forms Controls|Fancy Button/Examples', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(componentMetaData)
  .add(
    'Orange Button',
    () => ({
      template: `
        <div class="centered-wrapper">
          <prx-button [model]="model" orange=1 disabled=0 >Publish</prx-button>
        </div>
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
        <div class="centered-wrapper">
          <prx-button [model]="model" plain=1 disabled=0 >Discard</prx-button>
        </div>
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
        <div class="centered-wrapper">
          <prx-button [model]="model" red=1 disabled=0 >Delete</prx-button>
        </div>
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
        <div class="centered-wrapper">
          <prx-button [model]="model" green=1 disabled=0 >Create</prx-button>
        </div>
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
        <div class="centered-wrapper">
          <prx-button [model]="model" working=1 disabled=0 >Create</prx-button>
        </div>
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
        <div class="centered-wrapper">
          <prx-button [model]="model" disabled=1 >Saved</prx-button>
        </div>
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
