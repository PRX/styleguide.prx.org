import { Component, Input, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'prx-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  private _color: string;
  @Input()
  set color(val: string) {
    const color = val && val.trim().toLowerCase();
    if (this._color) {
      this.renderer.removeClass(this.el.nativeElement, `color--${this._color}`);
    }
    if (color) {
      this.renderer.addClass(this.el.nativeElement, `color--${color}`);
    }
    this._color = color;
  }
  get color() {
    return this._color;
  }

  @Input()
  set size(val: string) {
    this.width = val;
    this.height = val;
  }
  get size() {
    return this.width;
  }

  private _name: string;
  @Input()
  set name(val: string) {
    this._name = val && val.replace(/\.svg/i, '');
  }
  get name() {
    return this._name;
  }

  @HostBinding('style.width') width: string;
  @HostBinding('style.height') height: string;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  get removedSVGAttributes() {
    return this._color ? ['style', 'fill'] : [];
  }

  get svgFilePath() {
    return this.name && `../../assets/images/icons/${this._name}.svg`;
  }
}
