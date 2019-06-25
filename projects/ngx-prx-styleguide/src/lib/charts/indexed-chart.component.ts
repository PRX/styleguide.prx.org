import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import * as C3 from 'c3';
import { IndexedChartModel } from './models/indexed-chart.model';
import { ChartType } from './models/chart-type.type';

@Component({
  selector: 'prx-indexed-chart',
  template: `<div #chart></div>`,
  styleUrls: ['./chart.css']
})

export class IndexedChartComponent implements OnChanges {
  @Input() type: ChartType = 'line';
  @Input() formatX: string | ((x: number | Date) => string | number);
  @Input() formatY: (x: number) => string;
  @Input() datasets: IndexedChartModel[];

  chart: any;
  @ViewChild('chart') el: ElementRef;

  columnData: any[][];
  colors: string[];

  ngOnChanges() {
    if (this.datasets && this.datasets.length > 0) {
      this.columnData = [];
      this.colors = [];

      this.datasets.forEach((dataset) => {
        this.columnData.push([dataset.label, ...dataset.data]);
        this.colors.push(dataset.color);
      });

      const config: C3.ChartConfiguration = {
        data: {
          type: this.type,
          columns: this.columnData
        },
        legend: {
          show: false
        },
        color: {
          pattern: this.colors
        },
        bindto: this.el.nativeElement
      };

      if (this.formatX) {
        config.axis = {
          x: {
            type: 'category',
            tick: {
              format: this.formatX
            }
          }
        };
      }

      if (this.formatY) {
        config.axis = {
          ...config.axis,
          y: {
            tick: {
              format: this.formatY
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
