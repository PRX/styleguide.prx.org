import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, boolean, select, color, number } from '@storybook/addon-knobs';
import { ChartsModule } from './charts.module';
import { episodes } from './mock-data/episodes.mock-data';
import { TimeseriesChartModel } from './models/timeseries-chart.model';

const datasets: TimeseriesChartModel[] = episodes.map(({title, color, queries}) => ({
  label: title,
  color,
  data: queries.impressions.data.map((item: any) => ({
    value: item[1],
    date: new Date(item[0])
  }))
}));
const formatDate = (d: Date) => (d.getMonth() + 1) + '/' + d.getDate();
const formatNumber = (value: number) => Number(value).toLocaleString(undefined, {useGrouping: true});

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    ChartsModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Charts|Time Series Chart', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const chartTypes = [
        'bar',
        'area',
        'line'
      ];
      const chartType = select('Chart Type', chartTypes, chartTypes[0]);
      const orderOptions = [
        null,
        'asc',
        'desc'
      ];
      const stacked = boolean('Stacked', false);
      const order = select('Order', orderOptions, orderOptions[0]);
      const strokeWidth = number('Stroke Width', 2.5);
      const showPoints = boolean('Show Points', true);
      const pointRadius = number('Point Radius', 3.25);
      const pointRadiusOnHover = number('Point Hover Radius', 3.75);
      const paddingRight = number('Right Padding', 30);

      return {
        template: `
          <prx-timeseries-chart
            [type]="chartType"
            [stacked]="stacked"
            [order]="order"
            [datasets]="datasets"
            [formatX]="formatDate"
            [formatY]="formatNumber"
            [strokeWidth]="strokeWidth"
            [showPoints]="showPoints"
            [pointRadius]="pointRadius"
            [pointRadiusOnHover]="pointRadiusOnHover"
            [paddingRight]="paddingRight"
          ></prx-timeseries-chart>
        `,
        props: {
          chartType,
          stacked,
          order,
          datasets,
          formatDate,
          formatNumber,
          strokeWidth,
          showPoints,
          pointRadius,
          pointRadiusOnHover,
          paddingRight
        }
      };
    },
    {
      notes: {
        markdown: `
# Time Series Chart

A Time Series Chart is an illustration of data points at successive time
intervals. Time Series Charts can be stacked (grouped) or not stacked. Stacked
charts can be ordered to stack ascending, descending, or in the order that they
datasets are given.

----

__Module__ \`ChartsModule\`

__Selector__ \`prx-timeseries-chart\`

----

- \`@Input() datasets: TimeseriesChartModel[] \` \\- An array of TimeseriesChartModel, i.e. \`[{ data: TimeseriesDatumModel[{ value: number, date: number }], label: string, color: string; }]\`.
- \`@Input() type: ChartType = 'line'\` \\- ChartType can be 'line', 'area', or 'bar'.
- \`@Input() stacked: boolean = false\` \\- Grouped by the X axis values in a stacked style chart.
- \`@Input() order: ChartOrder = null\` \\- ChartOrder can be 'asc', 'desc', or null. Stacked charts cannot have sparse datasets; all sets of data should have values for all X data points. Non stacked charts do allow sparse datasets.
- \`@Input() formatX: Function | string\` \\- A function to [format the X axis tick value](https://c3js.org/reference.html#axis-x-tick-format) or a date format string.
- \`@Input() formatY: Function\` \\- A function to [format the y axis tick value](https://c3js.org/reference.html#axis-x-tick-format).
- \`@Input() minY: Function\` \\- [Set min value of y axis](http://c3js.org/reference.html#axis-y-min).
- \`@Input() strokeWidth: number = 2.5\` \\- [Sets the \`stroke-width\` CSS property](http://c3js.org/reference.html#class-c3-line) on line charts.
- \`@Input() showPoints: boolean = true\` \\- Set to false to [hide points](http://c3js.org/reference.html#point-show) on line and area charts.
- \`@Input() pointRadius: number = 3.25\` \\- Sets the [radius of each point](http://c3js.org/reference.html#point-r).
- \`@Input() pointRadiusOnHover: number = 3.75\` \\- Sets the [radius of each point on hover]http://c3js.org/reference.html#point-focus-expand-r).
- \`@Input() paddingRight: number = 30\` \\- Sets the [padding on the right of the chart](http://c3js.org/reference.html#padding-right).
- \`@Input() maxTicks: number\` \\- Not set by default. Doesn't always play well with tick labels on timeseries charts so use sparingly for charts with a lot of datapoints.
`
      }
    }
  );

storiesOf('Charts|Time Series Chart', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Bar Chart',
    () => ({
      template: `
        <prx-timeseries-chart
          type="bar"
          [datasets]="datasets"
          [formatX]="formatDate"
        ></prx-timeseries-chart>
      `,
      props: {
        datasets,
        formatDate
      }
    }),
    {
      notes: {
        markdown:`
# Bar Chart

A Bar Chart is used to show comparisons among categories along a timeseries.
Order on an indexed bar chart will be shown in the order of the arrays given in
datasets. Datasets can be sparsely populated in an unstacked time series bar
chart.

## Usage

\`\`\`html
<prx-indexed-chart type="bar" [datasets]="datasets" [formatX]="formatDate"></prx-indexed-chart>
\`\`\`
`
      }
    }
  )
  .add(
    'Stacked Bar Chart',
    () => ({
      template: `
      <prx-timeseries-chart
        type="bar"
        stacked="true"
        [datasets]="datasets"
        formatX="%m/%d"
      ></prx-timeseries-chart>
      `,
      props: {
        datasets
      }
    }),
    {
      notes: {
        markdown:`
# Stacked Bar Chart

A stacked bar chart is a chart that uses bars to show comparisons between
categories of data along a timeseries with the ability to break down and compare
parts of a whole. Each bar in the chart represents a whole, and segments in the
bar represent different parts or categories of that whole.

## Usage

\`\`\`html
<prx-indexed-chart type="bar" stacked="true" [datasets]="datasets" formatX="%m/%d"></prx-indexed-chart>
\`\`\`
`
      }
    }
  )
  .add(
    'Stacked Area Chart',
    () => ({
      template: `
      <prx-timeseries-chart
        type="area"
        stacked="true"
        [datasets]="datasets"
        formatX="%m/%d"
        [showPoints]="false"
      ></prx-timeseries-chart>
      `,
      props: {
        datasets
      }
    }),
    {
      notes: {
        markdown:`
# Stacked Bar Chart

A stacked bar chart is a chart that uses bars to show comparisons between
categories of data along a timeseries with the ability to break down and compare
parts of a whole. Each bar in the chart represents a whole, and segments in the
bar represent different parts or categories of that whole.

## Usage

\`\`\`html
<prx-indexed-chart type="bar" stacked="true" [datasets]="datasets" formatX="%m/%d"></prx-indexed-chart>
\`\`\`
`
      }
    }
  )
  .add(
    'Line Chart',
    () => ({
      template: `
        <prx-timeseries-chart
          type="line"
          stacked="true"
          [datasets]="datasets"
          [formatX]="formatDate"
          [formatY]="formatNumber"
          strokeWidth="5"
          pointRadius="5"
          pointRadiusOnHover="8"
        ></prx-timeseries-chart>
      `,
      props: {
        datasets,
        formatDate,
        formatNumber,
      }
    }),
    {
      notes: {
        markdown:`
# Line Chart

A Line Chart is often used to visualize a trend in data. Datasets can be
sparsely populated in a time series line chart.

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

