import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'prx-status-bar-text',
  templateUrl: './status-bar-text.component.html',
  styleUrls: ['./status-bar-text.component.scss']
})
export class StatusBarTextComponent implements OnInit {

  private classIsUsed = (val: any) => val === '' || !!val;

  @HostBinding('class.text--bold') _isBold: boolean = false;
  @HostBinding('class.text--italic')_isItalic: boolean = false;
  @HostBinding('class.text--uppercase')_isUppercase: boolean = false;
  @HostBinding('class.layout--stretch')_isStretch: boolean = false;

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

  ngOnInit() {
  }

}
