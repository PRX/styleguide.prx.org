import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { TimeseriesChartComponent } from './timeseries-chart.component';
import * as C3 from 'c3';

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
    const value = 9
    const label = 'foo'
    comp.datasets = [{data: [{value, date: new Date().valueOf()}], label, color: '#000'}];
    comp.ngOnChanges();

    expect(C3.generate).toBeCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        columns: expect.arrayContaining([[label, value]])
      })
    }));
  });
});