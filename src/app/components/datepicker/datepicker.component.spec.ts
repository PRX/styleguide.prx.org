import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import * as Pikaday from 'pikaday';

import {DatepickerComponent} from './datepicker.component';

describe('Component: DatepickerComponent', () => {
  let comp: DatepickerComponent;
  let fix: ComponentFixture<DatepickerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(DatepickerComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;

      comp.ngAfterViewInit();
    });
  }));

  it('should have a defined component', () => {
    expect(comp).toBeDefined();
  });

  it('should create a `Pikaday` instance', () => {
    expect(comp.picker instanceof Pikaday).toBe(true);
  });

  it('emits dateChanged event when date is selected', () => {
    spyOn(comp.dateChange, 'emit').and.stub();
    comp.picker.setDate('02/17/2017');
    fix.detectChanges();
    expect(comp.dateChange.emit).toHaveBeenCalled();
  });

  it('emits dateChanged event when date is entered', () => {
    spyOn(comp.dateChange, 'emit').and.stub();
    comp.setWhenValid('02/17/2017');
    fix.detectChanges();
    expect(comp.dateChange.emit).toHaveBeenCalled();
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
