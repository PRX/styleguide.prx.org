import { Component, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef } from '@angular/core';
import * as C3 from 'c3';

import { TimeseriesChartModel } from '../models/timeseries-chart.model';
import { LegendItemModel } from '../models/legend-item.model';

@Component({
  moduleId: module.id,
  selector: 'prx-stacked-bar-timeseries-chart',
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
export class StackedBarTimeseriesChartComponent implements OnChanges {
  @Input() datasets: TimeseriesChartModel[];
  @Input() secondaryDatasets: TimeseriesChartModel[];
  @Input() dateFormat: string;
  @Output() onLabelClick: EventEmitter<{}> = new EventEmitter();

  chart: any;
  @ViewChild('chart') private chartElement: ElementRef;

  xDateKeys: any;
  xDates: any[][];
  columnData: any[][];
  groups: string[];
  colors: string[];

  legendItems: LegendItemModel[];
  secondaryItems: LegendItemModel[];

  ngOnChanges() {
    if (this.datasets) {
      this.xDateKeys = {};
      this.xDates = [];
      this.columnData = [];
      this.groups = [];
      this.colors = [];
      this.legendItems = [];

      this.datasets.forEach((dataset, index) => {
        this.xDateKeys[dataset.label] = 'x' + index;
        this.xDates.push([this.xDateKeys[dataset.label],
          ...(dataset.data.map(datum => datum.date))
        ]);
        this.columnData.push([dataset.label, ...(dataset.data.map(datum => datum.value))]);
        this.groups.push(dataset.label);
        this.colors.push(dataset.color);

        let total = 0;
        dataset.data.forEach(datum => total += datum.value);
        this.legendItems[index] = new LegendItemModel(dataset.label, dataset.color, total);
      });

      if (this.secondaryDatasets) {
        this.secondaryItems = [];

        this.secondaryDatasets.forEach((dataset, index) => {
          this.xDateKeys[dataset.label] = 'x' + (this.datasets.length + index);
          this.xDates.push([this.xDateKeys[dataset.label],
            ...(dataset.data.map(datum => datum.date))
          ]);
          this.columnData.push([dataset.label, ...(dataset.data.map(datum => datum.value))]);
          this.groups.push(dataset.label);
          this.colors.push(dataset.color);

          let total = 0;
          dataset.data.forEach(datum => total += datum.value);
          this.secondaryItems[index] = new LegendItemModel(dataset.label, dataset.color, total);
        });
      }

      let config = {
        data: {
          type: 'bar',
          xs: this.xDateKeys,
          xFormat: this.dateFormat ? this.dateFormat : '%Y-%m-%d',
          columns: [...this.xDates , ...this.columnData],
          groups: [this.groups],
          order: <string> null
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: this.dateFormat ? this.dateFormat : '%Y-%m-%d', // TODO playback dateFormat '%H:%M:%S',
            }
          }
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
