import { Component, Input, OnChanges, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as C3 from 'c3';
import { IndexedChartModel } from '../models/indexed-chart.model';
import { LegendItemModel } from '../models/legend-item.model';

@Component({
  selector: 'prx-line-indexed-chart',
  template: `
    <div #chart class="chart-with-legend"></div>
    <section class="legend">
      <select #selectOption class="legend-options" *ngIf="options" (change)="onSelectOption($event.target.value)">
        <option disabled selected>Select Episodes to Chart</option>
        <option *ngFor="let o of options" [value]="o">{{o}}</option>
      </select>
      <prx-legend removable="true"
        [items]="legendItems"
        (remove)="onSelectOption($event)"
        [secondaryItems]="secondaryItems"
        (focus)="focusChartData($event)"
        (onLabelClick)="onLabelClick.emit($event)"></prx-legend>
    </section>
  `,
  styleUrls: ['../chart.css']
})
export class LineIndexedChartComponent implements OnChanges {
  @Input() datasets: IndexedChartModel[];
  @Input() secondaryDatasets: IndexedChartModel[];
  @Input() options: string[];
  @Output() onLabelClick: EventEmitter<{}> = new EventEmitter();
  @Output() toggleDataSet = new EventEmitter<string>();

  chart: any;
  @ViewChild('chart') private chartElement: ElementRef;

  columnData: any[][];
  colors: string[];

  legendItems: LegendItemModel[];
  secondaryItems: LegendItemModel[];

  @ViewChild('selectOption') private selectOption: ElementRef;

  ngOnChanges() {
    if (this.datasets) {
      this.legendItems = [];
      this.columnData = [];
      this.colors = [];

      this.datasets.forEach((dataset, index) => {
        let total = 0;
        dataset.data.forEach(datum => total += datum);
        this.legendItems[index] = new LegendItemModel(dataset.label, dataset.color, total);

        this.columnData.push([dataset.label, ...dataset.data]);
        this.colors.push(dataset.color);
      });

      if (this.secondaryDatasets) {
        this.secondaryItems = [];

        this.secondaryDatasets.forEach((dataset, index) => {
          let total = 0;
          dataset.data.forEach(datum => total += datum);
          this.secondaryItems[index] = new LegendItemModel(dataset.label, dataset.color, total);

          this.columnData.push([dataset.label, ...dataset.data]);
          this.colors.push(dataset.color);
        });
      }

      let config = {
        data: {
          type: 'line',
          columns: this.columnData
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

      if (this.selectOption) {
        this.selectOption.nativeElement.selectedIndex = 0;
      }
    }
  }

  focusChartData(dataId: string) {
    if (this.chart) {
      this.chart.focus(dataId);
    }
  }

  onSelectOption(option: string) {
    this.toggleDataSet.emit(option);
  }

}
