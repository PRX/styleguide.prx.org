import { AudioStateComponent } from './audio-state.component';
import { Pipe, PipeTransform, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { By } from '@angular/platform-browser';

@Pipe({name: 'capitalize'})
class CapitalizeStubPipe implements PipeTransform {
  transform(val: any): any {
    return `${val}`;
  }
}

describe('AudioStateComponent', () => {

  let fix: ComponentFixture<AudioStateComponent>,
      el: DebugElement,
      comp: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AudioStateComponent, CapitalizeStubPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
    .then(() => {
      fix = TestBed.createComponent(AudioStateComponent);
      el = fix.debugElement;
      comp = el.componentInstance;
    });
  }));

  it('states default', () => {
    fix.detectChanges();
    expect(comp.fileState).toEqual('');
    expect(el.query(By.css('.state'))).not.toBeNull();
  });

  it('states canceled', () => {
    comp.file = {canceled: true};
    fix.detectChanges();
    expect(comp.fileState).toEqual('canceled');
    expect(el.nativeElement.textContent).toMatch(/File Deleted/);
    comp.file.isUploading = true;
    fix.detectChanges();
    expect(el.nativeElement.textContent).toMatch(/Upload Canceled/);
  });

  it('states upload errors', () => {
    const isUploadError = 'My error message';
    comp.file = {isUploadError};
    fix.detectChanges();
    expect(comp.fileState).toEqual('upload-errored');
    expect(el.nativeElement.textContent).toMatch(new RegExp(isUploadError));
  });

  it('states uploading', () => {
    comp.file = {isUploading: true, invalid: () => false};
    fix.detectChanges();
    expect(comp.fileState).toEqual('uploading');
    expect(el.nativeElement.textContent).toMatch(/Uploading/);
    expect(el.query(By.css('.meter'))).not.toBeNull();
  });

  it('states uploading with invalid message', () => {
    comp.file = {isUploading: true, invalid: () => 'something is bad'};
    fix.detectChanges();
    expect(comp.fileState).toEqual('uploading');
    expect(el.nativeElement.textContent).toMatch(/Uploading/);
    expect(el.nativeElement.textContent).toMatch(/something is bad/);
  });

  it('states process errors', () => {
    comp.file = {isProcessError: 'My error message'};
    fix.detectChanges();
    expect(comp.fileState).toEqual('process-errored');
    expect(el.nativeElement.textContent).toMatch(/My error message/);
  });

  it('states processing', () => {
    comp.file = {isProcessing: true};
    fix.detectChanges();
    expect(comp.fileState).toEqual('processing');
    expect(el.nativeElement.textContent).toMatch(/Processing/);
    expect(el.query(By.css('.meter'))).not.toBeNull();
  });

  it('states invalid', () => {
    comp.file = {invalid: () => 'something is bad'};
    fix.detectChanges();
    expect(comp.fileState).toEqual('invalid');
    expect(el.nativeElement.textContent).toMatch(/something is bad/);
  });
});
