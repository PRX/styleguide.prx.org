import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdvancedConfirmDirective } from './advanced-confirm.directive';
import { ModalService } from '../modal/modal.service';
import { FancyFieldComponent } from './fancy-field.component';
import { CapitalizePipe } from './capitalize.pipe';

@Component({
  selector: 'test-component',
  template: `<prx-fancy-field [model]="model" [name]="name" [changed]="changed" [invalid]="invalid"
                                  [textinput]="textinput" [number]="number" [textarea]="textarea" [select]="select"
                                  [label]="label" [invalidlabel]="invalidlabel" [small]="small" [required]="required"
                                  [checkbox]="checkbox "[prompt]="prompt">
    <div class="fancy-hint" *ngIf="hint">{{hint}}</div>
    <h1 *ngIf="nested">{{nested}}</h1>
    <label class="prompt" [for]="name">{{prompt}}</label>
  </prx-fancy-field>`
})
class TestComponent {
  label: string;
  small: boolean;
  required: boolean;
  hint: string;
  prompt: string;
  nested: any;
  model: any;
  name: string;
  textinput: any;
  number: any;
  textarea: any;
  select: any;
  checkbox: any;
  changed: string;
  invalid: string;
  invalidlabel: string;
}

@Component({
  selector: 'test-text-component',
  template: `<prx-fancy-field [model]="model" [name]="name" [textinput]="textinput"></prx-fancy-field>`
})
class TestTextComponent {
  model: any;
  name: string;
  textinput: any;
}

@Component({
  selector: 'test-number-component',
  template: `<prx-fancy-field [model]="model" [name]="name" [number]="number"></prx-fancy-field>`
})
class TestNumberComponent {
  model: any;
  name: string;
  number: any;
}

@Component({
  selector: 'test-textarea-component',
  template: `<prx-fancy-field [model]="model" [name]="name" [textarea]="textarea"></prx-fancy-field>`
})
class TestTextareaComponent {
  model: any;
  name: string;
  textarea: any;
}

@Component({
  selector: 'test-select-component',
  template: `<prx-fancy-field [model]="model" [name]="name" [select]="select"></prx-fancy-field>`
})
class TestSelectComponent {
  model: any;
  name: string;
  select: any;
}

