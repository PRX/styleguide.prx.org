import { Component } from '@angular/core';
import { CategoryChartModel } from 'ngx-prx-styleguide';

@Component({
  selector: 'charts-category-demo',
  template: `
    <section class="main demo">
      <h1>CategoryChart</h1>
      <p>
        A Category Chart is where data is given categories as labels on the x axis.
      </p>
      <dl>
        <dt>module</dt><dd><code>ChartsModule</code></dd>
        <dt>selector</dt><dd><code>prx-category-chart</code></dd>
      </dl>
      <ul>
        <li>
          <code>@Input() data: CategoryChartModel[]</code>
          - an array of CategoryChartModel, i.e. <code>[&#123; value: number, label: string; &#125;]</code>
        </li>
        <li>
          <code>@Input() color: string</code>
          - hex color code for all bars, default <code>'#0089bd'</code>
        </li>
        <li>
          <code>@Input() rotated: boolean</code>
          - if <code>true</code>, the axis is rotated, default is <code>true</code>
        </li>
        <li>
          <code>@Input() dataLabel: string</code>
          - general label describing to bar amount, displayed in hover with amount, default is <code>'amount'</code>
        </li>
      </ul>
      
      <aside>
        <h2>Bar Chart</h2>
        <p>
          A Bar Chart is used to show comparisons among categories. Bars will be ordered in the order given.
        </p>
        Usage:
        <pre class="code">
          &lt;prx-category-chart [data]="barData" [rotated]="noRotate"&gt;
          &lt;/prx-category-chart&gt;
        </pre>
        Example:
        <prx-category-chart [data]="barData" [rotated]="noRotate">
        </prx-category-chart>
      </aside>

      <aside>
        <h2>Rotated Bar Chart</h2>
        <p>
          A Rotated Bar Chart is used to show comparisons among categories. Bars will be ordered in the order given.
        </p>
        Usage:
        <pre class="code">
          &lt;prx-category-chart [data]="horizData" [rotated]="true"&gt;
          &lt;/prx-category-chart&gt;
        </pre>
        Example:
        <prx-category-chart [data]="horizData" [rotated]="true">
        </prx-category-chart>
      </aside>
    </section>
  `,
})

export class ChartsCategoryDemoComponent {
  noRotate = false;
  barData = [
      { value: 5366, label: 'Episode 68: All the Time in the World' },
      { value: 6826, label: 'Episode 69: Becoming Chief Brown' },
      { value: 9268, label: 'Episode 70: The Procedure' },
      { value: 2793, label: 'Episode 71: A Bump in the Night' },
      { value: 7537, label: 'Episode 72: Bears, Birds, and Bones' },
      { value: 12578, label: 'Others' }
    ];
  horizData = [
      { value: 2454, label: 'Episode 68: All the Time in the World' },
      { value: 3454, label: 'Episode 69: Becoming Chief Brown' },
      { value: 3689, label: 'Episode 70: The Procedure' },
      { value: 6782, label: 'Episode 71: A Bump in the Night' },
      { value: 3679, label: 'Episode 72: Bears, Birds, and Bones' },
      { value: 3468, label: 'Others' }
    ];
}
