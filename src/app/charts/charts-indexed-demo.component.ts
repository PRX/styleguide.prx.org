import { Component } from '@angular/core';
import { IndexedChartModel } from 'ngx-prx-styleguide';

@Component({
  selector: 'app-charts-indexed-demo',
  template: `
    <section class="main demo">
      <h1>IndexedChart</h1>
      <p>
        An Indexed Chart is where dataset values are grouped into categories that equate to their index in the dataset array.
        Because of the array indexing of categories, indexed datasets cannot be sparsely populated.
      </p>
      <dl>
        <dt>module</dt><dd><code>ChartsModule</code></dd>
        <dt>selector</dt><dd><code>prx-indexed-chart</code></dd>
      </dl>
      <ul>
        <li>
          <code>@Input() type: ChartType = 'line'</code>
          - ChartType can be <code>'line'</code>, <code>'pie'</code>, or <code>'bar'</code>; default is <code>'line'</code>
        </li>
        <li>
          <code>@Input() formatX: Function</code>
          - <a href="http://c3js.org/reference.html#axis-x-tick-format">format the X axis value</a> with a function that returns a string
        </li>
        <li>
          <code>@Input() datasets: IndexedChartModel[]</code>
          - an array of IndexedChartModels, i.e. <code>[&#123; data: number[], label: string, color: string; &#125;]</code>
        </li>
      </ul>
      <aside>
        <h2><code>Pie Chart</code></h2>
        <p>
          A Pie Chart is used to represent proportions.
          The <code>datasets</code> can either be arrays with a single element representing that proportion,
          or if <code>datasets</code> is given as arrays with multiple elements, their values will be added together.
        </p>
        Usage:
        <pre class="code">
          &lt;prx-indexed-chart type="pie" [datasets]="datasetsPie"&gt;
          &lt;/prx-indexed-chart&gt;
        </pre>
        Example:
        <prx-indexed-chart type="pie" [datasets]="datasetsPie">
        </prx-indexed-chart>
      </aside>

      <aside>
        <h2>Bar Chart</h2>
        <p>
          A Bar Chart is used to show comparisons among categories. Order on an indexed bar chart will be shown in the
          order of the arrays given in <code>datasets</code>.
        </p>
        Usage:
        <pre class="code">
          &lt;prx-indexed-chart type="bar" [datasets]="datasetsBar"&gt;
          &lt;/prx-indexed-chart&gt;
        </pre>
        Example:
        <prx-indexed-chart type="bar" [datasets]="datasetsBar">
        </prx-indexed-chart>
      </aside>

      <aside>
        <h2>Line Chart</h2>
        <p>
          A Line Chart is often used to visualize a trend in data.
        </p>
        Usage:
        <pre class="code">
          function formatLineX(s: string) &#123;
            return 'day ' + s;
          &#125;
        </pre>
        <pre class="code">
          &lt;prx-indexed-chart type="line" order="asc" [formatX]="formatLineX" [datasets]="datasetsLine"&gt;
          &lt;/prx-indexed-chart&gt;
        </pre>
        Example:
        <prx-indexed-chart type="line" [formatX]="formatLineX" [datasets]="datasetsLine"></prx-indexed-chart>
      </aside>
    </section>
  `,
})

export class ChartsIndexedDemoComponent {

  datasetsPie: IndexedChartModel[];

  datasetsBar: IndexedChartModel[];

  datasetsLine: IndexedChartModel[];

  constructor() {
    this.mapPie();
    this.mapBar();
    this.mapLine();
  }

  mapData(data: any): number[] {
    return data.map((datum: any) => {
      return datum[1];
    });
  }

  mapPie() {
    this.datasetsPie = [
      { data: this.mapData(this.impressionsEp00), label: 'Episode 72: Bears, Birds, and Bones', color: '#f02' },
      { data: this.mapData(this.impressionsEp01), label: 'Episode 71: A Bump in the Night', color: '#0f0' },
      { data: this.mapData(this.impressionsEp02), label: 'Episode 70: The Procedure', color: '#0df' },
      { data: this.mapData(this.impressionsEp03), label: 'Episode 69: Becoming Chief Brown', color: '#f0f' },
      { data: this.mapData(this.impressionsEp04), label: 'Episode 68: All the Time in the World', color: '#00f' },
      { data: this.mapData(this.impressionsOthers), label: 'Others', color: '#a3a3a3' }
    ];
  }

