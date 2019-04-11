import { Component, ElementRef, ViewChild, ChangeDetectorRef, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'a[prx-status-bar-link]',
  templateUrl: './status-bar-link.component.html',
  styleUrls: ['./status-bar-link.component.scss']
})
export class StatusBarLinkComponent {

  private showIcon: boolean = true;
  private showImage: boolean = true;
  private showText: boolean = true;

  @HostBinding('class.align-art--right') private alignArtRight: boolean = false;

  @ViewChild('icon') private icon: ElementRef;
  @ViewChild('image') private image: ElementRef;
  @ViewChild('text') private text: ElementRef;

  @Input()
  set alignArt(val: string) {
    this.alignArtRight = val && val.toLowerCase()  === 'right';
  }
  get alignArt() {
    return this.alignArtRight ? 'right' : 'left';
  }

  constructor(private cdRef:ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.showIcon = this.isElementProvided(this.icon);
    this.showImage = this.isElementProvided(this.image);
    this.showText = this.isElementProvided(this.text);
    this.cdRef.detectChanges();
  }

  isElementProvided(elm: ElementRef) {
    return elm.nativeElement && Array.from(elm.nativeElement.childNodes).filter((node: Node) => node.nodeName !== '#comment').length > 0;
  }

}
