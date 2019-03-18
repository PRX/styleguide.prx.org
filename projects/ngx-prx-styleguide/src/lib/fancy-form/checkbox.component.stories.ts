import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { FancyFormModule } from './fancy-form.module';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    FancyFormModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Forms Controls|Inputs/Fancy Checkbox', module)
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
      const label = decodeHtml('Label', 'My Label');
      const colorOptions = {
        Default: null,
        Green: '#61A85D',
        Blue: '#0089bd'
      };
      const color = select('Color', colorOptions, null);
      const isChecked = boolean('Checked', true);
      const small = boolean('Small', false);
      const disabled = boolean('Diabled', false);
      const onClick = action('Checkbox Clicked');

      return {
        template: `
          <div class="centered-wrapper">
            <prx-checkbox
              [(checked)]="isChecked"
              ${color && '[color]="color"'}
              [small]="small"
              [disabled]="disabled"
              (change)="onClick($event)"
            >{{ label }}</prx-checkbox>
          </div>
        `,
        props: {
          label,
          isChecked,
          color,
          small,
          disabled,
          onClick
        }
      }
    },
    {
      notes: {
        markdown:`
# Fancy Checkbox

A fancy Checkbox Component, with configurable color and size. With all the usual
bindings/emitters you'd expect in a quality checkbox.

----

__Module__ \`FancyFormModule\`

__Selector__ \`prx-checkbox\`

----

- \`@Input() disabled: boolean\` \\- Disable the form input.
- \`@Input() small: boolean\` \\- A much smaller checkbox.
- \`@Input() color: string\` \\- Set the hex color of the checkbox (defaults to PRX-orange #ff9600).
- \`@Input/Output() checked: boolean\` \\- 2 way data binding to checkbox state.
- \`@Outpu() change: boolean\` \\-  Supplemantary output event for changes.
`
      }
    }
  );

