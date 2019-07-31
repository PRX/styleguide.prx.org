import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'prx-status-bar-text',
  templateUrl: './status-bar-text.component.html',
  styleUrls: ['./status-bar-text.component.scss']
})
export class StatusBarTextComponent implements OnInit {

  @Input()
  set bold(val: any) { this._isBold = this.classIsUsed(val); }
  get bold() { return this._isBold; }

  @Input()
  set italic(val: any) { this._isItalic = this.classIsUsed(val); }
  get italic() { return this._isItalic; }

  @Input()
  set uppercase(val: any) { this._isUppercase = this.classIsUsed(val); }
  get uppercase() { return this._isUppercase; }

  @Input()
  set stretch(val: any) { this._isStretch = this.classIsUsed(val); }
  get stretch() { return this._isStretch; }

  constructor() { }

  @HostBinding('class.text--bold') _isBold = false;
  @HostBinding('class.text--italic') _isItalic = false;
  @HostBinding('class.text--uppercase') _isUppercase = false;
  @HostBinding('class.layout--stretch') _isStretch = false;

  private classIsUsed = (val: any) => val === '' || !!val;

  ngOnInit() {
  }

}
