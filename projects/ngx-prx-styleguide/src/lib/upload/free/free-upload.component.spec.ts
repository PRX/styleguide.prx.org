import { FreeUploadComponent } from './free-upload.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FreeUploadComponent', () => {

  let fix: ComponentFixture<FreeUploadComponent>,
  el: DebugElement,
  comp: any;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [FreeUploadComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
    .then(() => {
      fix = TestBed.createComponent(FreeUploadComponent);
      el = fix.debugElement;
      comp = el.componentInstance;
    });
  }));

  it('renders a movable uploaded file', () => {
    const { label, filename } = {
      label: 'Mylabel',
      filename: 'Thefile.name'
    }
    comp.file = {
      label,
      filename,
      changed: () => false,
      invalid: () => false
    };
    fix.detectChanges();
    expect(
      el.query(By.css('input')).nativeElement.getAttribute('ng-reflect-model')
    ).toBe(label);
    expect(el.nativeElement.textContent).toMatch(new RegExp(filename));
    expect(el.query(By.css('.icon-menu'))).not.toBeNull();
    expect(el.query(By.css('.icon-cancel'))).not.toBeNull();
  });

  it('has an editable label', () => {
    comp.file = {
      label: 'Mylabel',
      filename: 'Thefile.name',
      changed: () => false,
      invalid: () => false,
      set: (k, v) => comp.file[k] = v
    };
    fix.detectChanges();
    let input = el.query(By.css('input')).nativeElement;
    const newVal = 'New value'
    input.value = newVal;
    input.dispatchEvent(new Event('input'));
    fix.detectChanges();
    expect(comp.file.label).toEqual(newVal);
    expect(
      el.query(By.css('input')).nativeElement.getAttribute('ng-reflect-model')
    ).toBe(newVal);
  });

});
