import { Component, Self, OnChanges, SimpleChanges, Input, HostBinding } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'prx-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  providers: [ NgClass ]
})
export class IconComponent implements OnChanges {
  private _color: string;
  @Input()
  set color(val: string) {
    this._color = val && val.trim().toLowerCase();
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

  private hostClasses: { [name: string]: boolean };

  constructor(@Self() protected ngClass: NgClass) { }

  ngOnChanges(): void {
    this.hostClasses = {};

    if (!!this._color) {
      this.hostClasses[`color--${this._color}`] = true;
    }

    this.updateHostClasses();
  }

  private updateHostClasses(): void {
    this.ngClass.ngClass = this.hostClasses;
    this.ngClass.ngDoCheck();
  }

  get removedSVGAttributes() {
    return this._color ? ['style', 'fill'] : [];
  }

  get svgFilePath() {
    return this.name && `../../assets/images/icons/${this._name}.svg`;
  }

}
