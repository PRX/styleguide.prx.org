import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import * as C3 from 'c3';
import { CategoryChartModel } from './models/category-chart.model';

@Component({
  moduleId: module.id,
  selector: 'prx-category-chart',
  template: `<div #chart></div>`,
  styleUrls: ['./chart.css']
})

export class CategoryChartComponent implements OnChanges {
  @Input() data: CategoryChartModel[];
  @Input() color = '#0089bd';
  @Input() rotated = true;
  @Input() dataLabel = 'amount';

  chart: any;
  @ViewChild('chart') el: ElementRef;

  columnData: any[][];
  colors: string[];

  ngOnChanges() {
    if (this.data && this.data.length > 0) {
      this.columnData = [];
      this.colors = [];

      this.colors = [this.color];
      this.columnData = [[this.dataLabel, ...this.data.map(d => d.value)]];

      let config = {
        data: {
          type: 'bar',
          columns: this.columnData
        },
        legend: {
          show: false
        },
        color: {
          pattern: this.colors
        },
        bindto: this.el.nativeElement,
        axis: {
          x: {
            type: 'category',
            categories: this.data.map(data => data.label)
          },
          rotated: this.rotated
        }
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
