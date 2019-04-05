import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { CalpickerComponent } from './calpicker.component';
import { SimpleDate } from './simpledate';

fdescribe('Component: CalpickerComponent', () => {
  let comp: CalpickerComponent;
  let fix: ComponentFixture<CalpickerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  const config = {declarations: [CalpickerComponent]};
  beforeEach(async(() => {
    TestBed.configureTestingModule(config).compileComponents().then(() => {
      fix = TestBed.createComponent(CalpickerComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
      comp.ngAfterViewInit();
    });
  }));

  it('should have a defined component', () => {
    expect(comp).toBeDefined();
  });

  it('selects dates', () => {
    expect(comp.options.events).toEqual([]);
    comp.onSelect(new Date(2019, 2, 12));
    comp.onSelect(new Date(2019, 2, 15));
    comp.onSelect(new Date(2019, 0, 1));
    expect(comp.options.events).toEqual([
      'Tue Jan 01 2019',
      'Tue Mar 12 2019',
      'Fri Mar 15 2019',
    ]);
  });

  it('deselects dates', () => {
    comp.onSelect(new Date(2019, 2, 12));
    comp.onSelect(new Date(2019, 2, 15));
    comp.onSelect(new Date(2019, 0, 1));
    comp.onSelect(new Date(2019, 2, 15));
    comp.onSelect(new Date(2019, 0, 1));
    expect(comp.options.events).toEqual([
      'Tue Mar 12 2019',
    ]);
  });

  it('inputs simple dates', () => {
    comp.dates = [new SimpleDate('2019-01-01'), new SimpleDate('2019-03-12')];
    fix.detectChanges();
    expect(comp.options.events).toEqual([
      'Tue Jan 01 2019',
      'Tue Mar 12 2019',
    ]);
  });

  it('sorts when the selection changes', () => {
    comp.dates = [
      new SimpleDate('2019-03-12'),
      new SimpleDate('2019-01-01'),
    ];
    fix.detectChanges();
    expect(comp.options.events).toEqual([
      'Tue Mar 12 2019',
      'Tue Jan 01 2019',
    ]);

    comp.onSelect(new Date(2019, 1, 15));
    expect(comp.options.events).toEqual([
      'Tue Jan 01 2019',
      'Fri Feb 15 2019',
      'Tue Mar 12 2019',
    ]);
  });

  it('emits when dates are selected', () => {
    spyOn(comp.datesChange, 'emit').and.stub();
    comp.onSelect(new Date(2019, 2, 12));
    expect(comp.datesChange.emit).toHaveBeenCalled();
  });

});