  mapBar() {
    this.datasetsBar = [
      { data: this.mapData(this.downloadsEp04DateRange), label: 'Episode 68: All the Time in the World', color: '#00f' },
      { data: this.mapData(this.downloadsEp03DateRange), label: 'Episode 69: Becoming Chief Brown', color: '#f0f' },
      { data: this.mapData(this.downloadsEp02DateRange), label: 'Episode 70: The Procedure', color: '#0df' },
      { data: this.mapData(this.downloadsEp01DateRange), label: 'Episode 71: A Bump in the Night', color: '#0f0' },
      { data: this.mapData(this.downloadsEp00DateRange), label: 'Episode 72: Bears, Birds, and Bones', color: '#f02' },
      { data: this.mapData(this.downloadsOthers), label: 'Others', color: '#a3a3a3' }
    ];
  }

  formatLineX(s: string) {
    return `day ${s}`;
  }

  mapLine() {
    const mapCumulativeData = (data: any) => {
      let sum = 0;
      return data.map((datum: any) => {
        return sum += datum[1];
      });
    };

    const dataset00 = mapCumulativeData(this.downloadsEp00ReleaseIndexed);
    const dataset01 = mapCumulativeData(this.downloadsEp01ReleaseIndexed);
    const dataset02 = mapCumulativeData(this.downloadsEp02ReleaseIndexed);
    const dataset03 = mapCumulativeData(this.downloadsEp03ReleaseIndexed);
    const dataset04 = mapCumulativeData(this.downloadsEp04ReleaseIndexed);
    this.datasetsLine = [
      { data: dataset00, label: 'Episode 72: Bears, Birds, and Bones', color: '#f02' },
      { data: dataset01, label: 'Episode 71: A Bump in the Night', color: '#0f0' },
      { data: dataset02, label: 'Episode 70: The Procedure', color: '#0df' },
      { data: dataset03, label: 'Episode 69: Becoming Chief Brown', color: '#f0f' },
      { data: dataset04, label: 'Episode 68: All the Time in the World', color: '#00f' }
    ];

    const averageData = (data: number[][]) => {
      return data[0].map((datum, i) => {
        let sum = 0;
        data.forEach(dataset => {
          sum += dataset[i];
        });
        return Math.round(sum / data.length);
      });
    };

    this.datasetsLine.push(
      { data: averageData([dataset00, dataset01, dataset02, dataset03, dataset04]),
        label: 'Average', color: '#a3a3a3' }
    );
  }

  get downloadsEp00DateRange(): any[][] {
    return [
      [
        '2017-07-12',
        4072
      ],
      [
        '2017-07-13',
        2652
      ],
      [
        '2017-07-14',
        1991
      ],
      [
        '2017-07-15',
        1165
      ],
      [
        '2017-07-16',
        1478
      ],
      [
        '2017-07-17',
        1526
      ],
      [
        '2017-07-18',
        1378
      ]
    ];
  }

