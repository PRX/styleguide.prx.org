import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, date, boolean, text } from '@storybook/addon-knobs';
import { DatepickerModule } from './datepicker.module';
import { Component, ViewChild, ElementRef } from '@angular/core';

// Need a component defined to demo container prop usage.
@Component({
  selector: 'open-picker',
  template: `
    <div class="centered-wrapper">
      <prx-datepicker [container]="calendar"></prx-datepicker>
      <div #calendar></div>
    </div>
  `,
  styles: [':host >>> .pika-single.container { border: 1px solid #e6e6e6; border-top: 0; }']
})
class OpenPickerComponent {
  @ViewChild('calendar', { static: true }) calendar: ElementRef;
}

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [DatepickerModule],
  schemas: [],
  declarations: [],
  providers: []
});

storiesOf('Forms Controls|Inputs/Date Picker', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const changed = boolean('Appear Changed', false);
      const invalid = boolean('Appear Invalid', false);
      const dateFormat = text('Date Format', 'MM/DD/YYYY');
      const useUTC = boolean('Use UTC', false);
      const today = new Date();
      // Default day can't change, so we need to construct the day, not the second.
      const defaultDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      // Date knob returns UTC string. Wrap knob funciton to convert to Date.
      const dateKnob = (name: string, defaultValue: Date) => {
        const stringTimestamp = date(name, defaultValue);
        const d = new Date(stringTimestamp);
        return useUTC
          ? new Date(
              Date.UTC(
                d.getFullYear(),
                d.getMonth(),
                d.getDate(),
                d.getHours(),
                d.getMinutes(),
                d.getSeconds(),
                d.getMilliseconds()
              )
            )
          : d;
      };
      const dataDate = dateKnob('Initial Date', defaultDate);
      const onDateChange = (newDate: Date) => {
        action('Date Changed')({ date: newDate, string: useUTC ? newDate.toUTCString() : newDate.toString() });
      };

      return {
        template: `
          <prx-datepicker
            [format]="dateFormat"
            [date]="dataDate"
            (dateChange)="onDateChange($event)"
            [UTC]="useUTC"
            [changed]="changed"
            [invalid]="invalid"
          ></prx-datepicker>
        `,
        props: {
          changed,
          invalid,
          dateFormat,
          dataDate,
          onDateChange,
          useUTC
        }
      };
    },
    {
      notes: {
        markdown: `
# Date Picker

The prx-datepicker is an ng2 wrapper for [Pikaday](https://github.com/dbushell/Pikaday).

----

__Module__ \`DatepickerModule\`

__Selector__ \`prx-datepicker\`

----

- \`@Input() format: string = 'MM/DD/YYYY'\` \\- _(optional)_ Format shown in the form field. Formatting options are [moment](https://momentjs.com/docs/#/displaying/format/) based.
- \`@Input() container: ElementRef\` \\- _(optional)_ Element reference for an always open calendar picker.
- \`@Input() date: Date | string\` \\- _(optional)_ Sets initial date of the picker.
- \`@Input() changed: boolean = false\` \\- _(optional)_ If true, applies the class \`changed\` to the input element.
- \`@Input() invalid: boolean = false\` \\- _(optional)_ If true, applies the class \`invalid\` to the input element.
- \`@Input() UTC: boolean = false\` \\- _(optional)_ Have picker use and return UTC dates.
- \`@Output() dateChange: EventEmitter<Date>\` \\- _(optional)_ Emitted when date is selected.
`
      }
    }
  );

storiesOf('Forms Controls|Inputs/Date Picker/Examples', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Always Open Picker',
    () => ({
      component: OpenPickerComponent
    }),
    {
      notes: {
        markdown: `
## Usage
\`\`\`javascript
@Component ({
  selector:'open-picker',
  template: \`
    <prx-datepicker [container]="calendar"></prx-datepicker>
    <div #calendar></div>
  \`,
  styles: [
    ':host >>> .pika-single.container { border: 1px solid #e6e6e6; border-top: 0; }'
  ]
})
class OpenPickerComponent {
  @ViewChild('calendar', {static: true}) calendar:ElementRef;
}
\`\`\`
        `
      }
    }
  );
