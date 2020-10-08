import { Component, DebugElement } from '@angular/core';
import { Subject } from 'rxjs';
import { FreeReorderDirective } from './free-reorder.directive';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DragulaService } from 'ng2-dragula';

@Component({
  template: '<div [prxFreeReorder]="version"></div>'
})
class MiniComponent {
  version: any;
}

describe('FreeReorderDirective', () => {
  let fix: ComponentFixture<MiniComponent>, el: DebugElement, comp: any;
  let dropped = new Subject<any>();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DragulaService,
          useValue: { find: () => null, add: () => null, createGroup: () => null, dropModel: dropped }
        }
      ],
      declarations: [MiniComponent, FreeReorderDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fix = TestBed.createComponent(MiniComponent);
        el = fix.debugElement;
        comp = el.componentInstance;
      });
  }));

  it('triggers reordering', () => {
    let reassigned = false;
    comp.version = { reassign: () => (reassigned = true) };
    fix.detectChanges();
    dropped.next({});
    expect(reassigned).toEqual(true);
  });
});
