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
    this._color = val && val.toLowerCase();
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

  @Input() name: string;

  @HostBinding('style.width') protected width: string;
  @HostBinding('style.height') protected height: string;

  private hostClasses: { [name: string]: boolean };

  constructor(@Self() protected ngClass: NgClass) { }

  ngOnChanges(): void {
    this.hostClasses = {
      ...this.hostClasses,
      [`color--${this._color}`]: !!this._color
    }

    this.updateHostClasses();
  }

  private updateHostClasses(): void {
    this.ngClass.ngClass = this.hostClasses;
    this.ngClass.ngDoCheck();
  }

  private getSize(val:string) {
    
  }

  get removedSVGAttributes() {
    console.log('updating SVG attributes to remove...', this.color);
    return this._color ? ['style', 'fill'] : [];
  }

  get svgFilePath() {
    return `../../assets/images/icons/${this.name}.svg`;
  }

}
