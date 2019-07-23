import { UploadComponent } from './upload.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, PipeTransform, Pipe, DebugElement } from '@angular/core';
import { HalService } from '../hal/hal.service';
import { MockHalService } from '../hal/mock/mock-hal.service';
import { By } from '@angular/platform-browser';

@Pipe({name: 'capitalize'})
class DurationStubPipe implements PipeTransform {
  transform(val: any): any {
    return `${val}`;
  }
}

let mockHal: MockHalService;
describe('UploadComponent', () => {

  let fix: ComponentFixture<UploadComponent>,
      el: DebugElement,
      comp: any;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        {provide: HalService, useValue: mockHal}
      ],
      declarations: [UploadComponent, DurationStubPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
    .then(() => {
      fix = TestBed.createComponent(UploadComponent);
      el = fix.debugElement;
      comp = el.componentInstance;
    });
  }));

  const mockVersion = (data: any = {}): any => {
    return {
      label: data.label || '',
      hasFileTemplates: data.filesAndTemplates || false,
      files: data.files || [],
      filesAndTemplates: data.filesAndTemplates || [],
      invalid: data.invalid || (() => data.invalid),
      changed: data.changed || (() => data.changed),
      nonMatchingFiles: () => false,
      status: data.status,
      statusMessage: data.statusMessage
    };
  };

  // fixture, fixture.debugElement, fixture.debugElement.componentInstance
  it('renders a default description', () => {
    comp.version = mockVersion({label: 'My Label'});
    fix.detectChanges();
    expect(el.query(By.css('header strong')).nativeElement.textContent.trim()).toBe('My Label');
    expect(el.query(By.css('header span')).nativeElement.textContent.trim()).toBe(comp.DESCRIPTIONS[comp.DESCRIPTIONS.length - 1].desc);
  });

  it('bases descriptions on the version label', () => {
    comp.version = mockVersion({label: 'Some Promos or Something'});
    expect(comp.versionDescription()).toMatch(/promotional version/i);
    comp.version = mockVersion({label: 'Video episode for my podcast'});
    expect(comp.versionDescription()).toMatch(/the video file/i);
  });

  it('lists templated uploads', () => {
    let fts = [{file: true, tpl: true}, {file: true, tpl: true}];
    comp.version = mockVersion({filesAndTemplates: fts});
    fix.detectChanges();
    expect(el.queryAll(By.css('publish-templated-upload')).length).toEqual(2);
  });

  it('lists extra/illegal templated uploads', () => {
    let fts = [{file: true, tpl: true}, {file: true, tpl: false}];
    comp.version = mockVersion({filesAndTemplates: fts});
    fix.detectChanges();
    expect(el.queryAll(By.css('publish-templated-upload')).length).toEqual(1);
    expect(el.queryAll(By.css('publish-illegal-upload')).length).toEqual(1);
  });

  it('lists free uploads', () => {
    comp.version = mockVersion({files: [{}, {}, {}]});
    fix.detectChanges();
    expect(el.queryAll(By.css('publish-free-upload')).length).toEqual(3);
  });

  it('shows invalid state and message', () => {
    comp.version = mockVersion({
      changed: () => true,
      invalid: (fld) => fld === 'self' && 'Something something something'
    });
    fix.detectChanges();
    expect(el.nativeElement.className).toContain('invalid');
    expect(el.nativeElement.textContent.trim()).toMatch(/Something something something/);
  });

  it('shows remote status messages', () => {
    let isChanged = true;
    let invalid = 'Local invalid';
    comp.version = mockVersion({
      changed: () => isChanged,
      invalid: (fld) => fld === 'self' && invalid,
      status: 'invalid',
      statusMessage: 'Remote invalid'
    });
    fix.detectChanges();
    expect(el.nativeElement.textContent.trim()).toMatch(/Local invalid/);

    invalid = null;
    fix.detectChanges();
    expect(el.nativeElement.textContent.trim()).not.toMatch(/Local invalid/);

    isChanged = false;
    fix.detectChanges();
    expect(el.nativeElement.textContent.trim()).toMatch(/Remote invalid/);
  });
});
