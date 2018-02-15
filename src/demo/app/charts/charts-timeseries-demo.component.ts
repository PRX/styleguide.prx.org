import { Component } from '@angular/core';
import { TimeseriesChartModel, TimeseriesDatumModel } from 'ngx-prx-styleguide';
import * as moment from 'moment';

@Component({
  selector: 'charts-timeseries-demo',
  template: `
    <section class="main demo">
      <h1>TimeseriesChart</h1>
      <p>
        A Time Series Chart is an illustration of data points at successive time intervals. Time Series Charts can be
        stacked (grouped) or not stacked. Stacked charts can be ordered to stack ascending, descending, or in the order
        that they datasets are given.
      </p>
      <dl>
        <dt>module</dt><dd><code>ChartsModule</code></dd>
        <dt>selector</dt><dd><code>prx-timeseries-chart</code></dd>
      </dl>
      <ul>
        <li>
          <code>@Input() type: ChartType = 'line'</code>
          - ChartType can be <code>'line'</code>, <code>'area'</code>, or <code>'bar'</code>; default is <code>'line'</code>
        </li>
        <li>
          <code>@Input() order: ChartOrder = null</code>
          - ChartOrder can be <code>'asc'</code>, <code>'desc'</code>, or <code>null</code>; default is <code>null</code>
        </li>
        <li>
          <code>@Input() stacked = false</code>
          - defaults to false but if true, data is grouped by the X axis values in a stacked style chart. Stacked charts
          cannot have sparse datasets; all sets of data should have values for all X data points.
          Non stacked charts do allow sparse datasets.
        </li>
        <li>
          <code>@Input() datasets: TimeseriesChartModel[]</code>
          - an array of TimeseriesChartModel,
          i.e. 
          <code>
            [&#123; data: TimeseriesDatumModel[&#123; value: number, date: number &#125;], label: string, color: string; &#125;]
          </code>
        </li>
        <li>
          <code>@Input() formatX: Function | string</code>
          - <a href="http://c3js.org/reference.html#axis-x-tick-format">format the X axis values</a>
          with a function that returns a string or a date format string
        </li>
        <li>
          <code>@Input() formatY: Function</code>
          - <a href="http://c3js.org/reference.html#axis-y-tick-format">format the Y axis values</a>
          with a function that returns a string
        </li>
        <li>
          <code>@Input() minY: Function</code>
          - <a href="http://c3js.org/reference.html#axis-y-min">set min value of y axis</a>
        </li>
        <li>
          <code>@Input() strokeWidth = 2.5</code>
          - defaults to 2.5px, for line charts stokeWidth dynamically sets the CSS property <code>stroke-width</code> on
          <a href="http://c3js.org/reference.html#class-c3-line"><code>.c3-line</code></a>
        </li>
        <li>
          <code>@Input() showPoints = true</code>
          - defaults to true but if false, does not <a href="http://c3js.org/reference.html#point-show">show points</a>
        </li>
        <li>
          <code>@Input() pointRadius = 3.25</code>
          - defaults to 3.25px, sets the <a href="http://c3js.org/reference.html#point-r">radius of each point</a>
        </li>
        <li>
          <code>@Input() pointRadiusOnHover = 3.75</code>
          - defaults to 3.75px, sets the <a href="http://c3js.org/reference.html#point-focus-expand-r">radius of each point on focus</a>
        </li>
        <li>
          <code>@Input() paddingRight = 30</code>
          - defaults to 30px, sets the <a href="http://c3js.org/reference.html#padding-right">padding on the right of the chart</a>
        </li>
      </ul>
      
      <aside>
        <h2>Bar Chart</h2>
        <p>
          A Bar Chart is used to show comparisons among categories along a timeseries. Order on an indexed bar chart will be shown in the
          order of the arrays given in <code>datasets</code>. Datasets can be sparsely populated in an unstacked time series bar chart.
        </p>
        Usage:
        <pre class="code">
          function formatDate(d: Date) &#123;
            return (d.getMonth() + 1) + '/' + d.getDate();
          &#125;
        </pre>
        <pre class="code">
          &lt;prx-timeseries-chart type="bar" [datasets]="datasets" [formatX]="formatDate"&gt;
          &lt;/prx-timeseries-chart&gt;
        </pre>
        Example:
        <prx-timeseries-chart type="bar" [datasets]="datasets" [formatX]="formatDate">
        </prx-timeseries-chart>
      </aside>
      
      <aside>
        <h2>Stacked Bar Chart</h2>
        <p>
          A stacked bar chart is a chart that uses bars to show comparisons between categories of data along a timeseries
          with the ability to break down and compare parts of a whole. Each bar in the chart represents a whole, and segments
          in the bar represent different parts or categories of that whole.
        </p>
        Usage:
        <pre class="code">
          &lt;prx-timeseries-chart type="bar" stacked="true" [datasets]="datasets" formatX="%m/%d"&gt;
          &lt;/prx-timeseries-chart&gt;
        </pre>
        Example:
        <prx-timeseries-chart type="bar" stacked="true" [datasets]="datasets" formatX="%m/%d">
        </prx-timeseries-chart>
      </aside>

      <aside>
        <h2>Stacked Area Chart</h2>
        <p>
          Area charts are used to convey an overall trend rather than emphasize individual data points. Stacked Area Charts
          represent part-to-whole relationships and are useful for comparing multiple variables changing over an interval.
        </p>
        Usage:
        <pre class="code">
          &lt;prx-timeseries-chart type="area" stacked="true" [datasets]="datasets" formatX="%m/%d" [showPoints]="showPointsOnStacked"&gt;
          &lt;/prx-timeseries-chart&gt;
        </pre>
        Example:
        <prx-timeseries-chart type="area" stacked="true" [datasets]="datasets" formatX="%m/%d" [showPoints]="showPointsOnStacked">
        </prx-timeseries-chart>
      </aside>
      
      <aside>
        <h2>Line Chart</h2>
        <p>
          A Line Chart is often used to visualize a trend in data. Datasets can be sparsely populated in a time series line chart.
        </p>
        Usage:
        <pre class="code">
          &lt;prx-timeseries-chart type="line" stacked="true" [datasets]="datasets"
            [formatX]="formatDate" [formatY]="formatNumber"
            strokeWidth="5" pointRadius="5" pointRadiusOnHover="8"&gt;
          &lt;/prx-timeseries-chart&gt;
        </pre>
        Example:
        <prx-timeseries-chart type="line" [datasets]="datasets"
                              [formatX]="formatDate" [formatY]="formatNumber" minY="0"
                              strokeWidth="5" pointRadius="5" pointRadiusOnHover="8">
        </prx-timeseries-chart>
      </aside>
    </section>
  `,
})

