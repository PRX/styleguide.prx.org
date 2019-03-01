import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, NO_ERRORS_SCHEMA }    from '@angular/core';

import { TagsComponent } from './tags.component';

@Component({
  selector: 'test-component',
  template: `
    <prx-tags
      [selected]="testSelected"
      [options]="testOptions"
      (onChange)="setTestOutput($event)">
    </prx-tags>
  `
})
class TestComponent {
  testSelected: any = [];
  testOptions: any[] = [];
  testOutput: any = undefined;
  setTestOutput(val: any) { this.testOutput = val; }
}

describe('TagsComponent', () => {

  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let tags: TagsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TagsComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(TestComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
      tags = de.query(By.directive(TagsComponent)).componentInstance;
    });
  }));

  it('transforms string options', () => {
    comp.testOptions = ['hello', 'there', 'world'];
    fix.detectChanges();
    expect(tags.quickTags).toEqual([
      {name: 'hello', value: 'hello'},
      {name: 'there', value: 'there'},
      {name: 'world', value: 'world'}
    ]);
  });

  it('transforms array options', () => {
    comp.testOptions = [['hello', 'hi'], 'there', ['world', 'earth']];
    fix.detectChanges();
    expect(tags.quickTags).toEqual([
      {name: 'hello', value: 'hi'},
      {name: 'there', value: 'there'},
      {name: 'world', value: 'earth'}
    ]);
  });

  it('preserves object options', () => {
    comp.testOptions = [{name: 'foo', value: 'bar', tooltip: 'tooltip'}, 'there', ['world', 'earth']];
    fix.detectChanges();
    expect(tags.quickTags).toEqual([
      {name: 'foo', value: 'bar', tooltip: 'tooltip'},
      {name: 'there', value: 'there'},
      {name: 'world', value: 'earth'}
    ]);
  });
});
