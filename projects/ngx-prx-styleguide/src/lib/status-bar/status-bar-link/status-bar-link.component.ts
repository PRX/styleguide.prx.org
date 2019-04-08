import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'a[prx-status-bar-link]',
  templateUrl: './status-bar-link.component.html',
  styleUrls: ['./status-bar-link.component.scss']
})
export class StatusBarLinkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isElementProvided(elm: ElementRef) {
    console.log(elm);
    return elm && !!elm.nativeElement.innerHtml().trim();
  }

}
