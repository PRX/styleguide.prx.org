import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TzDatepickerComponent } from './tz-datepicker.component';
import { NO_ERRORS_SCHEMA, ViewChild, Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import moment from 'moment';
import 'moment-timezone/moment-timezone'
import { By } from '@angular/platform-browser';
import { TzDataService } from './tz-data.service';

@Component({
  selector: 'test-component',
  template: `<prx-tz-datepicker #datepicker (dateChange)="dateChange($event)" [date]="date" [changed]="changed"></prx-tz-datepicker>`
})

class TestComponent {
  @ViewChild('datepicker') datepicker: TzDatepickerComponent;
  date = new Date(1410719000000)
  changed = false;
  dateChangeVal: Date;
  dateChange(val: Date) { this.dateChangeVal = val; }
}

describe('TzDatepickerComponent', () => {
  let component: TzDatepickerComponent;
  let fixture: ComponentFixture<TzDatepickerComponent>;
  let de: DebugElement;
  let dateChangeStub;
  let fetchTzsSpy;
  const testDate = new Date(Date.UTC(2018, 2, 16, 2, 0, 0, 0))
  const testTz = 'America/New_York'

  const momentZones = {
    zones : [
      'America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0',
      'America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0'
    ],
    links : [],
    version : '2018g'
  }

  beforeEach(async(() => {
    spyOn(moment.tz, 'guess').and.callFake(() => testTz)
    const tzDataService = jasmine.createSpyObj('TzDataService', ['fetchTzs']);
    fetchTzsSpy = tzDataService.fetchTzs.and.returnValue(of(momentZones));

    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ TzDatepickerComponent, TestComponent ],
      providers: [
        { provide: TzDataService, useValue: tzDataService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TzDatepickerComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement;

      component.date = testDate
      component.changed = false
      dateChangeStub = spyOn(component.dateChange, 'emit').and.stub()

      fixture.detectChanges()
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Returns the appropriate date', () => {
    expect(component.date).toEqual(testDate)
  })

  it('Initializes the date model correctly', () => {
    const newDateModel = component.tzDateModelInit()
    expect(newDateModel.pickerDate).toEqual(testDate)
    expect(newDateModel.tz).toEqual(testTz)
    // 2:00AM UTC === 10PM EST
    expect(newDateModel.time).toEqual('22:00:00')
    expect(newDateModel.meridiem).toBeNull
  });

  it('Initializes the time for browsers with no time support', () => {
    component.supportsTimeInput = false
    const newDateModel = component.tzDateModelInit()
    // 2:00AM UTC === 10PM EST
    expect(newDateModel.time).toEqual('10:00:00')
    expect(newDateModel.meridiem).toEqual('PM')
  });

  it(`Emits dateChanged when valid`, () => {
    const testTimestamp = '12:34:56'
    const [hr,min,sec] = testTimestamp.split(':').map(el => parseInt(el))
    const input = de.query(By.css('input[type="time"]'))
    input.nativeElement.value = testTimestamp
    input.nativeElement.dispatchEvent(new Event('input'))
    input.triggerEventHandler('change', {})

    const expectedDate = moment.tz(testDate, testTz)
      .hours(hr).minutes(min).seconds(sec).toDate()
    expect(dateChangeStub).toHaveBeenCalledWith(expectedDate)
  })

  it('Calls handleChange when time input is modified', () => {
    const handleChangeSpy = spyOn(component, 'handleChange')
    const input = de.query(By.css('input[type="time"]'))
    input.nativeElement.value = 'a'
    input.triggerEventHandler('change', {})
    expect(handleChangeSpy).toHaveBeenCalled()
  })

  it(`Doesn't emit dateChanged while invalid`, () => {
    const input = de.query(By.css('input[type="time"]'))
    input.nativeElement.value = 'a'
    input.nativeElement.dispatchEvent(new Event('input'))
    input.triggerEventHandler('change', {})
    expect(dateChangeStub).not.toHaveBeenCalled()
  })

  it(`Emits dateChanged when valid`, () => {
    const testTimestamp = '12:34:56'
    const [hr,min,sec] = testTimestamp.split(':').map(el => parseInt(el))
    const input = de.query(By.css('input[type="time"]'))
    input.nativeElement.value = testTimestamp
    input.nativeElement.dispatchEvent(new Event('input'))
    input.triggerEventHandler('change', {})

    const expectedDate = moment.tz(testDate, testTz)
      .hours(hr).minutes(min).seconds(sec).toDate()
    expect(dateChangeStub).toHaveBeenCalledWith(expectedDate)
  })
});