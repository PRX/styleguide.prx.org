import { Component, Input, ElementRef, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth.service';
import { AuthParser } from './auth-parser';

@Component({
  moduleId: module.id,
  selector: 'prx-auth',
  styles: ['iframe { display: none; }'],
  template: `<iframe *ngIf="authUrl" [src]="authUrl" (load)="checkAuth()"></iframe>`
})

export class AuthComponent implements OnChanges, OnDestroy {

  @Input() host: string;
  @Input() client: string;

  authUrl: SafeResourceUrl;
  private sub: Subscription;

  constructor(
    private element: ElementRef,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
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
      let url = this.authService.url('none');
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
      let token = AuthParser.parseToken(query);
      let error = AuthParser.parseError(query);
      if (error) {
        if (error == 'invalid_scope') {
          // we don't want to use setError because this error is final.
          // i.e. we don't want to prompt another login attempt, because
          // the error is not with authentication, it's with authorization.
          this.authService.setToken('AUTHORIZATION_FAIL');
        } else {
          throw error;
        }
      }
      if (token) {
        this.authService.setToken(token);
      }
    }
  }

}
