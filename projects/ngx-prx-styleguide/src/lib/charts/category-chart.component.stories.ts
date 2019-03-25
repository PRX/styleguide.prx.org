import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, boolean, select, color } from '@storybook/addon-knobs';
import { ChartsModule } from './charts.module';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    ChartsModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Charts|Category Chart', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const rotated = boolean('Rotated', true);
      const barColor= color('Bar Color', '#0089bd');
      const dataLabel = text('Data Label', '');
      const data = [
        { value: 5366, label: 'Episode 68: All the Time in the World' },
        { value: 6826, label: 'Episode 69: Becoming Chief Brown' },
        { value: 9268, label: 'Episode 70: The Procedure' },
        { value: 2793, label: 'Episode 71: A Bump in the Night' },
        { value: 7537, label: 'Episode 72: Bears, Birds, and Bones' },
        { value: 12578, label: 'Others' }
      ];

      return {
        template: `
          <prx-category-chart
            [data]="data"
            [color]="barColor"
            [rotated]="rotated"
            [dataLabel]="dataLabel"
          ></prx-category-chart>
        `,
        props: {
          data,
          barColor,
          rotated,
          dataLabel
        }
      }
    },
    {
      notes: {
        markdown:`
# Category Chart

A Category Chart is where data is given categories as labels on the x axis.

----

__Module__ \`ChartsModule\`

__Selector__ \`prx-category-chart\`

----

- \`@Input() data: CategoryChartModel[]\` \\- Disable the form input.
- \`@Input() color: string = '#0089bd'\` \\- Set the hex color for all bars.
- \`@Input() rotated: boolean = true\` \\- Set to false to orient categories along x-axis.
- \`@Input() dataLabel: string = 'amount'\` \\- General label describing to bar amount, displayed in hover with amount.

----

\`\`\`html
<prx-category-chart
  [data]="data"
  [rotated]="rotated"
></prx-category-chart>
\`\`\`
`
      }
    }
  );

