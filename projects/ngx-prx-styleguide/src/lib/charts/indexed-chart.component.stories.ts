import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, boolean, select, color } from '@storybook/addon-knobs';
import { ChartsModule } from './charts.module';
import { episodes } from './mock-data/episodes.mock-data';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    ChartsModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Charts|Indexed Chart', module)
  .addDecorator(centered)
  .add('Overview', () => ({
    template: 'See <strong>Notes</strong> tab for overview.'
  }), {
    notes: {
      markdown: `
# Indexed Chart

An Indexed Chart is where dataset values are grouped into categories that equate
to their index in the dataset array. Because of the array indexing of
categories, indexed datasets cannot be sparsely populated.

----

__Module__ \`ChartsModule\`

__Selector__ \`prx-indexed-chart\`

----

- \`@Input() datasets: IndexedChartModel[] \` \\- An array of IndexedChartModels, i.e. \`[{ data: number[], label: string, color: string; }]\`.
- \`@Input() type: ChartType = 'line'\` \\- ChartType can be 'line', 'pie', or 'bar'.
- \`@Input() formatX: Function \\- A function to [format the X axis tick value](https://c3js.org/reference.html#axis-x-tick-format).
`
    }
  });

storiesOf('Charts|Indexed Chart', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Pie Chart',
    () => {
      const datasets = episodes.map(({title, color, queries}) => ({
        label: title,
        color,
        data: queries.impressions.data.map((item: any) => item[1])
      }));

      return {
        template: `
          <prx-indexed-chart
            type="pie"
            [datasets]="datasets"
          ></prx-indexed-chart>
        `,
        props: {
          datasets
        }
      }
    },
    {
      notes: {
        markdown:`
# Pie Chart

A Pie Chart is used to represent proportions. The datasets can either be arrays
with a single element representing that proportion, or if datasets is given as
arrays with multiple elements, their values will be added together.

## Usage

\`\`\`html
<prx-indexed-chart type="pie" [datasets]="datasets"></prx-indexed-chart>
\`\`\`
`
      }
    }
  )
  .add(
    'Bar Chart',
    () => {
      const datasets = episodes.map(({title, color, queries}) => ({
        label: title,
        color,
        data: queries.dateRange.data.map((item: any) => item[1])
      }));

      return {
        template: `
          <prx-indexed-chart
            type="bar"
            [datasets]="datasets"
          ></prx-indexed-chart>
        `,
        props: {
          datasets
        }
      }
    },
    {
      notes: {
        markdown:`
# Bar Chart

A Bar Chart is used to show comparisons among categories. Order on an indexed
bar chart will be shown in the order of the arrays given in datasets.

## Usage

\`\`\`html
<prx-indexed-chart type="bar" [datasets]="datasets"></prx-indexed-chart>
\`\`\`
`
      }
    }
  )
  .add(
    'Line Chart',
    () => {
      const datasets = episodes.map(({title, color, queries})=> {
        const mapCumulativeData = (data: any) => {
          let sum = 0;
          return data.map((datum: any) => {
            return sum += datum[1];
          });
        };

        return {
          label: title,
          color,
          data: mapCumulativeData(queries.releaseIndexed.data)
        };
      });
      const formatLineX = (s: string) => 'Day ' + s;

      return {
        template: `
          <prx-indexed-chart
            type="line"
            [datasets]="datasets"
            [formatX]="formatLineX"
          ></prx-indexed-chart>
        `,
        props: {
          datasets,
          formatLineX
        }
      }
    },
    {
      notes: {
        markdown:`
# Line Chart

A Line Chart is often used to visualize a trend in data.

## Usage

\`\`\`javascript
function formatLineX(s: string) {
  return 'Day ' + s;
}
\`\`\`

\`\`\`html
<prx-indexed-chart type="line" [formatX]="formatLineX" [datasets]="datasets"></prx-indexed-chart>
\`\`\`
`
      }
    }
  );

