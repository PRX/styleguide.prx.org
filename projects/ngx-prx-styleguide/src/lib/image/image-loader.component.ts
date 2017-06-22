import { Component, Input, ElementRef, OnChanges } from '@angular/core';
import { HalDoc } from '../hal/doc/haldoc';

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
    this.element.nativeElement.style['background-image'] = `url(${src})`;
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

  ngOnChanges() {
    if (!this.src) {
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
