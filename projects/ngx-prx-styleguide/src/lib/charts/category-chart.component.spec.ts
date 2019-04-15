import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { CategoryChartComponent } from './category-chart.component';
import * as C3 from 'c3';

describe('CategoryChartComponent', () => {
  let comp: CategoryChartComponent;
  let fix: ComponentFixture<CategoryChartComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryChartComponent],
      schemas:      [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(CategoryChartComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('should create a chart when given a non empty dataset', () => {
    expect(comp.chart).toBeUndefined();
    comp.data = [];
    comp.ngOnChanges();
    expect(comp.chart).toBeUndefined();
    const value = 9
    const label = 'foo'
    comp.data = [{value, label}];
    comp.ngOnChanges();

    expect(C3.generate).toBeCalledWith(expect.objectContaining({
      axis: expect.objectContaining({
        x: expect.objectContaining({
          categories: [label]
        })
      }),
      data: expect.objectContaining({
        columns: [["amount", value]]
      })
    }));
  });
});
