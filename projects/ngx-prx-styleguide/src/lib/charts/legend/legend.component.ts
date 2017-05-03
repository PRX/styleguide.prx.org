import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { LegendItemModel } from '../models/legend-item.model';

@Component({
  selector: 'prx-legend',
  template: `
    <prx-legend-item
      *ngFor="let item of items"
      [item]="item"
      [removable]="removable"
      (remove)="remove.emit($event)"
      (focus)="focus.emit($event)"
      (onLabelClick)="onLabelClick.emit($event)"
      [clickDisabled]="primaryClickDisabled"></prx-legend-item>
    <div *ngIf="items && secondaryItems" class="separator"></div>
    <prx-legend-item
      *ngFor="let secondaryItem of secondaryItems"
      [item]="secondaryItem"
      (focus)="focus.emit($event)"
      [clickDisabled]="secondaryClickDisabled"></prx-legend-item>
  `,
  styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnChanges {
  @Input() items: LegendItemModel[];
  @Input() secondaryItems: LegendItemModel[];
  @Input() removable: boolean;
  @Output() remove = new EventEmitter<string>();
  @Output() focus: EventEmitter<{}> = new EventEmitter();
  @Output() onLabelClick: EventEmitter<{}> = new EventEmitter();

  // TODO: why can't just detect if there is an onLabelClick event emitter callback passed to component, wtf
  primaryClickDisabled = false;
  secondaryClickDisabled = true;

  ngOnChanges() {
    this.primaryClickDisabled = this.items && this.items.length <= 1;
  }
}
