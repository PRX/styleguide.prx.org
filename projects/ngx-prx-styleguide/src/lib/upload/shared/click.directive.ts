import {Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[prxClick]'
})
export class ClickDirective {
  @Input() prxClick: HTMLElement;

  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event']) click(ev: MouseEvent) {
    if (!this.defaultClickable(ev)) {
      const fileInput = this.el.nativeElement.querySelector('input[type=file]');
      if (fileInput) {
        fileInput.click();
      }
    }
    ev.stopPropagation();
  }

  defaultClickable(ev: MouseEvent) {
    // don't do anything if default behavior does it already
    return ['LABEL', 'BUTTON', 'INPUT'].indexOf(ev.target['tagName']) > -1 || ev.target['className'] === 'icon-cancel';
  }
}
