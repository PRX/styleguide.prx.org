import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import * as C3 from 'c3';
import { IndexedChartModel } from '../models/indexed-chart.model';

@Component({
  moduleId: module.id,
  selector: 'prx-line-indexed-chart',
  template: `<div #chart></div>`,
  styleUrls: ['../chart.css']
})
export class LineIndexedChartComponent implements OnChanges {
  @Input() datasets: IndexedChartModel[];

  chart: any;
  @ViewChild('chart') el: ElementRef;

  columnData: any[][];
  colors: string[];

  ngOnChanges() {
    if (this.datasets) {
      this.columnData = [];
      this.colors = [];

      this.datasets.forEach((dataset) => {
        this.columnData.push([dataset.label, ...dataset.data]);
        this.colors.push(dataset.color);
      });

      let config = {
        data: {
          type: 'line',
          columns: this.columnData,
          order: <string> null
        },
        // TODO: format should be an Input()
        axis: {
          x: {
            type: 'category',
            tick: {
              format: (s: any) => `day ${s}`
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
