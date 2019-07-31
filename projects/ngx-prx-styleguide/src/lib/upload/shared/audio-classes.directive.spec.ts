import { Component, DebugElement } from '@angular/core';
import { AudioClassesDirective } from './audio-classes.directive';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { By } from '@angular/platform-browser';

@Component({
  template: '<button [prxAudioClasses]="file"></button>'
})
class MiniComponent {
  file: any;
}

describe('AudioClassesDirective', () => {
  let fix: ComponentFixture<MiniComponent>,
      el: DebugElement,
      comp: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MiniComponent, AudioClassesDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
    .then(() => {
      fix = TestBed.createComponent(MiniComponent);
      el = fix.debugElement;
      comp = el.componentInstance;
    });
  }));

  it('sets canceled state', () => {
    comp.file = {canceled: true, changed: () => false, invalid: () => false};
    fix.detectChanges();
    expect(el.query(By.css('.audio.canceled'))).not.toBeNull();
  });

  it('sets changed state', () => {
    comp.file = {changed: () => true, invalid: () => false};
    fix.detectChanges();
    expect(el.query(By.css('.audio.changed'))).not.toBeNull();
  });

  it('avoids invalid state', () => {
    comp.file = {changed: () => true, invalid: () => true};
    fix.detectChanges();
    expect(el.query(By.css('.audio.invalid'))).toBeNull();
    expect(el.query(By.css('.audio.changed'))).toBeNull();
  });

  it('marks in-progress uploads as changed', () => {
    comp.file = {isUploading: true, changed: () => false, invalid: () => false};
    fix.detectChanges();
    expect(el.query(By.css('.audio.changed'))).not.toBeNull();
  });

});
