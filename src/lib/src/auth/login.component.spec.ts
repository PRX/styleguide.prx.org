import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { AuthParser } from './auth-parser';

describe('LoginComponent', () => {
  let comp: LoginComponent;
  let fix: ComponentFixture<LoginComponent>;
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
      declarations: [LoginComponent],
      providers: [{provide: AuthService, useValue: authServiceStub}]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(LoginComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('renders the login iframe', () => {
    fix.detectChanges();
    let iframe = de.query(By.css('iframe'));
    expect(iframe).not.toBeNull();
    expect(iframe.nativeElement.getAttribute('src')).toEqual('http://localhost:9876/assets/callback.html');
  });

  it('succesfully logs in', () => {
    let loggedIn = false;
    spyOn(AuthParser, 'parseIframeQuery').and.returnValue('the-query');
    spyOn(AuthParser, 'parseToken').and.returnValue('the-token');
    comp.success.subscribe(() => loggedIn = true);
    comp.checkLogin();
    expect(token).toEqual('the-token');
    expect(loggedIn).toEqual(true);
  });

  it('fails to login', () => {
    let reason: string;
    spyOn(AuthParser, 'parseIframeQuery').and.throwError('whatev');
    comp.failure.subscribe((r: string) => reason = r);
    comp.checkLogin();

    // first attempt doesn't fail
    expect(reason).toBeUndefined();
    comp.checkLogin();
    expect(reason).toEqual('Invalid username or password');
  });

});
