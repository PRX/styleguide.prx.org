import { text } from '@storybook/addon-knobs';
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'a[prx-status-bar-link]',
  templateUrl: './status-bar-link.component.html',
  styleUrls: ['./status-bar-link.component.scss']
})
export class StatusBarLinkComponent implements OnInit {

  showIcon: boolean = true;
  showIconRight: boolean = true;
  showImage: boolean = true;
  showImageRight: boolean = true;
  showText: boolean = true;

  constructor(private cdRef:ChangeDetectorRef) { }

  @ViewChild('icon') icon: ElementRef;
  @ViewChild('image') image: ElementRef;
  @ViewChild('iconRight') iconRight: ElementRef;
  @ViewChild('imageRight') imageRight: ElementRef;
  @ViewChild('text') text: ElementRef;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.showIcon = this.isElementProvided(this.icon);
    this.showImage = this.isElementProvided(this.image);
    this.showIconRight = this.isElementProvided(this.iconRight);
    this.showImageRight = this.isElementProvided(this.imageRight);
    this.showText = this.isElementProvided(this.text);
    this.cdRef.detectChanges();
  }

  isElementProvided(elm: ElementRef) {
    console.log(elm);
    return elm.nativeElement && elm.nativeElement.childNodes.length > 0;
  }

}
