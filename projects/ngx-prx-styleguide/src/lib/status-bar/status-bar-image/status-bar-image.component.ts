import { HalDoc } from './../../hal/doc/haldoc';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'prx-status-bar-image',
  templateUrl: './status-bar-image.component.html',
  styleUrls: ['./status-bar-image.component.scss']
})
export class StatusBarImageComponent {

  protected _src: string;
  protected _imageDoc: HalDoc;
  @Input()
  set src(val: string|HalDoc) {
    this._src = null;
    this._imageDoc = null;
    if (val instanceof HalDoc) {
      this._imageDoc = val
    }
    else if (typeof val === 'string') {
      this._src = val;
    }
  }
  get src() {
    return this._src || this._imageDoc;
  }

  constructor() { }

}
