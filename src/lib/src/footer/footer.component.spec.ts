import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let comp: FooterComponent;
  let fix: ComponentFixture<FooterComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(FooterComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('renders the footer', () => {
    expect(de.nativeElement.innerText).toContain(`You're seeing a beta preview of prx.org`);
  });

  it('uses the path in the old version link', () => {
    spyOn(comp, 'locationPath').and.returnValue('/foobar');
    fix.detectChanges();
    expect(de.query(By.css('a.old-version')).nativeElement.innerText).toContain('Use Old Version');
    expect(de.query(By.css('a.old-version')).nativeElement.getAttribute('href')).toEqual('http://www.prx.org/foobar?m=false');
  });

});
