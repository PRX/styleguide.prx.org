import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { LegendItemModel } from '../models/legend-item.model';

@Component({
  moduleId: module.id,
  selector: 'prx-legend-item',
  template: `
    <div (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
      <button class="title"
        (click)="!clickDisabled && onLabelClick.emit(item.label)"
        [disabled]="clickDisabled">
        <span class="legend-arrow" [ngStyle]="{'border-right-color': item.color}"></span>
        <span class="legend" [ngStyle]="{'border-color': item.color}"></span>
        {{item.label}}
      </button>
      <span class="total">{{item.summary}}<button *ngIf="removable" (click)="remove.emit(item.label)">X</button></span>
    </div>
  `,
  styleUrls: ['./legend-item.component.css']
})
export class LegendItemComponent  {
  @Input() item: LegendItemModel;
  @Input() clickDisabled: boolean;
  @Input() removable: boolean;
  @Output() remove = new EventEmitter<string>();
  @Output() focus: EventEmitter<{}> = new EventEmitter();
  @Output() onLabelClick: EventEmitter<{}> = new EventEmitter();

  @HostListener('mouseenter') onMouseEnter() {
    this.focus.emit(this.item.label);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.focus.emit();
  }
}
