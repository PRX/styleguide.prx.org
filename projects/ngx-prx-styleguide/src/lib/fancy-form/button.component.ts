import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseModel } from '../model/base.model';

@Component({
  selector: 'prx-button',
  styleUrls: ['button.component.css'],
  template: `
  <div class="wrapper">
    <div class="primary">
      <button *ngIf="isVisible" [disabled]="isDisabled" [class.working]="isWorking"
        [class.orange]="orange" [class.plain]="plain" [class.red]="red" [class.green]="green"
        (click)="onClick($event)">
        <ng-content></ng-content>
        <prx-spinner *ngIf="isWorking"></prx-spinner>
      </button>
      <button *ngIf="dropdown && isVisible" type="button" class="dropdown-toggle" aria-haspopup="true"
        [class.orange]="orange" [class.plain]="plain" [class.red]="red"
        [class.green]="green" [class.open]="dropdownVisible" [attr.aria-expanded]="dropdownVisible"
        (click)="onDropdownClick($event)">
        <span>Toggle Dropdown</span>
      </button>
    </div>
    <div class="dropdown-menu">
      <ng-content *ngIf="dropdownVisible" select="div.dropdown-menu-items"></ng-content>
    </div>
    <div *ngIf="dropdown && isVisible" class="dropdown-overlay" [class.open]="dropdownVisible" (click)="onDropdownClick($event)"></div>
  </div>
  `
})

export class ButtonComponent {

  @Input() model: BaseModel;
  @Output() click = new EventEmitter<Event>();

  @Input() orange = false;
  @Input() plain = false;
  @Input() red = false;
  @Input() green = false;

  @Input() working: boolean;
  @Input() disabled: boolean;
  @Input() visible: boolean;
  @Input() dropdown: boolean;

  dropdownVisible = false;

  get isWorking() {
    if (this.working === undefined && this.model) {
      return this.model.isSaving;
    } else {
      return this.decode(this.working);
    }
  }

  get isDisabled() {
    if (this.isWorking) {
      return true;
    } else if (this.disabled === undefined && this.model) {
      return this.model.invalid();
    } else {
      return this.decode(this.disabled);
    }
  }

  get isVisible() {
    if (this.visible === undefined && this.model) {
      return this.model.changed();
    } else if (this.visible === undefined) {
      return true;
    } else {
      return this.decode(this.visible);
    }
  }

  onClick(event: Event) {
    event.stopPropagation();
    if (!this.isWorking) {
      this.click.emit(event);
    }
  }

  onDropdownClick(event: Event) {
    event.stopPropagation();
    this.dropdownVisible = !this.dropdownVisible;
  }

  private decode(val: any): any {
    if (val === '0') {
      return 0;
    } else {
      return val;
    }
  }

}
