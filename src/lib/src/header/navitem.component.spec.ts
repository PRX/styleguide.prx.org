import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import {NavItemComponent} from './navitem.component';

describe('Component: NavItemComponent', () => {
  let comp: NavItemComponent;
  let fix: ComponentFixture<NavItemComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavItemComponent]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(NavItemComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('renders a routed nav link', () => {
    comp.text = 'Foobar';
    comp.route = '/home';
    fix.detectChanges();
    expect(de.query(By.css('a')).nativeElement.innerText).toEqual('Foobar');
    expect(de.query(By.css('a')).nativeElement.getAttribute('href')).toEqual('/home');
  });

  it('renders an arbitrary url', () => {
    comp.text = 'Somewhere';
    comp.href = 'http://some.where';
    fix.detectChanges();
    expect(de.query(By.css('a')).nativeElement.innerText).toEqual('Somewhere');
    expect(de.query(By.css('a')).nativeElement.getAttribute('href')).toEqual('http://some.where');
  });

});
