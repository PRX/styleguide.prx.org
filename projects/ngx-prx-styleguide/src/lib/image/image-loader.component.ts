import { Component, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { HalDoc } from '../hal/doc/haldoc';

@Component({
  selector: 'prx-image',
  template: `
    <img *ngIf="src" [src]="src" (load)="onLoad()" (error)="onError()" />
    <img *ngIf="docSrc" [src]="docSrc" (load)="onLoad()" (error)="onError()" />
  `,
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent implements OnChanges {
  @Input() public src: string;
  @Input() public imageDoc: HalDoc;
  public docSrc: string;

  @HostBinding('style.background-image') background: string;
  @HostBinding('class.placeholder') isPlaceholder = false;
  @HostBinding('class.placeholder-error') isError = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.src) {
      this.reset();
    } else if (changes.imageDoc) {
      this.reset();
      const hasNull = this.imageDoc && this.imageDoc['_embedded'] && this.imageDoc['_embedded'] === null;
      if (this.imageDoc && this.imageDoc.has('prx:image') && !hasNull) {
        this.imageDoc.follow('prx:image').subscribe(
          img => (this.docSrc = img.expand('enclosure')),
          err => {
            // bit hacky, but catch 404s
            if (err.message && err.message.match(/got 404 from/i)) {
              this.isPlaceholder = true;
            } else {
              this.isError = true;
            }
          }
        );
      } else if (this.imageDoc) {
        this.isPlaceholder = true;
      }
    }
  }

  onLoad() {
    this.background = `url(${this.src || this.docSrc})`;
  }

  onError() {
    this.isError = true;
  }

  reset() {
    this.background = null;
    this.isPlaceholder = false;
    this.isError = false;
    this.docSrc = null;
  }
}
