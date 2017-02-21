import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import * as Pikaday from 'pikaday';

import {DatepickerComponent} from './datepicker.component';

describe('Component: DatepickerComponent', () => {
  let comp: DatepickerComponent;
  let fix: ComponentFixture<DatepickerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent]
    });

    fix = TestBed.createComponent(DatepickerComponent);
    comp = fix.componentInstance;
    de = fix.debugElement;
    el = de.nativeElement;

    comp.ngAfterViewInit();
  });

  it('should have a defined component', () => {
    expect(comp).toBeDefined();
  });

  it('should create a `Pikaday` instance', () => {
    expect(comp.picker instanceof Pikaday).toBe(true);
  });

  it('should have CSS class changed when date is selected', () => {
    comp.picker.setDate('02/17/2017');
    fix.detectChanges();
    expect(de.query(By.css('input.changed'))).not.toBeNull();
  });

  it('should have CSS class changed when date is entered', () => {
    comp.setWhenValid('02/17/2017');
    fix.detectChanges();
    expect(de.query(By.css('input.changed'))).not.toBeNull();
  });

  it('should have CSS class invalid if entry is not valid date', fakeAsync(() => {
    fix.detectChanges();
    comp.input.nativeElement.value = 'abc';
    comp.input.nativeElement.dispatchEvent(new Event('input'));
    tick();
    fix.detectChanges();
    expect(de.query(By.css('input.invalid'))).not.toBeNull();
  }));
});