  get downloadsEp00ReleaseIndexed(): any[][] {
    return [
      [
        '2017-07-10T00:00:00Z',
        21599
      ],
      [
        '2017-07-11T00:00:00Z',
        8582
      ],
      [
        '2017-07-12T00:00:00Z',
        4072
      ],
      [
        '2017-07-13T00:00:00Z',
        2652
      ],
      [
        '2017-07-14T00:00:00Z',
        1991
      ],
      [
        '2017-07-15T00:00:00Z',
        1165
      ],
      [
        '2017-07-16T00:00:00Z',
        1478
      ]
    ];
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

  get downloadsEp01DateRange(): any[][] {
    return [
      [
        '2017-07-12',
        162
      ],
      [
        '2017-07-13',
        147
      ],
      [
        '2017-07-14',
        105
      ],
      [
        '2017-07-15',
        92
      ],
      [
        '2017-07-16',
        131
      ],
      [
        '2017-07-17',
        121
      ],
      [
        '2017-07-18',
        131
      ]
    ];
  }

  get downloadsEp01ReleaseIndexed(): any[][] {
    return [
      [
        '2017-04-28T00:00:00Z',
        5766
      ],
      [
        '2017-04-29T00:00:00Z',
        20401
      ],
      [
        '2017-04-30T00:00:00Z',
        6190
      ],
      [
        '2017-05-01T00:00:00Z',
        5009
      ],
      [
        '2017-05-02T00:00:00Z',
        3335
      ],
      [
        '2017-05-03T00:00:00Z',
        2036
      ],
      [
        '2017-05-04T00:00:00Z',
        1428
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

  get downloadsEp02DateRange(): any[][] {
    return [
      [
        '2017-07-12',
        126
      ],
      [
        '2017-07-13',
        94
      ],
      [
        '2017-07-14',
        101
      ],
      [
        '2017-07-15',
        69
      ],
      [
        '2017-07-16',
        92
      ],
      [
        '2017-07-17',
        91
      ],
      [
        '2017-07-18',
        94
      ]
    ];
  }

  get downloadsEp02ReleaseIndexed(): any[][] {
    return [
      [
        '2017-06-21T00:00:00Z',
        25985
      ],
      [
        '2017-06-22T00:00:00Z',
        6022
      ],
      [
        '2017-06-23T00:00:00Z',
        3098
      ],
      [
        '2017-06-24T00:00:00Z',
        2223
      ],
      [
        '2017-06-25T00:00:00Z',
        1791
      ],
      [
        '2017-06-26T00:00:00Z',
        2035
      ],
      [
        '2017-06-27T00:00:00Z',
        1588
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
        1041
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

  get downloadsEp03DateRange(): any[][] {
    return [
      [
        '2017-07-12',
        105
      ],
      [
        '2017-07-13',
        74
      ],
      [
        '2017-07-14',
        68
      ],
      [
        '2017-07-15',
        44
      ],
      [
        '2017-07-16',
        74
      ],
      [
        '2017-07-17',
        83
      ],
      [
        '2017-07-18',
        79
      ]
    ];
  }

  get downloadsEp03ReleaseIndexed(): any[][] {
    return [
      [
        '2017-06-14T00:00:00Z',
        26830
      ],
      [
        '2017-06-15T00:00:00Z',
        6978
      ],
      [
        '2017-06-16T00:00:00Z',
        3765
      ],
      [
        '2017-06-17T00:00:00Z',
        2392
      ],
      [
        '2017-06-18T00:00:00Z',
        2045
      ],
      [
        '2017-06-19T00:00:00Z',
        2305
      ],
      [
        '2017-06-20T00:00:00Z',
        1666
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

  get downloadsEp04DateRange(): any[][] {
    return [
      [
        '2017-07-12',
        96
      ],
      [
        '2017-07-13',
        67
      ],
      [
        '2017-07-14',
        70
      ],
      [
        '2017-07-15',
        58
      ],
      [
        '2017-07-16',
        80
      ],
      [
        '2017-07-17',
        68
      ],
      [
        '2017-07-18',
        87
      ]
    ];
  }

  get downloadsEp04ReleaseIndexed(): any[][] {
    return [
      [
        '2017-06-07T00:00:00Z',
        28033
      ],
      [
        '2017-06-08T00:00:00Z',
        7552
      ],
      [
        '2017-06-09T00:00:00Z',
        3787
      ],
      [
        '2017-06-10T00:00:00Z',
        1789
      ],
      [
        '2017-06-11T00:00:00Z',
        2181
      ],
      [
        '2017-06-12T00:00:00Z',
        2390
      ],
      [
        '2017-06-13T00:00:00Z',
        1929
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

  get downloadsOthers(): any[][] {
    return [
      [
        '2017-07-12',
        4940
      ],
      [
        '2017-07-13',
        3820
      ],
      [
        '2017-07-14',
        3533
      ],
      [
        '2017-07-15',
        2426
      ],
      [
        '2017-07-16',
        3287
      ],
      [
        '2017-07-17',
        3310
      ],
      [
        '2017-07-18',
        3987
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
