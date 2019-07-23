import { Component, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { AudioCancelDirective } from './audio-cancel.directive';
import { ModalService } from '../../modal/modal.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: '<button [publishAudioCancel]="file" [version]="version" [delay]="delay"></button>'
})
class MiniComponent {
  file: any;
  version: any;
  delay = 10;
}
const getDirective = (el): AudioCancelDirective => {
  let cancelEl = el.query(By.directive(AudioCancelDirective));
  expect(cancelEl).toBeDefined();
  return cancelEl.injector.get(AudioCancelDirective);
};

describe('AudioCancelDirective', () => {
  let fix: ComponentFixture<MiniComponent>,
      el: DebugElement,
      comp: any,
      modalAlertTitle: string;

  beforeEach(async(() => {
    modalAlertTitle = null
    TestBed.configureTestingModule({
      providers: [{
        provide: ModalService,
        useValue: { confirm: (p) => modalAlertTitle = p }
      }],
      declarations: [MiniComponent, AudioCancelDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
    .then(() => {
      fix = TestBed.createComponent(MiniComponent);
      el = fix.debugElement;
      comp = el.componentInstance;
    });
  }));

  it('confirms before deleting audio', () => {
    comp.file = {canceled: false, destroy: () => true};
    comp.version = {removeUpload: () => true};
    fix.detectChanges();

    let cancel = getDirective(el);
    jest.spyOn(cancel, 'cancelAndDestroy').mockImplementation(jest.fn());
    el.query(By.css('button')).nativeElement.click();
    expect(modalAlertTitle).toMatch(/really delete/i);
  });

  it('cancels but delays deletion', (done) => {
    let destroyed = false;
    let removed = false;
    comp.file = {canceled: false, destroy: () => destroyed = true};
    comp.version = {removeUpload: () => removed = true};
    fix.detectChanges();

    let cancel = getDirective(el);
    cancel.cancelAndDestroy();
    expect(comp.file.canceled).toEqual(true);
    expect(destroyed).toEqual(false);
    expect(removed).toEqual(false);
    setTimeout(() => {
      expect(comp.file.canceled).toEqual(false);
      expect(destroyed).toEqual(true);
      expect(removed).toEqual(true);
      done();
    }, 20);
  });
});
