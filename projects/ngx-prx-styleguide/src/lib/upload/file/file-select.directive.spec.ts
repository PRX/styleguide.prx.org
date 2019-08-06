import { Component, Output, EventEmitter, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { FileSelectDirective } from './file-select.directive';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

@Component({
  template: '<input prxFileSelect (file)="add($event)" />'
})
class MiniComponent {
  @Output() changes = new EventEmitter();
  add(file: any) {
    this.changes.emit(file);
  }
}

const triggerChange = (el: Element) => {
  let e = document.createEvent('HTMLEvents');
  e.initEvent('change', false, true);
  el.firstChild.dispatchEvent(e);
};

describe('FileSelectDirective', () => {
  let fix: ComponentFixture<MiniComponent>,
      el: DebugElement,
      comp: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MiniComponent, FileSelectDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents()
    .then(() => {
      fix = TestBed.createComponent(MiniComponent);
      el = fix.debugElement;
      comp = el.componentInstance;
    });
  }));

  it('listens for file changes', () => {
    jest.spyOn(FileSelectDirective.prototype, 'onChange').mockImplementation(() => null);
    triggerChange(el.nativeElement);
    expect(FileSelectDirective.prototype.onChange).toHaveBeenCalled();
  });

  // TODO: JSDOM related failure
  xit('processes files individually', (done) => {
    let values = ['foo', 'bar', 'hello'];
    jest.spyOn(FileSelectDirective.prototype, 'getFiles').mockImplementation(() => values);

    let index = 0;
    comp.changes.subscribe((data: any) => {
      expect(data).toEqual(values[index++]);
      if (index >= values.length) { done(); }
    });
    triggerChange(el.nativeElement);
  });

});
