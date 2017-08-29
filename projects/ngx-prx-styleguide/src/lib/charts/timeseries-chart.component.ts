import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import * as C3 from 'c3';

import { TimeseriesChartModel } from './models/timeseries-chart.model';
import { ChartType } from './models/chart-type.type';
import { ChartOrder } from './models/chart-order.type';

@Component({
  moduleId: module.id,
  selector: 'prx-timeseries-chart',
  template: `<div #chart></div>`,
  styleUrls: ['./chart.css']
})

export class TimeseriesChartComponent implements OnChanges {
  @Input() type: ChartType = 'line';
  @Input() order: ChartOrder = null;
  @Input() stacked = false;
  @Input() datasets: TimeseriesChartModel[];
  @Input() formatX: Function | string;

  chart: any;
  @ViewChild('chart') el: ElementRef;

  xDateKeys: any;
  xDates: any[][];
  columnData: any[][];
  groups: string[];
  colors: string[];

  ngOnChanges() {
    if (this.datasets && this.datasets.length > 0) {
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
        this.colors.push(dataset.color);

        if (this.stacked) {
          this.groups.push(dataset.label);
        }
      });

      let config = {
        data: {
          type: this.type,
          xs: this.xDateKeys,
          columns: [...this.xDates , ...this.columnData],
          order: <string> this.order
        },
        legend: {
          show: false
        },
        color: {
          pattern: this.colors
        },
        bindto: this.el.nativeElement
      };

      if (this.stacked) {
        config.data['groups'] = [this.groups];
      }

      if (this.formatX) {
        config.data['xFormat'] = this.formatX;
        config['axis'] = {
          x: {
            type: 'timeseries',
            tick: {
              format: this.formatX,
            }
          }
        };
      }

      this.chart = C3.generate(config);
    }
  }

  focusChartData(dataId: string) {
    if (this.chart) {
      this.chart.focus(dataId);
    }
  }
}
