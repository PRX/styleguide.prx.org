import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { Component, DebugElement }    from '@angular/core';
import { NavUserComponent } from './navuser.component';
import { Userinfo } from '../auth/userinfo.service';

@Component({
  selector: 'test-component',
  template: `<prx-navuser [userinfo]="userinfo">
        <h1 class="user-loading">IsLoading</h1>
        <h1 class="user-loaded">IsLoaded</h1>
      </prx-navuser>`
})
class TestComponent {
  userinfo: Userinfo;
}

describe('Component: NavUserComponent', () => {

  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, NavUserComponent]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(TestComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('displays the account email', () => {
    comp.userinfo = new Userinfo();
    comp.userinfo.name = 'somebody';
    fix.detectChanges();
    expect(de.query(By.css('.nav-userinfo-menu-account')).nativeElement.textContent).toEqual('somebody');
  });

  it('displays the loaded content', () => {
    comp.userinfo = new Userinfo();
    fix.detectChanges();
    expect(el.textContent).toContain('IsLoaded');
  });

  it('displays loading content', () => {
    fix.detectChanges();
    expect(el.textContent).toContain('IsLoading');
  });

});
