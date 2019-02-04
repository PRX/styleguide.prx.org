import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { IndexedChartComponent } from './indexed-chart.component';

describe('IndexedChartComponent', () => {
  let comp: IndexedChartComponent;
  let fix: ComponentFixture<IndexedChartComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndexedChartComponent],
      schemas:      [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(IndexedChartComponent);
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
    comp.datasets = [{data: [9], label: 'foo', color: '#000'}];
    comp.ngOnChanges();
    let data = comp.chart.data();
    expect(data.length).toEqual(1);
    expect(data[0].id).toEqual('foo');
  });
});