export class ChartsTimeseriesDemoComponent {

  datasets: TimeseriesChartModel[];
  showPointsOnStacked = false;

  constructor() {
    this.mapData();
  }

  mapData() {
    const mapData = (data: any) => {
      return data.map((datum: any) => {
        return { value: datum[1], date: moment(datum[0]).valueOf() };
      });
    };

    this.datasets = [
      { data: mapData(this.impressionsEp00), label: 'Episode 72: Bears, Birds, and Bones', color: '#000044' },
      { data: mapData(this.impressionsEp01), label: 'Episode 71: A Bump in the Night', color: '#2C2C68' },
      { data: mapData(this.impressionsEp02), label: 'Episode 70: The Procedure', color: '#59598C' },
      { data: mapData(this.impressionsEp03), label: 'Episode 69: Becoming Chief Brown', color: '#8686B0' },
      { data: mapData(this.impressionsEp04), label: 'Episode 68: All the Time in the World', color: '#B3B3D4' },
      { data: mapData(this.impressionsEp05), label: 'Episode 69: Something I\'m Too Lazy To Come Up With', color: '#B3B3D4' },
      { data: mapData(this.impressionsOthers), label: 'Others', color: '#a3a3a3' }
    ];
  }

  formatDate(d: Date) {
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
  }

  formatNumber(value: number) {
    return Number(value).toLocaleString(undefined, {useGrouping: true});
  }

  get impressionsEp00(): any[][] {
    return [
      [
        '2017-07-12',
        12235
      ],
      [
        '2017-07-13',
        7956
      ],
      [
        '2017-07-14',
        5972
      ],
      [
        '2017-07-15',
        2330
      ],
      [
        '2017-07-16',
        2956
      ],
      [
        '2017-07-17',
        3084
      ],
      [
        '2017-07-18',
        2859
      ]
    ];
  }

  get impressionsEp01(): any[][] {
    return [
      [
        '2017-07-12',
        756
      ],
      [
        '2017-07-13',
        564
      ],
      [
        '2017-07-14',
        606
      ],
      [
        '2017-07-15',
        414
      ],
      [
        '2017-07-16',
        552
      ],
      [
        '2017-07-17',
        582
      ],
      [
        '2017-07-18',
        564
      ]
    ];
  }

  get impressionsEp02(): any[][] {
    return [
      [
        '2017-07-12',
        1474
      ],
      [
        '2017-07-13',
        1248
      ],
      [
        '2017-07-14',
        55000
      ],
      [
        '2017-07-15',
        450
      ],
      [
        '2017-07-16',
        614
      ],
      [
        '2017-07-17',
        688
      ],
      [
        '2017-07-18',
        742
      ]
    ];
  }

  get impressionsEp03(): any[][] {
    return [
      [
        '2017-07-12',
        1237
      ],
      [
        '2017-07-13',
        1065
      ],
      [
        '2017-07-14',
        867
      ],
      [
        '2017-07-15',
        362
      ],
      [
        '2017-07-16',
        562
      ],
      [
        '2017-07-17',
        586
      ],
      [
        '2017-07-18',
        724
      ]
    ];
  }

  get impressionsEp04(): any[][] {
    return [
      [
        '2017-07-12',
        1122
      ],
      [
        '2017-07-13',
        879
      ],
      [
        '2017-07-14',
        693
      ],
      [
        '2017-07-15',
        366
      ],
      [
        '2017-07-16',
        460
      ],
      [
        '2017-07-17',
        494
      ],
      [
        '2017-07-18',
        596
      ]
    ];
  }

  get impressionsEp05(): any[][] {
    return [
      [
        '2017-07-12',
        0
      ],
      [
        '2017-07-13',
        0
      ],
      [
        '2017-07-14',
        0
      ],
      [
        '2017-07-15',
        0
      ],
      [
        '2017-07-16',
        0
      ],
      [
        '2017-07-17',
        0
      ],
      [
        '2017-07-18',
        0
      ]
    ];
  }

  get impressionsOthers(): any[][] {
    return [
      [
        '2017-07-12',
        12148
      ],
      [
        '2017-07-13',
        9132
      ],
      [
        '2017-07-14',
        8725
      ],
      [
        '2017-07-15',
        4062
      ],
      [
        '2017-07-16',
        5508
      ],
      [
        '2017-07-17',
        5568
      ],
      [
        '2017-07-18',
        7009
      ]
    ];
  }
}

