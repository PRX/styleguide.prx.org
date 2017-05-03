import { Component, Input, OnChanges, Inject, ElementRef } from '@angular/core';
import * as C3 from 'c3';

@Component({
  selector: 'prx-stacked-bar-category-rotated',
  template: ``
})
export class StackedBarCategoryRotatedChartComponent implements OnChanges {
  @Input() groups: string[];
  @Input() categories: string[];
  @Input() data: number[][];
  @Input() percent: boolean;

  chart: any;
  el: ElementRef;

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    this.el = elementRef;
  }

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
