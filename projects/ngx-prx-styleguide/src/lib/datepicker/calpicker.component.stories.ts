import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, number, date, boolean } from '@storybook/addon-knobs';
import { DatepickerModule } from './datepicker.module';
import { SimpleDate } from './simpledate';

const markdown = `
# Calendar Picker

The prx-calpicker is an ng2 wrapper for [Pikaday](https://github.com/dbushell/Pikaday).

All inputs/outputs are handled via a time/timezone-free \`SimpleDate\` class.

----

__Module__ \`DatepickerModule\`

__Selector__ \`prx-calpicker\`

----

- \`@Input() months: number\` \\- _(optional)_ Number of months to be displayed side-by-side.
- \`@Input() minDate: SimpleDate\` \\- _(optional)_ Minimum allowed date selection.
- \`@Input() maxDate: SimpleDate\` \\- _(optional)_ Maximum allowed date selection.
- \`@Input() defaultDate: SimpleDate\` \\- _(optional)_ Initial date to view.
- \`@Input() dates: SimpleDate[]\` \\- _(optional)_ Sets initial dates of the picker.
- \`@Output() datesChange: EventEmitter<SimpleDate[]>\` \\- _(optional)_ Emitted when dates are selected.
`;

const usage = () => {
  const yesterday = new Date();
  yesterday.setHours(0, 0, 0, 0);
  yesterday.setDate(yesterday.getDate() - 1);
  const inTwoMonths = new Date();
  inTwoMonths.setHours(0, 0, 0, 0);
  inTwoMonths.setDate(inTwoMonths.getDate() + 60);
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const months = number('Months', 3);
  const minDateStr = date('Min date', yesterday);
  const maxDateStr = date('Max date', inTwoMonths);
  const defaultDateStr = date('Default date', tomorrow);
  const disabled = boolean('Disabled', false);
  const dateStr = date('Set selection', tomorrow);

  const minDate = new SimpleDate(new Date(minDateStr), true);
  const maxDate = new SimpleDate(new Date(maxDateStr), true);
  const defaultDate = new SimpleDate(new Date(defaultDateStr), true);
  const dates = [new SimpleDate(new Date(dateStr), true)];
  const datesChange = (d: SimpleDate[]) => action('Dates Changed')(d);

  return {
    template: `
      <div class="main">
        <prx-calpicker
          [months]="months"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [defaultDate]="defaultDate"
          [disabled]="disabled"
          [dates]="dates"
          (datesChange)="datesChange($event)"
        ></prx-calpicker>
      </div>
    `,
    props: {months, minDate, maxDate, defaultDate, disabled, dates, datesChange},
    styles: [
      `
      .main {
        width: 90vw;
      }
      @media screen and (min-width: 768px) {
        .main {
          width: 60vw;
        }
      }
      `
    ]
  };
};

storiesOf('Forms Controls|Inputs/Calendar Picker', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(moduleMetadata({imports: [DatepickerModule]}))
  .add('Usage Details (Knobs)', usage, {notes: {markdown}});
