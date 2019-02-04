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

  it('transforms selected into an array', () => {
    comp.testSelected = ['hello'];
    fix.detectChanges();
    expect(select.selected).toEqual(['hello']);
    comp.testSingle = true;
    comp.testSelected = 'hello';
    fix.detectChanges();
    expect(select.selected).toEqual(['hello']);
  });

  it('transforms string options', () => {
    comp.testOptions = ['hello', 'there', 'world'];
    fix.detectChanges();
    expect(select.msOptions).toEqual([
      {name: 'hello', id: 'hello'},
      {name: 'there', id: 'there'},
      {name: 'world', id: 'world'}
    ]);
  });

  it('transforms array options', () => {
    comp.testOptions = [['hello', 1], 'there', ['world', 3]];
    fix.detectChanges();
    expect(select.msOptions).toEqual([
      {name: 'hello', id: 1},
      {name: 'there', id: 'there'},
      {name: 'world', id: 3}
    ]);
  });

  it('outputs array or string values', () => {
    comp.testOutput = undefined;
    comp.testSelected = ['hello'];
    fix.detectChanges();
    select.msSelectChanged();
    expect(comp.testOutput).toEqual(['hello']);
    comp.testOutput = undefined;
    comp.testSingle = true;
    fix.detectChanges();
    select.msSelectChanged();
    expect(comp.testOutput).toEqual('hello');
  });

  it('always orders selections by options', () => {
    comp.testOptions = [['one', 1], 2, ['three', 3], ['four', 4], 5];
    comp.testSelected = [5, 2, 3];
    fix.detectChanges();
    select.msSelectChanged();
    expect(comp.testOutput).toEqual([2, 3, 5]);
  });

});
