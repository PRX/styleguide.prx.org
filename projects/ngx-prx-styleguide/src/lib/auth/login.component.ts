import { Component, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AuthService } from './auth.service';
import { AuthParser } from './auth-parser';

@Component({
  moduleId: module.id,
  selector: 'prx-login',
  styles: [`
    :host { width: 100%; }
    iframe { width: 100%; display: block; height: 170px; border: 0 none; }
  `],
  template: `
    <iframe *ngIf="iframeUrl" [src]="iframeUrl" (load)="checkLogin()"></iframe>
  `
})

export class LoginComponent implements OnInit {

  @Output() success = new EventEmitter<void>();
  @Output() failure = new EventEmitter<string>();

  iframeUrl: SafeResourceUrl;
  private isInitialLoad = true;

  constructor(
    private element: ElementRef,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.newIframeUrl();
  }

  newIframeUrl() {
    let url = this.authService.url('login');
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  setAuthToken(token: string) {
    this.authService.setToken(token);
  }

  checkLogin() {
    // until the iframe successfully logs in and redirects, we're just going
    // to get errors trying to access the cross-origin frame
    try {
      let query = AuthParser.parseIframeQuery(this.element);
      if (query) {
        this.setAuthToken(AuthParser.parseToken(query));
        this.success.emit();
      }
    } catch (e) {
      if (this.isInitialLoad) {
        this.isInitialLoad = false;
      } else {
        this.failure.emit('Invalid username or password');

        // TODO: the form has disappeared on POST, so render another one. This
        // causes any field values to disappear, which is not ideal.
        this.isInitialLoad = true;
        this.newIframeUrl();
      }
    }
  }

}
