import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, date, boolean, text } from '@storybook/addon-knobs';
import { DatepickerModule } from './datepicker.module';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    DatepickerModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Forms Controls|Inputs/Time Picker', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const changed = boolean('Appear Changed', false);
      const useUTC = boolean('Use UTC', false);
      const today = new Date();
      // Default day can't change, so we need to construct the day, not the second.
      const defaultDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      // Date knob returns UTC string. Wrap knob funciton to convert to Date.
      const dateKnob = (name: string, defaultValue: Date) => {
        const stringTimestamp = date(name, defaultValue);
        const d = new Date(stringTimestamp);
        return useUTC ? new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds())) : d;
      };
      const dataDate = dateKnob('Initial Date', defaultDate);
      const onTimeChange = (newDate: Date) => {
        action('Date Changed')({date: newDate, string: useUTC ? newDate.toUTCString() : newDate.toString()});
      };

      return {
        template: `
          <prx-timepicker
            [date]="dataDate"
            (timeChange)="onTimeChange($event)"
            [UTC]="useUTC"
            [changed]="changed"
          ></prx-timepicker>
        `,
        props: {
          changed,
          dataDate,
          onTimeChange,
          useUTC
        }
      }
    },
    {
      notes: {
        markdown:`
# Time Picker

Input to set time portion of dates at 30 minute increments. Use in combination with Date Picker.

----

__Module__ \`DatepickerModule\`

__Selector__ \`prx-timepicker\`

----

- \`@Input() date: Date | string\` \\- _(optional)_ Sets initial date of the picker.
- \`@Input() changed: boolean = false\` \\- _(optional)_ If true, applies the class \`changed\` to the input element.
- \`@Input() UTC: boolean = false\` \\- _(optional)_ Have picker use and return UTC dates.
- \`@Output() timeChange: EventEmitter<Date>\` \\- _(optional)_ Emitted when time is selected.
`
      }
    }
  );

storiesOf('Forms Controls|Inputs/Time Picker/Examples', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'With Date Picker',
    () => {
      const dataDate = new Date();
      const onDateChange = action('Date Changed');

      return {
        template: `
          <prx-datepicker
            [date]="dataDate"
            (dateChange)="onDateChange($event)"
          ></prx-datepicker>
          <prx-timepicker
            [date]="dataDate"
            (timeChange)="onDateChange($event)"
          ></prx-timepicker>
        `,
        props: {
          dataDate,
          onDateChange
        }
      };
    },
    {
      notes: {
        markdown: `
### Usage
\`\`\`html
<prx-datepicker [date]="dataDate" (dateChange)="onDateChange($event)" ></prx-datepicker>
<prx-timepicker [date]="dataDate" (timeChange)="onDateChange($event)" ></prx-timepicker>
\`\`\`
        `
      }
    }
  );

