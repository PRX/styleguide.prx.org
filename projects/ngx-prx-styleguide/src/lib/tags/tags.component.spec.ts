import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TagsComponent } from './tags.component';

@Component({
  selector: 'test-component',
  template: `
    <prx-tags [selected]="testSelected" [options]="testOptions" (change)="setTestOutput($event)"> </prx-tags>
  `
})
class TestComponent {
  testSelected: any = [];
  testOptions: any[] = [];
  testOutput: any = undefined;
  setTestOutput(val: any) {
    this.testOutput = val;
  }
}

describe('TagsComponent', () => {
  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let tags: TagsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, NgSelectModule, TooltipModule],
      declarations: [TestComponent, TagsComponent]
    })
      .compileComponents()
      .then(() => {
        fix = TestBed.createComponent(TestComponent);
        comp = fix.componentInstance;
        de = fix.debugElement;
        el = de.nativeElement;
        tags = de.query(By.directive(TagsComponent)).componentInstance;
      });
  }));

  it('defaults to no quick tags', () => {
    expect(de.query(By.css('.quick_tags'))).toBeNull();
  });

  it('show quick tags', () => {
    comp.testOptions = ['hello'];
    fix.detectChanges();
    expect(de.query(By.css('.quick_tags'))).not.toBeNull();
  });

  it('create quick tags', () => {
    comp.testOptions = ['hello', 'there', 'world'];
    fix.detectChanges();
    expect(de.query(By.css('.quick_tags-tag'))).not.toBeNull();
    expect(de.query(By.css('.quick_tags')).children.length).toBe(3);
  });

  it('should select quick tag matching a selected values', () => {
    comp.testOptions = ['hello', 'there', 'world'];
    comp.testSelected = ['hello'];
    fix.detectChanges();
    const selected = de.query(By.css('.quick_tags-tag.selected'));
    expect(selected).not.toBeNull();
    expect(selected.nativeNode.textContent).toContain('hello');
  });

  it('should toggle selected quick tag value on click', () => {
    comp.testOptions = ['hello'];
    fix.detectChanges();
    let qt = de.query(By.css('.quick_tags-tag'));
    jest.spyOn(comp, 'setTestOutput').mockImplementation(() => {});
    qt.nativeElement.click();
    expect(comp.setTestOutput).toHaveBeenCalled();
    expect(comp.setTestOutput).toHaveBeenCalledWith(['hello']);
    expect(tags.selected).toEqual(['hello']);
    qt.nativeElement.click();
    expect(comp.setTestOutput).toHaveBeenCalled();
    expect(comp.setTestOutput).toHaveBeenCalledWith([]);
    expect(tags.selected).toEqual([]);
  });

  it('transforms string options', () => {
    comp.testOptions = ['hello', 'there', 'world'];
    fix.detectChanges();
    expect(tags.quickTags).toEqual([
      { name: 'hello', value: 'hello' },
      { name: 'there', value: 'there' },
      { name: 'world', value: 'world' }
    ]);
  });

  it('transforms array options', () => {
    comp.testOptions = [['hello', 'hi'], 'there', ['world', 'earth']];
    fix.detectChanges();
    expect(tags.quickTags).toEqual([
      { name: 'hello', value: 'hi' },
      { name: 'there', value: 'there' },
      { name: 'world', value: 'earth' }
    ]);
  });

  it('preserves object options', () => {
    comp.testOptions = [{ name: 'foo', value: 'bar', tooltip: 'tooltip' }, 'there', ['world', 'earth']];
    fix.detectChanges();
    expect(tags.quickTags).toEqual([
      { name: 'foo', value: 'bar', tooltip: 'tooltip' },
      { name: 'there', value: 'there' },
      { name: 'world', value: 'earth' }
    ]);
  });
});
