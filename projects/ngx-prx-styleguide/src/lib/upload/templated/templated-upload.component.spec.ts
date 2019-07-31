import { TemplatedUploadComponent } from './templated-upload.component';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HalService } from '../../hal/hal.service';
import { MockHalService } from '../../hal/mock/mock-hal.service';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';

@Pipe({name: 'duration'})
class DurationStubPipe implements PipeTransform {
  transform(val: any): any {
    return `${val}`;
  }
}

let mockHal: MockHalService;
describe('TemplatedUploadComponent', () => {

  let fix;
  let el;
  let comp;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        {provide: HalService, useValue: mockHal}
      ],
      declarations: [TemplatedUploadComponent, DurationStubPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
    .then(() => {
      fix = TestBed.createComponent(TemplatedUploadComponent);
      el = fix.debugElement;
      comp = el.componentInstance;
    });
  }));

  it('renders a file', () => {
    const {label, filename} = {label: 'Mylabel', filename: 'Thefile.name'}
    comp.file = {label, filename};
    fix.detectChanges();
    expect(el.nativeElement.textContent).toMatch(new RegExp(label));
    expect(el.nativeElement.textContent).toMatch(new RegExp(filename));
    expect(el.query(By.css('.icon-cancel'))).not.toBeNull();
  });

  it('renders a template', () => {
    const label = 'Tpl Label';
    comp.template = {label};
    fix.detectChanges();
    expect(el.nativeElement.textContent).toMatch(new RegExp(label));
    expect(el.query(By.css('.icon-cancel'))).toBeNull();
    expect(el.query(By.css('publish-audio-input'))).not.toBeNull();
  });

  it('shows template duration requirements', () => {
    const {min, max} = {min: 3, max: 5}
    comp.template = {lengthMinimum: min, lengthMaximum: max};
    fix.detectChanges();
    expect(el.nativeElement.textContent).toMatch(new RegExp(`Length between ${min} and ${max}`));
    comp.template = {lengthMinimum: min};
    fix.detectChanges();
    expect(el.nativeElement.textContent).toMatch(new RegExp(`Length greater than ${min}`));
    comp.template = {lengthMaximum: max};
    fix.detectChanges();
    expect(el.nativeElement.textContent).toMatch(new RegExp(`Length less than ${max}`));
  });

  it('hides destroyed files', () => {
    const {fileLabel,tplLabel} = {fileLabel: 'thefile', tplLabel: 'thetemplate'}
    comp.file = {label: fileLabel};
    comp.template = {label: tplLabel};
    fix.detectChanges();
    expect(el.nativeElement.textContent).toMatch(new RegExp(fileLabel));
    expect(el.nativeElement.textContent).not.toMatch(new RegExp(tplLabel));
    comp.file.isDestroy = true;
    fix.detectChanges();
    expect(el.nativeElement.textContent).not.toMatch(new RegExp(fileLabel));
    expect(el.nativeElement.textContent).toMatch(new RegExp(tplLabel));
  });
});
