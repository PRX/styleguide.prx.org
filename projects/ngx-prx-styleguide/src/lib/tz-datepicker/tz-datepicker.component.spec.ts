import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TzDatepickerComponent } from './tz-datepicker.component';
import { NO_ERRORS_SCHEMA, ViewChild, Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of as observableOf } from 'rxjs';
import * as moment from 'moment-timezone'
import { By } from '@angular/platform-browser';
import { TzDataService } from './tz-data.service';

describe('TzDatepickerComponent', () => {
  let component: TzDatepickerComponent;
  let fixture: ComponentFixture<TzDatepickerComponent>;
  let de: DebugElement;
  let dateChangeStub;
  const testDate = new Date(Date.UTC(2018, 2, 16, 2, 0, 0, 0));
  const testTz = 'America/New_York';

  const momentZones = {
    zones: [
      'America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0',
      'America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0'
    ],
    links: [],
    version: '2018g'
  };

  TzDataService.prototype.fetchTzs = jest.fn(() => observableOf(momentZones))

  beforeEach(async(() => {
    jest.spyOn(moment.tz, 'guess').mockImplementation(() => testTz);

    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [TzDatepickerComponent],
      providers: [TzDataService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TzDatepickerComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;

        component.date = testDate;
        component.changed = false;
        dateChangeStub = jest.spyOn(component.dateChange, 'emit').mockImplementation(() => {});

        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Returns the appropriate date', () => {
    expect(component.date).toEqual(testDate);
  });

  it('Initializes the date model correctly', () => {
    const newDateModel = component.modelFromDate(testDate);
    expect(newDateModel.pickerDate).toEqual(testDate);
    expect(newDateModel.tz).toEqual(testTz);
    // 2:00AM UTC === 10PM EST
    expect(newDateModel.time).toEqual('22:00:00');
    expect(newDateModel.meridiem).toBeNull();
  });

  it('Initializes the time for browsers with no time support', () => {
    component.supportsTimeInput = false;
    const newDateModel = component.modelFromDate(testDate);
    // 2:00AM UTC === 10PM EST
    expect(newDateModel.time).toEqual('10:00:00');
    expect(newDateModel.meridiem).toEqual('PM');
  });

  it(`Emits dateChanged when valid`, () => {
    const testTimestamp = '12:34:56';
    const [hr, min, sec] = testTimestamp.split(':').map(el => parseInt(el, 10));
    const input = de.query(By.css('input[type="time"]'));
    input.nativeElement.value = testTimestamp;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.triggerEventHandler('change', {});

    const expectedDate = moment
      .tz(testDate, testTz)
      .hours(hr)
      .minutes(min)
      .seconds(sec)
      .toDate();
    expect(dateChangeStub).toHaveBeenCalledWith(expectedDate);
  });

  it('Calls handleChange when time input is modified', () => {
    const handleChangeSpy = jest.spyOn(component, 'handleChange');
    const input = de.query(By.css('input[type="time"]'));
    input.nativeElement.value = 'a';
    input.triggerEventHandler('ngModelChange', {});
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it(`Doesn't emit dateChanged while invalid`, () => {
    const input = de.query(By.css('input[type="time"]'));
    input.nativeElement.value = 'a';
    input.nativeElement.dispatchEvent(new Event('input'));
    input.triggerEventHandler('change', {});
    expect(dateChangeStub).not.toHaveBeenCalled();
  });

  it(`Emits dateChanged when valid`, () => {
    const testTimestamp = '12:34:56';
    const [hr, min, sec] = testTimestamp.split(':').map(el => parseInt(el, 10));
    const input = de.query(By.css('input[type="time"]'));
    input.nativeElement.value = testTimestamp;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.triggerEventHandler('change', {});

    const expectedDate = moment
      .tz(testDate, testTz)
      .hours(hr)
      .minutes(min)
      .seconds(sec)
      .toDate();
    expect(dateChangeStub).toHaveBeenCalledWith(expectedDate);
  });

  it(`Updates the model when date is set`, () => {
    const newTestDate = new Date(testDate.getTime() + 24 * 60 * 60 * 1000)
    const modelSetSpy = jest.spyOn(component, 'modelFromDate')
    expect(modelSetSpy).not.toHaveBeenCalled();
    expect(component.model.finalDate.getTime()).toBe(testDate.getTime());
    component.date = newTestDate;
    expect(modelSetSpy).toHaveBeenCalledTimes(1);
    expect(modelSetSpy).toHaveBeenCalledWith(newTestDate);
    expect(component.model.finalDate.getTime()).toBe(newTestDate.getTime());
    expect(dateChangeStub).not.toHaveBeenCalled();
  });
});
