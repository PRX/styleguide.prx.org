import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { CategoryChartComponent } from './category-chart.component';

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
    comp.data = [{value: 9, label: 'foo'}];
    comp.ngOnChanges();
    let data = comp.chart.data();
    let categories = comp.chart.categories();
    expect(data.length).toEqual(1);
    expect(data[0].values[0].value).toEqual(9);
    expect(categories.length).toEqual(1);
    expect(categories[0]).toEqual('foo');
  });
});