describe('FancyFieldComponent', () => {
  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;

  let compText: TestTextComponent;
  let fixText: ComponentFixture<TestTextComponent>;
  let deText: DebugElement;

  let compNumber: TestNumberComponent;
  let fixNumber: ComponentFixture<TestNumberComponent>;
  let deNumber: DebugElement;

  let compTextarea: TestTextareaComponent;
  let fixTextarea: ComponentFixture<TestTextareaComponent>;
  let deTextarea: DebugElement;

  let compSelect: TestSelectComponent;
  let fixSelect: ComponentFixture<TestSelectComponent>;
  let deSelect: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TestTextComponent, TestNumberComponent, TestTextareaComponent, TestSelectComponent,
        AdvancedConfirmDirective, CapitalizePipe, FancyFieldComponent],
      imports: [FormsModule],
      providers: [{provide: ModalService}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(TestComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;

      fixText = TestBed.createComponent(TestTextComponent);
      compText = fixText.componentInstance;
      deText = fixText.debugElement;

      fixNumber = TestBed.createComponent(TestNumberComponent);
      compNumber = fixNumber.componentInstance;
      deNumber = fixNumber.debugElement;

      fixTextarea = TestBed.createComponent(TestTextareaComponent);
      compTextarea = fixTextarea.componentInstance;
      deTextarea = fixTextarea.debugElement;

      fixSelect = TestBed.createComponent(TestSelectComponent);
      compSelect = fixSelect.componentInstance;
      deSelect = fixSelect.debugElement;
    });
  }));

  it('renders a blank story field', () => {
    fix.detectChanges();
    expect(de.query(By.css('.field'))).not.toBeNull();
    expect(de.query(By.css('h1'))).toBeNull();
    expect(de.query(By.css('h3'))).toBeNull();
    expect(de.query(By.css('p.hint')).nativeElement.textContent).toEqual('');
  });

  it('renders a small label', () => {
    comp.label = 'small label';
    comp.small = true;
    fix.detectChanges();
    expect(de.query(By.css('h4 label')).nativeElement.textContent).toContain('small label');
  });

  it('renders a large label', () => {
    comp.label = 'large label';
    fix.detectChanges();
    expect(de.query(By.css('h3 label')).nativeElement.textContent).toContain('large label');
  });

  it('renders a required label', () => {
    comp.label = 'the label';
    fix.detectChanges();
    expect(de.query(By.css('label[required]'))).toBeNull();
    comp.required = true;
    fix.detectChanges();
    expect(de.query(By.css('label[required]'))).not.toBeNull();
  });

  it('renders hint content', () => {
    comp.hint = 'the hint content';
    fix.detectChanges();
    expect(de.query(By.css('p.hint')).nativeElement.textContent).toContain('the hint content');
  });

  it('renders the prompt', () => {
    comp.prompt = 'the prompt content';
    fix.detectChanges();
    expect(de.query(By.css('label.prompt')).nativeElement.textContent).toContain('the prompt content');
  });

  it('renders arbitrary nested content', () => {
    comp.nested = 'some nested content';
    fix.detectChanges();
    expect(de.query(By.css('h1')).nativeElement.textContent).toContain('some nested content');
  });

  it('can have a text field', () => {
    compText.model = {foobar: 'some value', changed: () => false, invalid: () => false};
    compText.name = 'foobar';
    compText.textinput = true;
    fixText.detectChanges();
    expect(deText.query(By.css('input')).nativeElement.getAttribute('id')).toEqual('foobar');
    expect(deText.query(By.css('input')).nativeElement.getAttribute('type')).toEqual('text');
    expect(deText.query(By.css('input')).nativeElement.getAttribute('ng-reflect-model')).toEqual('some value');
  });

  it('can have a number field', () => {
    compNumber.model = {foobar: 'some value', changed: () => false, invalid: () => false};
    compNumber.name = 'foobar';
    compNumber.number = true;
    fixNumber.detectChanges();
    expect(deNumber.query(By.css('input')).nativeElement.getAttribute('type')).toEqual('number');
    expect(deNumber.query(By.css('input')).nativeElement.getAttribute('type')).not.toEqual('checkbox');
  });

  it('can have a text area', () => {
    compTextarea.model = {foobar: 'some textarea value', changed: () => false, invalid: () => false};
    compTextarea.name = 'foobar';
    compTextarea.textarea = true;
    fixTextarea.detectChanges();
    expect(deTextarea.query(By.css('textarea')).nativeElement.getAttribute('id')).toEqual('foobar');
    expect(deTextarea.query(By.css('textarea')).nativeElement.getAttribute('ng-reflect-model')).toEqual('some textarea value');
  });

  it('can have a select', () => {
    compSelect.model = {foobar: 'theselected', changed: () => false, invalid: () => false};
    compSelect.name = 'foobar';
    fixSelect.detectChanges();
    expect(deSelect.query(By.css('prx-select')).nativeElement.getAttribute('id')).toEqual('foobar');
  });

  it('indicates changed fields', () => {
    let isChanged = false;
    comp.model = {changed: () => isChanged, invalid: () => false};
    comp.name = 'foobar';
    fix.detectChanges();
    expect(de.query(By.css('.field.changed'))).toBeNull();
    isChanged = true;
    fix.detectChanges();
    expect(de.query(By.css('.field.changed'))).not.toBeNull();
  });

  it('explicitly overrides changed fieldnames', () => {
    comp.model = {changed: (fld: string) => fld === 'somethingelse', invalid: () => false};
    fix.detectChanges();
    expect(de.query(By.css('.field.changed-explicit'))).toBeNull();
    comp.changed = 'somethingelse';
    fix.detectChanges();
    expect(de.query(By.css('.field.changed-explicit'))).not.toBeNull();
  });

  it('indicates invalid fields', () => {
    let isInvalid = '';
    comp.model = {changed: () => false, invalid: () => isInvalid};
    comp.name = 'foobar';
    fix.detectChanges();
    expect(de.query(By.css('.field.invalid'))).toBeNull();
    isInvalid = 'some message foobar something';
    fix.detectChanges();
    expect(de.query(By.css('.field.invalid'))).not.toBeNull();
    expect(de.query(By.css('p.error')).nativeElement.textContent).toContain('Some message foobar something');
  });

  it('explicitly overrides invalid fieldnames', () => {
    comp.model = {changed: false, invalid: (fld: string) => {
      return fld === 'somethingelse' ? 'some message foobar something' : '';
    }};
    fix.detectChanges();
    expect(de.query(By.css('.field.invalid-explicit'))).toBeNull();
    comp.invalid = 'somethingelse';
    fix.detectChanges();
    expect(de.query(By.css('.field.invalid-explicit'))).not.toBeNull();
    expect(de.query(By.css('p.error')).nativeElement.textContent).toContain('Some message foobar something');
  });

  it('replaces field names with labels for invalid messages', () => {
    comp.name = 'foobar';
    comp.model = {changed: () => false, invalid: () => 'some message foobar something'};
    fix.detectChanges();
    expect(de.query(By.css('p.error')).nativeElement.textContent).toContain('Some message foobar something');
    comp.label = 'New Label';
    fix.detectChanges();
    expect(de.query(By.css('p.error')).nativeElement.textContent).toContain('Some message New Label something');
    comp.invalidlabel = 'Newer Label';
    fix.detectChanges();
    expect(de.query(By.css('p.error')).nativeElement.textContent).toContain('Some message Newer Label something');
  });
});
