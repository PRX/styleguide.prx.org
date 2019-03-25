import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, boolean, date as dateKnob } from '@storybook/addon-knobs';

import { TzDatepickerModule } from './tz-datepicker.module'

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    TzDatepickerModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Datepicker', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const date = dateKnob('Date', new Date(Date.UTC(2018, 2, 16, 2, 0, 0, 0)))
      const changed = boolean('Date Changed', false)
      const dateChange = action('Date Change')

      return {
        template: `
          <div class="centered-wrapper">
            <prx-tz-datepicker (dateChange)="dateChange($event)" [date]="date" [changed]="changed"></prx-tz-datepicker>
          </div>
        `,
        props: {
          date,
          changed,
          dateChange
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