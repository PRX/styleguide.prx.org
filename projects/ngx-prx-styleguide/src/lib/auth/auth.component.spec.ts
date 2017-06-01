import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { AuthService } from './auth.service';
import { AuthComponent } from './auth.component';
import { AuthParser } from './auth-parser';

describe('AuthComponent', () => {
  let comp: AuthComponent;
  let fix: ComponentFixture<AuthComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let host: string, client: string, token: string, refresh = new Subject<boolean>();
  let authServiceStub = {
    config: (h: string, c: string) => { host = h; client = c; },
    url: () => 'http://localhost:9876/assets/callback.html',
    setToken: (t: string) => token = t,
    refresh: refresh
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [{provide: AuthService, useValue: authServiceStub}]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(AuthComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('renders the auth iframe when host and client are set', () => {
    comp.host = 'id.prx.org';
    comp.ngOnChanges(<any> {host: true, client: true});
    fix.detectChanges();
    expect(de.query(By.css('iframe'))).toBeNull();

    comp.client = 'whatev';
    comp.ngOnChanges(<any> {host: true, client: true});
    fix.detectChanges();
    let iframe = de.query(By.css('iframe'));
    expect(iframe).not.toBeNull();
    expect(iframe.nativeElement.getAttribute('src')).toEqual('http://localhost:9876/assets/callback.html');
  });

  it('does not parse tokens from blank iframe queries', () => {
    spyOn(AuthParser, 'parseIframeQuery').and.returnValue(null);
    comp.checkAuth();
    expect(token).toBeUndefined();
  });

  it('sets tokens from the iframe callback query', () => {
    spyOn(AuthParser, 'parseIframeQuery').and.returnValue('the-query');
    spyOn(AuthParser, 'parseToken').and.returnValue('the-token');
    comp.checkAuth();
    expect(token).toEqual('the-token');
  });

  it('refreshes the auth token', () => {
    spyOn(AuthParser, 'parseIframeQuery').and.returnValue('the-query');
    spyOn(AuthParser, 'parseToken').and.returnValue('the-token');
    comp.host = 'id.prx.org';
    comp.client = 'whatev';
    comp.ngOnChanges(<any> {host: true, client: true});
    fix.detectChanges();
    expect(token).toEqual('the-token');

    spyOn(comp, 'generateAuthUrl').and.stub();
    refresh.next(true);
    expect(comp.generateAuthUrl).toHaveBeenCalledTimes(1);
  });

});
