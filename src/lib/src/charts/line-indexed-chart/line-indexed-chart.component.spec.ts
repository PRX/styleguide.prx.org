import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { LineIndexedChartComponent } from './line-indexed-chart.component';
import * as C3 from 'c3';

describe('Component: LineIndexedChartComponent', () => {
  let comp: LineIndexedChartComponent;
  let fix: ComponentFixture<LineIndexedChartComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LineIndexedChartComponent],
      schemas:      [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(LineIndexedChartComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('should have a defined component', () => {
    expect(comp).toBeDefined();
  });

  it('should create a `C3` instance', () => {
    expect(comp.chart).toBeUndefined();
    comp.datasets = [{data: [9], label: 'foo', color: '#000'}];
    comp.ngOnChanges();
    let data = comp.chart.data();
    expect(data.length).toEqual(1);
    expect(data[0].id).toEqual('foo');
  });
});
