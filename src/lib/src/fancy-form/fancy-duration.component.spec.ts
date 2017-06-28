import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdvancedConfirmDirective } from './advanced-confirm.directive';
import { ModalService } from '../modal/modal.service';
import { PadZeroPipe } from './padzero.pipe';
import { FancyDurationComponent } from './fancy-duration.component';

@Component({
  selector: 'test-component',
  template: `<prx-fancy-duration #fancy [model]="model" [name]="name"></prx-fancy-duration>`
})
class TestComponent {
  model: any;
  name: string;
  @ViewChild('fancy') fancy: FancyDurationComponent;
}
describe('FancyDurationComponent', () => {
  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancedConfirmDirective, PadZeroPipe, FancyDurationComponent, TestComponent],
      imports: [FormsModule],
      providers: [{provide: ModalService}]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(TestComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
    });
  }));

  it('parses seconds to HH:MM:SS', () => {
    comp.model = {foobar: 84716, original: {}};
    comp.name = 'foobar';
    fix.detectChanges();
    expect(comp.fancy.total).toEqual(84716);
    expect(comp.fancy.hours).toEqual(23);
    expect(comp.fancy.minutes).toEqual(31);
    expect(comp.fancy.seconds).toEqual(56);
  });

  it('detects changes for each subfield', () => {
    comp.model = {foobar: 84716, original: {foobar: 84716}};
    comp.name = 'foobar';
    fix.detectChanges();
    expect([comp.fancy.hoursChanged, comp.fancy.minutesChanged, comp.fancy.secondsChanged]).toEqual([false, false, false]);

    comp.model.foobar = 23 * 60 * 60;
    fix.detectChanges();
    expect([comp.fancy.hoursChanged, comp.fancy.minutesChanged, comp.fancy.secondsChanged]).toEqual([false, true, true]);

    comp.model.foobar = 31 * 60 + 56;
    fix.detectChanges();
    expect([comp.fancy.hoursChanged, comp.fancy.minutesChanged, comp.fancy.secondsChanged]).toEqual([true, false, false]);
  });

  it('sets from subfields', () => {
    comp.model = {foobar: 0, original: {}, set: (f: string, v: any) => comp.model[f] = v};
    comp.name = 'foobar';
    fix.detectChanges();
    comp.fancy.set('hours', 1);
    expect(comp.model.foobar).toEqual(3600);
    comp.fancy.set('minutes', 61);
    expect(comp.model.foobar).toEqual(7260);
    comp.fancy.set('seconds', 52);
    expect(comp.model.foobar).toEqual(7312);
    comp.fancy.set('seconds', -2);
    expect(comp.model.foobar).toEqual(7260);
  });

});
