import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-geochart-table-demo',
  template: `
    <table>
      <tr>
        <th>Rank</th><th>{{ data[0][0] }}</th><th>{{ data[0][1] }}</th>
      </tr>
      <tr *ngFor="let row of data.slice(1); index as i">
        <td class="number">{{ i + 1 }}</td>
        <td>
          <button *ngIf="canDrillDown; else noLink"
                    class="btn-link" (click)="country.emit(row[0])">{{ row[0] }}</button>
          <ng-template #noLink>{{ row[0] }}</ng-template>
        </td>
        <td class="number">{{ row[1] }}</td>
      </tr>
    </table>
  `,
  styleUrls: ['geochart-table-demo.css']
})
export class GeoChartTableDemoComponent {
  @Input() region: string;
  @Input() displayMode: string;
  @Input() data: any[][];
  @Output() country = new EventEmitter<string>();

  get canDrillDown() {
    return this.displayMode === 'regions' &&
      (this.region === 'world' ||
      this.region === '021' || // North America
      this.region === '005' || // South America
      this.region === '150' || // Europe
      this.region === '142' || // Asia
      this.region === '009' || // Oceania
      this.region === '002'); // Africa
  }
}
