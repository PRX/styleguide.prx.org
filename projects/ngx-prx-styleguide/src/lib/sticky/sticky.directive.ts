import { Directive, ElementRef, OnInit, HostBinding, HostListener, Inject, Input, OnDestroy } from '@angular/core';
import { DOCUMENT} from '@angular/common';
import * as Stickyfill from 'stickyfilljs';
import { StickyService } from './sticky.service';

@Directive({
  selector: '[prxSticky]'
})
export class StickyDirective implements OnInit, OnDestroy {

  private previousTop: number;
  stuckHeight: number;
  el: any;

  @HostBinding('class.js-stuck') isStuck = false;
  @HostBinding('style.position') position: string = this.getStickyProp();
  @HostBinding('style.top') top = '0';

  _offset = 0;
  @Input('sticky-offset')
  set offset(val: string) {
    this._offset = parseInt(val, 10) || 0;
  }
  get offset() {
    return this._offset.toString();
  }

  _group: string;
  @Input('prxSticky')
  set group(val: string) {
    this._group = val;
  }
  get group () {
    return this._group;
  }

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: any,
    private sticky: StickyService
  ) {
    this.el = element.nativeElement;

    // Apply pollyfill for IE 11.
    Stickyfill.addOne(this.el);
  }

  ngOnInit() {
    // Initialize previous top value for first scroll event.
    this.previousTop = this.el.getBoundingClientRect().top || 0;

    // Establish unset group offset.
    this.sticky.initGroup(this._group);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Only update when sticky is supported.
    if (this.position !== 'static') {
      this.updateStickyOffset();
    }
  }

  ngOnDestroy() {
    // Clean up after any stuck elements.
    if (this.isStuck) {
      this.unstick();
    }
  }

  updateStickyOffset() {
    const currentRect = this.el.getBoundingClientRect();

    // Set unstuck elements top to global offset.
    if (!this.isStuck) {
      this.top = `${this.sticky.getOffset(this.group) + this._offset}px`;
    }

    // Check if element is now stuck.
    // Consider element stuck if it didn't change top position since last scroll.
    if (currentRect.top === this.previousTop && !this.isStuck) {
      this.stick(currentRect);
    } else if (currentRect.top !== this.previousTop && this.isStuck) {
      this.unstick();
    }

    this.previousTop = currentRect.top;
  }

  private stick(rect: ClientRect) {
    // When stuck...
    // Keep track of elements height when it was stuck.
    this.stuckHeight = rect.height + this._offset;
    // Add element height to global sticky offset.
    this.sticky.addOffset(this.stuckHeight, this._group);
    // Add CSS class.
    this.isStuck = true;
  }

  private unstick() {
    // When not stuck...
    // If was stuck, subtract stored height from global sticky offset.
    this.sticky.removeOffset(this.stuckHeight, this._group);
    // Remove CSS class
    this.isStuck = false;
  }

  private getStickyProp() {
    let stickyProp: string;
    const prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
    const test = document.head.style;
    for (let i = 0; i < prefix.length; i += 1) {
      test.position = `${prefix[i]}sticky`;
    }
    stickyProp = test.position ? test.position : 'static';
    test.position = '';
    return stickyProp;
  }

}
