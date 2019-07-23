import { IllegalUploadComponent } from './illegal-upload.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('IllegalUploadComponent', () => {

  let fix: ComponentFixture<IllegalUploadComponent>,
  el: DebugElement,
  comp: any,
  modalState: any;

  beforeEach(async(() => {

  TestBed.configureTestingModule({
    declarations: [IllegalUploadComponent],
    schemas: [NO_ERRORS_SCHEMA]
  })
  .compileComponents()
  .then(() => {
    fix = TestBed.createComponent(IllegalUploadComponent);
    el = fix.debugElement;
    comp = el.componentInstance;
  });
  }));

  it('renders a placeholder for an illegal file', () => {
    comp.file = {label: 'Mylabel', filename: 'Thefile.name'};
    fix.detectChanges();
    expect(el.nativeElement.textContent).toMatch(/Mylabel/);
    expect(el.nativeElement.textContent).toMatch(/Thefile.name/);
    expect(el.nativeElement.textContent).toMatch(/Segment not in template/);
    expect(el.query(By.css('.icon-cancel'))).not.toBeNull();
  });

});
