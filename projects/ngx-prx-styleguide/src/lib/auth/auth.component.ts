import { Component, Input, ElementRef, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthParser } from './auth-parser';

@Component({
  selector: 'prx-auth',
  styles: ['iframe { display: none; }'],
  template: `
    <iframe *ngIf="authUrl" [src]="authUrl" (load)="checkAuth()"></iframe>
  `
})
export class AuthComponent implements OnChanges, OnDestroy {
  @Input() host: string;
  @Input() client: string;

  authUrl: SafeResourceUrl;
  private sub: Subscription;

  constructor(private element: ElementRef, private authService: AuthService, private sanitizer: DomSanitizer) {
    this.sub = authService.refresh.subscribe(() => this.generateAuthUrl());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.host || changes.client) {
      this.authService.config(this.host, this.client);
      this.generateAuthUrl();
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  generateAuthUrl() {
    if (this.host && this.client) {
      const url = this.authService.url('none');
      this.authUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      this.authUrl = null;
    }
  }

  checkAuth() {
    let query: string;
    try {
      query = AuthParser.parseIframeQuery(this.element);
    } catch (e) {
      this.authService.setError(e);
    }

    // 1st load has no query, 2nd redirect-load does
    if (query) {
      const token = AuthParser.parseToken(query);
      const error = AuthParser.parseError(query);
      if (error) {
        if (error === 'invalid_scope') {
          // authz error
          // we don't want to use setError because this error is final.
          // i.e. we don't want to prompt another login attempt.
          this.authService.failAuthorization();
        } else if (error === 'login_required') {
          // authn error
          // normal first-pass authn error which triggers login form.
          this.authService.setToken(null);
        } else {
          console.log('unexpected auth error', error);
          throw error;
        }
      }
      if (token) {
        const decoded = AuthParser.decodeToken(token);
        if (decoded && Object.keys(decoded['aur']).length === 0) {
          // token has no resources - this has replaced invalid scope
          this.authService.failAuthorization();
        } else {
          this.authService.setToken(token);
        }
      }
    }
  }
}
