import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { TimeseriesChartComponent } from './timeseries-chart.component';

describe('TimeseriesChartComponent', () => {
  let comp: TimeseriesChartComponent;
  let fix: ComponentFixture<TimeseriesChartComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeseriesChartComponent],
      schemas:      [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(TimeseriesChartComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('should create a chart when given a non empty dataset', () => {
    expect(comp.chart).toBeUndefined();
    comp.datasets = [];
    comp.ngOnChanges();
    expect(comp.chart).toBeUndefined();
    comp.datasets = [{data: [{value: 9, date: new Date().valueOf()}], label: 'foo', color: '#000'}];
    comp.ngOnChanges();
    let data = comp.chart.data();
    expect(data.length).toEqual(1);
    expect(data[0].id).toEqual('foo');
  });
});
