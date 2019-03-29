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

storiesOf('Forms Controls|Inputs/Timezone Datepicker', module)
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
# Timezone Date Picker

The prx-tz-datepicker combines date, time and timezone pickers for precise user control over date input

----

__Module__ \`TzDatepickerModule\`

__Selector__ \`prx-tz-datepicker\`

----

- \`@Input() date: Date | string\` \\- _(optional)_ Sets initial date of the picker.
- \`@Input() changed: boolean = false\` \\- _(optional)_ If true, applies the class \`changed\` to the input element.
- \`@Output() dateChange: EventEmitter<Date>\` \\- _(optional)_ Emitted when date is selected.
`
      }
    }
  );