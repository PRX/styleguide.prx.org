import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import * as C3 from 'c3';

@Component({
  moduleId: module.id,
  selector: 'prx-stacked-bar-category-rotated',
  template: `<div #chart></div>`,
  styleUrls: ['../chart.css']
})
export class StackedBarCategoryRotatedChartComponent implements OnChanges {
  @Input() groups: string[];
  @Input() categories: string[];
  @Input() data: number[][];
  @Input() percent: boolean;

  chart: any;
  @ViewChild('chart') el: ElementRef;

  ngOnChanges() {
    if (this.data && this.groups && this.categories) {
      let config = {
        data: {
          type: 'bar',
          rows: [
            this.groups,
            ...this.data
          ],
          groups: [this.groups],
          order: <string> null
        },
        axis: {
          rotated: true,
          x: {
            type: 'category',
            categories: this.categories
          }
        },
        legend: {
          show: false
        },
        color: {
          pattern: ['#e53D00', '#ea7317', '#ffa500', '#f7ca45', '#fff275', '#e2e2e2']
        },
        bindto: this.el.nativeElement
      };

      if (this.percent) {
        config['axis']['y'] = {
          max: 100,
          padding: {top: 0, bottom: 0},
          tick: {
            format: (y: number) => y + '%'
          }
        };
      }

      this.chart = C3.generate(config);
    }
  }
}
