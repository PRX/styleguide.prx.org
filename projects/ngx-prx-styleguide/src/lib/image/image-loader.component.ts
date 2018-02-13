import { Component, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { HalDoc } from '../hal/doc/haldoc';

const PLACEHOLDER = 'url("data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=")';

@Component({
  moduleId: module.id,
  selector: 'prx-image',
  template: `
    <img *ngIf="src" [src]="src" (load)="onLoad()" (error)="onError()"/>
  `,
  styleUrls: ['./image-loader.component.css']
})

export class ImageLoaderComponent implements OnChanges {
  @Input() public src: string;
  @Input() public imageDoc: HalDoc;

  constructor(private element: ElementRef) {}

  setBackgroundImage(src: string) {
    if (src) {
      this.element.nativeElement.style['background-image'] = `url(${src})`;
    } else {
      this.element.nativeElement.style['background-image'] = PLACEHOLDER;
    }
  }

  setPlaceholder(isError: boolean) {
    if (isError) {
      this.element.nativeElement.classList.add('placeholder-error');
    } else {
      this.element.nativeElement.classList.add('placeholder');
    }
  }

  onLoad = () => this.setBackgroundImage(this.src);

  onError = () => this.setPlaceholder(true);

  ngOnChanges(changes: SimpleChanges) {
    if (changes.imageDoc) {
      this.src = null;
      this.setBackgroundImage(null);
    }
    if (!this.src && this.imageDoc) {
      if (this.imageDoc.has('prx:image')) {
        this.imageDoc.follow('prx:image').subscribe(
          img => this.src = img.expand('enclosure'),
          err => this.setPlaceholder(true)
        );
      } else {
        this.setPlaceholder(false);
      }
    }
  }

}
