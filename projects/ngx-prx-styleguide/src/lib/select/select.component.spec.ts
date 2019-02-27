import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, NO_ERRORS_SCHEMA }    from '@angular/core';
import { SelectComponent } from './select.component';

@Component({
  selector: 'test-component',
  template: `
    <prx-select
      [selected]="testSelected"
      [options]="testOptions"
      [single]="testSingle"
      (onSelect)="setTestOutput($event)">
    </prx-select>
  `
})
class TestComponent {
  testSelected: any = [];
  testOptions: any[] = [];
  testSingle = false;
  testOutput: any = undefined;
  setTestOutput(val: any) { this.testOutput = val; }
}
describe('SelectComponent', () => {

  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let select: SelectComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, SelectComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(TestComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
      select = de.query(By.directive(SelectComponent)).componentInstance;
    });
  }));

  it('transforms string options', () => {
    comp.testOptions = ['hello', 'there', 'world'];
    fix.detectChanges();
    expect(select.ngSelectOptions).toEqual([
      {name: 'hello', value: 'hello'},
      {name: 'there', value: 'there'},
      {name: 'world', value: 'world'}
    ]);
  });

  it('transforms array options', () => {
    comp.testOptions = [['hello', 1], 'there', ['world', 3]];
    fix.detectChanges();
    expect(select.ngSelectOptions).toEqual([
      {name: 'hello', value: 1},
      {name: 'there', value: 'there'},
      {name: 'world', value: 3}
    ]);
  });

  fit('outputs array or string values', () => {
    comp.testOutput = undefined;
    comp.testSelected = ['hello'];
    comp.testOptions = ['hello'];
    fix.detectChanges();
    select.onChange();
    expect(comp.testOutput).toEqual(['hello']);
    comp.testOutput = undefined;
    comp.testSingle = true;
    comp.testSelected = 'hello'
    fix.detectChanges();
    select.onChange();
    expect(comp.testOutput).toEqual('hello');
  });

  it('filters out selected values not in options', () => {
    comp.testOutput = undefined;
    comp.testOptions = ['hello', 'goodbye'];
    comp.testSelected = ['hello'];
    fix.detectChanges();
    select.onChange();
    expect(comp.testOutput).toEqual(['hello']);
    comp.testOutput = undefined;
    comp.testSelected = ['goodbye', 'later']
    fix.detectChanges();
    select.onChange();
    expect(comp.testOutput).toEqual(['goodbye']);
  });

  it('filters out values in single selects', () => {
    comp.testSingle = true;
    comp.testOutput = undefined;
    comp.testSelected = 'hello';
    comp.testOptions = ['hello', 'goodbye'];
    fix.detectChanges();
    select.onChange();
    expect(comp.testOutput).toEqual('hello');
    comp.testOutput = undefined;
    comp.testSelected = 'later'
    fix.detectChanges();
    select.onChange();
    expect(comp.testOutput).toEqual([]);
  });
});
