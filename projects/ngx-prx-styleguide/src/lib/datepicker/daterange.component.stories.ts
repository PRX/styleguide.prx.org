import { Observable } from 'rxjs';
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

storiesOf('Forms Controls|Inputs/Date Range', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const dateFormat = text('Date Format', 'MM/DD/YYYY');
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
      const dataFromDate = dateKnob('From Date', defaultDate);
      const dataToDate = dateKnob('To Date', defaultDate);
      const onRangeChange = (r: any) => {
        action('Range Changed')({
          from: { date: r.from, string: useUTC ? r.from.toUTCString() : r.from.toString() },
          to: { date: r.to, string: useUTC ? r.to.toUTCString() : r.to.toString() }
        });
      };

      return {
        template: `
          <div class="centered-wrapper">
            <prx-daterange
              [format]="dateFormat"
              [from]="dataFromDate"
              [to]="dataToDate"
              (rangeChange)="onRangeChange($event)"
              [UTC]="useUTC"
            ></prx-daterange>
          </div>
        `,
        props: {
          dateFormat,
          dataFromDate,
          dataToDate,
          onRangeChange
        }
      }
    },
    {
      notes: {
        markdown:`
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
### Usage
\`\`\`javascript
@Component ({
  selector:'open-picker',
  template: \`
    <div class="centered-wrapper">
      <prx-datepicker [container]="calendar"></prx-datepicker>
      <div #calendar></div>
    </div>
  \`,
  styles: [
    ':host >>> .pika-single.container { border: 1px solid #e6e6e6; border-top: 0; }'
  ]
})
class OpenPickerComponent {
  @ViewChild('calendar') calendar:ElementRef;
}
\`\`\`
        `
      }
    }
  );

