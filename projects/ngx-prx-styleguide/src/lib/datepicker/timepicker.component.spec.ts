import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Component, DebugElement, ViewChild } from '@angular/core';

import { TimepickerComponent } from './timepicker.component';

@Component({
  selector: 'test-component',
  template: `
    <prx-timepicker #timepicker [date]="date" [UTC]="UTC" (timeChange)="timeChange($event)"></prx-timepicker>
  `
})
class TestComponent {
  @ViewChild('timepicker', { static: true }) timepicker: TimepickerComponent;
  date: Date;
  UTC = false;
  timeChange(date: Date) {
    this.date = date;
  }
}

describe('Component: TimepickerComponent', () => {
  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TestComponent, TimepickerComponent]
    })
      .compileComponents()
      .then(() => {
        fix = TestBed.createComponent(TestComponent);
        comp = fix.componentInstance;
        de = fix.debugElement;
        el = de.nativeElement;
      });
  }));

  it('should have a defined component', () => {
    expect(comp).toBeDefined();
  });

  it('should have 48 options for time selection', () => {
    fix.detectChanges();
    expect(comp.timepicker.options.length).toEqual(48);
  });

  it('should emit new Date when time is selected', () => {
    comp.date = new Date('Thu Jun 01 2017 12:00:00 GMT-0500 (CDT)');
    fix.detectChanges();
    comp.timepicker.set('12:30am (CDT)');
    fix.detectChanges();
    expect(comp.date.getDate()).toEqual(1);
    expect(comp.date.getHours()).toEqual(0);
    expect(comp.date.getMinutes()).toEqual(30);
  });

  it('should show local daylight savings timezone for dates in daylight savings', () => {
    comp.date = new Date('Thu Jun 01 2017 12:00:00 GMT-0400 (EDT)');
    let localTimezone = comp.date.toString().match(/(\([A-Za-z\s].*\))/)[1];
    fix.detectChanges();
    expect(comp.timepicker.options[0].indexOf(localTimezone)).toBeGreaterThan(-1);
  });

  it('should show local standard timezone for dates in standard time', () => {
    comp.date = new Date('Sun Jan 01 2017 12:00:00 GMT-0700 (MST)');
    let localTimezone = comp.date.toString().match(/(\([A-Za-z\s].*\))/)[1];
    fix.detectChanges();
    expect(comp.timepicker.options[0].indexOf(localTimezone)).toBeGreaterThan(-1);
  });

  it('should show UTC time when picker is in UTC format', () => {
    comp.date = new Date('Sun Jan 01 2017 00:00:00 GMT');
    comp.UTC = true;
    fix.detectChanges();
    expect(comp.timepicker.time).toEqual('12:00am (GMT)');
  });
});
