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
    jest.spyOn(comp.dateChange, 'emit').mockImplementation(() => {});
    comp.picker.setDate('02/17/2017');
    fix.detectChanges();
    expect(comp.dateChange.emit).toHaveBeenCalled();
  });

  it('emits dateChanged event when date is entered', () => {
    jest.spyOn(comp.dateChange, 'emit').mockImplementation(() => {});
    comp.setWhenValid('02/17/2017');
    fix.detectChanges();
    expect(comp.dateChange.emit).toHaveBeenCalled();
  });

  it('should update date on valid date entry', () => {
    const date = new Date('02/01/2018');
    comp.setWhenValid('02/01/2018');
    expect(comp.date.valueOf()).toEqual(date.valueOf());
    expect((comp.picker.getDate().valueOf())).toEqual(date.valueOf());
  });

  it('should update date in UTC mode on valid date entry', () => {
    comp.UTC = true;
    comp.date = new Date(Date.UTC(2018, 0, 1)); // '01/01/2018'
    const date = new Date(Date.UTC(2018, 1, 2, 0, 0, 0)); // '02/02/2018'
    comp.setWhenValid('02/02/2018');
    expect(comp.date.valueOf()).toEqual(date.valueOf());
    expect((comp.picker.getDate().valueOf())).toEqual(comp.pickerUTCOffset(date).valueOf());
  });

  it('should have CSS class invalid if entry is not valid date', fakeAsync(() => {
    fix.detectChanges();
    comp.input.nativeElement.value = 'abc';
    comp.input.nativeElement.dispatchEvent(new Event('input'));
    tick();
    fix.detectChanges();
    expect(de.query(By.css('input.invalid'))).not.toBeNull();
  }));

  it('should update date picker to reflect changes to @Input() date', () => {
    comp.date = new Date();
    comp.date.setHours(0);
    comp.date.setMinutes(0);
    comp.date.setSeconds(0);
    comp.date.setMilliseconds(0);
    fix.detectChanges();
    expect(comp.picker.getDate().valueOf()).toEqual(comp.date.valueOf());
    comp.date = new Date(comp.date.valueOf() - 24 * 60 * 60 * 1000);
    fix.detectChanges();
    expect(comp.picker.getDate().valueOf()).toEqual(comp.date.valueOf());
  });

  it('should update date picker in UTC mode to reflect changes to @Input() date', () => {
    comp.date = new Date(Date.UTC(2018, 1, 1));
    comp.UTC = true;
    comp.date.setHours(0);
    comp.date.setMinutes(0);
    comp.date.setSeconds(0);
    comp.date.setMilliseconds(0);
    fix.detectChanges();
    expect(comp.picker.getDate().valueOf()).toEqual(comp.date.valueOf());
    comp.date = new Date(comp.date.valueOf() - 24 * 60 * 60 * 1000);
    fix.detectChanges();
    expect(comp.picker.getDate().valueOf()).toEqual(comp.date.valueOf());
  });

  it('should preserve time portion of date value', () => {
    comp.date = new Date();
    fix.detectChanges();
    const hours = comp.date.getHours();
    const minutes = comp.date.getMinutes();
    const seconds = comp.date.getSeconds();
    const milliseconds = comp.date.getMilliseconds();
    comp.setDate(new Date(2017, 1, 17, 0, 0, 0));
    expect(comp.date.getFullYear()).toEqual(2017);
    expect(comp.date.getMonth()).toEqual(1);
    expect(comp.date.getDate()).toEqual(17);
    expect(comp.date.getHours()).toEqual(hours);
    expect(comp.date.getMinutes()).toEqual(minutes);
    expect(comp.date.getSeconds()).toEqual(seconds);
    expect(comp.date.getMilliseconds()).toEqual(milliseconds);
  });

  it('should support displaying UTC date', () => {
    comp.date = new Date(Date.UTC(2017, 0, 1, 0, 0, 0));
    comp.UTC = true;
    fix.detectChanges();
    expect(comp.picker.getDate().getDate()).toEqual(1);
  });

  it('should support formatting the date', () => {
    comp.format = 'YYYY-MM-DD';
    comp.setDate(new Date(2018, 0, 1, 0, 0, 0));
    fix.detectChanges();
    expect(comp.input.nativeElement.value).toEqual('2018-01-01');
  });
});
