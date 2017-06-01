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
    let query = AuthParser.parseIframeQuery(this.element);

    // 1st load has no query, 2nd redirect-load does
    if (query) {
      let token = AuthParser.parseToken(query);
      this.authService.setToken(token);
    }
  }

}
