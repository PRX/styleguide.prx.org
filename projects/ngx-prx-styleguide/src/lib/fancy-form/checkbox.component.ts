import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

const isset = (val: any): boolean => {
  return val !== false
      && val !== undefined
      && val !== '0'
      && val !== 0;
};

@Component({
  selector: 'prx-checkbox',
  styleUrls: ['checkbox.component.css'],
  template: `
    <label [class.focused]="focused"
           [class.checked]="checked"
           [class.mousedown]="mousedown"
           [class.disabled]="isDisabled"
           [class.small]="small"
           (click)="onClick($event)"
           (mousedown)="onMouseDown($event, inputEl)"
           (mouseout)="onMouseOut($event)">
      <ng-content></ng-content>
      <input #inputEl
             type="checkbox"
             (focus)="onFocus()"
             (blur)="onBlur()"
             [checked]="checked"
             [disabled]="isDisabled"
             (keydown)="onKeyDown($event)"
             (keyup)="onKeyUp($event)"/>
      <span class="checkmark" [style.background-color]="dynamicColor"></span>
    </label>
  `
})

export class CheckboxComponent {

  focused = false;
  mousedown = false;

  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() change = new EventEmitter<boolean>();

  @Input() disabled: any;
  @Input() color = '#ff9600';

  _small = false;
  @Input()
  set small(small: boolean) { this._small = isset(small); }
  get small() { return this._small; }

  onClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.isDisabled) {
      this.mousedown = false;
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
      this.change.emit(this.checked);
    }
  }

  // bind state events
  onMouseDown(event: Event, el: HTMLElement) { this.mousedown = true; el.focus(); }
  onMouseOut(event: Event) { this.mousedown = false; this.focused = false; }
  onKeyDown(event: KeyboardEvent) { if (event.key === 'Space' || event.keyCode === 32) { this.mousedown = true; } }
  onKeyUp(event: KeyboardEvent) { if (event.key === 'Space' || event.keyCode === 32) { this.mousedown = false; } }
  onFocus() { this.focused = true; }
  onBlur() { this.focused = false; }

  get isDisabled() {
    if ([undefined, false, null, '0', 'false'].indexOf(this.disabled) > -1) {
      return 0;
    } else {
      return this.disabled;
    }
  }

  get dynamicColor(): string {
    if (this.checked) {
      if (this.mousedown) {
        return this.shade(this.color, 0.2);
      } else if (this.focused) {
        return this.shade(this.color, 0.1);
      } else  {
        return this.color;
      }
    } else {
      return null;
    }
  }

  private shade(color: string, percent: number): string {
    color = color.replace('#', '');
    let r = this.shadeHex(color.substring(0, 2), percent);
    let g = this.shadeHex(color.substring(2, 4), percent);
    let b = this.shadeHex(color.substring(4, 6), percent);
    return `#${r}${g}${b}`;
  }

  private shadeHex(hex: string, percent: number): string {
    let shaded = parseInt(hex, 16) * (1 - percent);
    shaded = Math.round(shaded);
    shaded = (shaded > 255) ? 255 : shaded;
    shaded = (shaded < 0) ? 0 : shaded;
    let shadedHex = shaded.toString(16);
    return (shadedHex.length === 1) ? `0${shadedHex}` : shadedHex;
  }

}
