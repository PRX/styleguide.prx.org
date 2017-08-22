import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import * as C3 from 'c3';

import { TimeseriesChartModel } from '../models/timeseries-chart.model';

@Component({
  moduleId: module.id,
  selector: 'prx-line-timeseries-chart',
  template: `<div #chart></div>`,
  styleUrls: ['../chart.css']
})
export class LineTimeseriesChartComponent implements OnChanges {
  @Input() datasets: TimeseriesChartModel[];
  @Input() dateFormat: string;

  chart: any;
  @ViewChild('chart') el: ElementRef;

  xDateKeys: any;
  xDates: any[][];
  columnData: any[][];
  colors: string[];

  ngOnChanges() {
    if (this.datasets) {
      this.xDateKeys = {};
      this.xDates = [];
      this.columnData = [];
      this.colors = [];

      this.datasets.forEach((dataset, index) => {
        this.xDateKeys[dataset.label] = 'x' + index;
        this.xDates.push([this.xDateKeys[dataset.label],
          ...(dataset.data.map(datum => {
            return datum.date;
          }))
        ]);
        this.columnData.push([dataset.label, ...(dataset.data.map(datum => datum.value))]);
        this.colors.push(dataset.color);
      });

      let config = {
        data: {
          type: 'line',
          xs: this.xDateKeys,
          xFormat: this.dateFormat ? this.dateFormat : '%Y-%m-%d',
          columns: [...this.xDates, ...this.columnData],
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
