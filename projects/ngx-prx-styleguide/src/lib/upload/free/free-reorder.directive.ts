import { Directive, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragulaService, DragulaDirective } from 'ng2-dragula/ng2-dragula';
import { UUID } from '../service';
import { AudioVersionModel } from '../model';

@Directive({
  selector: '[prxFreeReorder]'
})
export class FreeReorderDirective extends DragulaDirective implements OnInit, OnDestroy {

  @Input() prxFreeReorder: AudioVersionModel;

  private dragSub: Subscription;

  constructor(el: ElementRef, private myDragula: DragulaService) {
    super(el, myDragula);
  }

  ngOnInit() {
    this.dragulaModel = this.prxFreeReorder.files;
    this.myDragula.setOptions(UUID.UUID(), {
      moves: (el: Element, source: Element, handle: Element) => {
        return handle.classList.contains('drag-handle');
      }
    });
    this.dragSub = this.myDragula.dropModel.subscribe(() => {
      this.prxFreeReorder.reassign();
    });
    super.ngOnInit();
  }

  ngOnDestroy() {
    if (this.dragSub) {
      this.dragSub.unsubscribe();
    }
  }

}
