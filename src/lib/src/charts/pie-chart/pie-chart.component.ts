import { Component, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef } from '@angular/core';
import * as C3 from 'c3';

import { IndexedChartModel } from '../models/indexed-chart.model';
import { LegendItemModel } from '../models/legend-item.model';

@Component({
  moduleId: module.id,
  selector: 'prx-pie-chart',
  template: `
    <div #chart class="chart-with-legend"></div>
    <prx-legend class="legend"
      [items]="legendItems"
      [secondaryItems]="secondaryItems"
      (focus)="focusChartData($event)"
      (onLabelClick)="onLabelClick.emit($event)"></prx-legend>
  `,
  styleUrls: ['../chart.css']
})
export class PieChartComponent implements OnChanges {
  @Input() datasets: IndexedChartModel[];
  @Input() secondaryDatasets: IndexedChartModel[];
  @Output() onLabelClick: EventEmitter<{}> = new EventEmitter();

  chart: any;
  @ViewChild('chart') private chartElement: ElementRef;

  columnData: any[][];
  colors: string[];

  legendItems: LegendItemModel[];
  secondaryItems: LegendItemModel[];

  ngOnChanges() {
    if (this.datasets) {
      this.legendItems = [];
      this.columnData = [];
      this.colors = [];

      this.datasets.forEach((dataset, index) => {
        let total = 0;
        dataset.data.forEach(datum => total += datum);
        this.legendItems[index] = new LegendItemModel(dataset.label, dataset.color, total);

        this.columnData.push([dataset.label, ...dataset.data]);
        this.colors.push(dataset.color);
      });

      if (this.secondaryDatasets) {
        this.secondaryItems = [];

        this.secondaryDatasets.forEach((dataset, index) => {
          let total = 0;
          dataset.data.forEach(datum => total += datum);
          this.secondaryItems[index] = new LegendItemModel(dataset.label, dataset.color, total);

          this.columnData.push([dataset.label, ...dataset.data]);
          this.colors.push(dataset.color);
        });
      }

      let config = {
        data: {
          type: 'pie',
          columns: this.columnData,
        },
        legend: {
          show: false
        },
        color: {
          pattern: this.colors
        },
        bindto: this.chartElement.nativeElement
      };

      this.chart = C3.generate(config);
    }
  }

  focusChartData(dataId: string) {
    if (this.chart) {
      this.chart.focus(dataId);
    }
  }
}
