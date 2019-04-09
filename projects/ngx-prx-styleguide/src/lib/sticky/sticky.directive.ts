import { Directive, ElementRef, OnInit, HostBinding, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import * as Stickyfill from 'stickyfilljs';

let globalStickyOffset: number;
const stickyOffsets: any = {
  all: 0
};

@Directive({
  selector: '[prxSticky]'
})
export class StickyDirective implements OnInit {

  private previousTop: number;
  stuckHeight: number;
  el: any;

  @HostBinding('class.js-stuck') isStuck: boolean = false;
  @HostBinding('style.position') position: string = 'sticky';
  @HostBinding('style.top') top: string;

  _offset: number = 0;
  @Input('sticky-offset')
  set offset(val: string) {
    this._offset = parseInt(val) || 0;
  }
  get offset() {
    return this._offset.toString();
  }

  _group: string = 'global';
  @Input('prxSticky')
  set group(val: string) {
    this._group = val || 'global';
  }
  get group () {
    return this._group;
  }

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.el = element.nativeElement;

    // Apply pollyfill for IE 11.
    Stickyfill.addOne(this.el);
  }

  ngOnInit() {
    stickyOffsets.all = 0;
    stickyOffsets[this.group] = 0;
    this.previousTop = this.el.getBoundingClientRect().top || 0;
  }

  ngAfterViewInit() {
    this.updateStickyOffset();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateStickyOffset();
  }

  updateStickyOffset() {
    const currentRect = this.el.getBoundingClientRect();

    // Set unstuck elements top to global offset.
    if (!this.isStuck) {
      this.top = `${stickyOffsets.all + stickyOffsets[this.group] + this._offset}px`;
    }

    // Check if element is now stuck.
    if (currentRect.top === this.previousTop && !this.isStuck) {
      // When stuck...
      // Keep track of elements height when it was stuck.
      this.stuckHeight = currentRect.height + this._offset;
      // Add element height to global sticky offset.
      stickyOffsets[this.group] += this.stuckHeight;
      // Add CSS class.
      this.isStuck = true;
    }
    else if (currentRect.top !== this.previousTop && this.isStuck) {
      // When not stuck...
      // If was stuck, subtract element height from global sticky offset.
      stickyOffsets[this.group] -= this.stuckHeight;
      // Remove CSS class
      this.isStuck = false;
    }

    this.previousTop = currentRect.top;
  }

}
