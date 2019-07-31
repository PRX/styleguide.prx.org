import { AudioDurationComponent } from './audio-duration.component';
import { ModalService } from '../../modal/modal.service';
import { Pipe, PipeTransform, DebugElement } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { By } from '@angular/platform-browser';

@Pipe({name: 'duration'})
class DurationStubPipe implements PipeTransform {
  transform(val: any): any {
    return `${val}`;
  }
}
@Pipe({name: 'filesize'})
class FilesizeStubPipe implements PipeTransform {
  transform(val: any): any {
    return `${val}`;
  }
}

describe('AudioDurationComponent', () => {

  let fix: ComponentFixture<AudioDurationComponent>,
      el: DebugElement,
      comp: any,
      modalState: any;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      providers: [
        {provide: ModalService, useValue: {show: s => modalState = s}}
      ],
      declarations: [AudioDurationComponent, DurationStubPipe, FilesizeStubPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
    .then(() => {
      fix = TestBed.createComponent(AudioDurationComponent);
      el = fix.debugElement;
      comp = el.componentInstance;
    });
  }));

  it('shows duration', () => {
    const {duration, size} = {duration: 123, size: 987};
    comp.file = {duration, size};
    fix.detectChanges();
    expect(el.nativeElement.textContent).toMatch(new RegExp(duration.toString()));
    expect(el.nativeElement.textContent).not.toMatch(new RegExp(size.toString()));
    expect(el.query(By.css('button'))).toBeNull();
  });

  it('shows 0 durations', () => {
    const {duration, size} = {duration: 0, size: 987};
    comp.file = {duration, size};
    fix.detectChanges();
    expect(el.nativeElement.textContent).toMatch(new RegExp(duration.toString()));
    expect(el.nativeElement.textContent).not.toMatch(new RegExp(size.toString()))
  });

  it('shows filesize', () => {
    const {duration, size} = {duration: null, size: 987};
    comp.file = {duration, size};
    fix.detectChanges();
    expect(el.nativeElement.textContent).toMatch(new RegExp(size.toString()));
    expect(el.nativeElement.textContent).not.toMatch(/123/);
    expect(el.query(By.css('button'))).toBeNull();
  });

  it('shows neither', () => {
    comp.file = {duration: null, size: null};
    fix.detectChanges();
    expect(el.nativeElement.textContent).not.toMatch(/123/);
    expect(el.nativeElement.textContent).not.toMatch(/987/);
    expect(el.query(By.css('span'))).toBeNull();
    expect(el.query(By.css('button'))).toBeNull();
  });

  it('shows file info modal', () => {
    const {label, duration, size, frequency} = {label: 'Foo', duration: 123, size: 987, frequency: 44100};
    comp.file = {label, duration, size, frequency};
    fix.detectChanges();
    expect(el.query(By.css('button'))).not.toBeNull();
    el.query(By.css('button')).nativeElement.click();
    expect(modalState.title).toEqual(label);
    expect(modalState.body).toMatch(new RegExp(`${size} B`));
    expect(modalState.body).toMatch(/0:02:03/);
    expect(modalState.body).toMatch(/44.1 kHz/);
  });
});
