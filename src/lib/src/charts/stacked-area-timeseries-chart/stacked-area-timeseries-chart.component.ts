import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import * as C3 from 'c3';

import { TimeseriesChartModel } from '../models/timeseries-chart.model';

@Component({
  moduleId: module.id,
  selector: 'prx-stacked-area-timeseries-chart',
  template: `<div #chart></div>`,
  styleUrls: ['../chart.css']
})
export class StackedAreaTimeseriesChartComponent implements OnChanges {
  @Input() datasets: TimeseriesChartModel[];
  @Input() dateFormat: string;

  chart: any;
  @ViewChild('chart') el: ElementRef;

  xDateKeys: any;
  xDates: any[][];
  columnData: any[][];
  groups: string[];
  colors: string[];

  /* TODO:
  So to get rid of those ugly ass huge points,
   Array.from(document.getElementsByClassName('c3-circle')).map(function(circle) { circle.setAttribute('r','1.5')})
   However, they come back on hover...
   */
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
          type: 'area',
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
              format: this.dateFormat ? this.dateFormat : '%Y-%m-%d',
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
