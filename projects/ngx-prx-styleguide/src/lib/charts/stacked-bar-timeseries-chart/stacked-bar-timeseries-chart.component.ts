import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import * as C3 from 'c3';

import { TimeseriesChartModel } from '../models/timeseries-chart.model';

@Component({
  moduleId: module.id,
  selector: 'prx-stacked-bar-timeseries-chart',
  template: `<div #chart></div>`,
  styleUrls: ['../chart.css']
})
export class StackedBarTimeseriesChartComponent implements OnChanges {
  @Input() datasets: TimeseriesChartModel[];
  @Input() dateFormat: string;

  chart: any;
  @ViewChild('chart') el: ElementRef;

  xDateKeys: any;
  xDates: any[][];
  columnData: any[][];
  groups: string[];
  colors: string[];

  ngOnChanges() {
    if (this.datasets) {
      this.xDateKeys = {};
      this.xDates = [];
      this.columnData = [];
      this.groups = [];
      this.colors = [];

      this.datasets.forEach((dataset, index) => {
        this.xDateKeys[dataset.label] = 'x' + index;
        this.xDates.push([this.xDateKeys[dataset.label],
          ...(dataset.data.map(datum => datum.date))
        ]);
        this.columnData.push([dataset.label, ...(dataset.data.map(datum => datum.value))]);
        this.groups.push(dataset.label);
        this.colors.push(dataset.color);
      });

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
        bindto: this.el.nativeElement
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
