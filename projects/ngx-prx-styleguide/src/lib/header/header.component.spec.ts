import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { Component, DebugElement }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

@Component({
  selector: 'test-component',
  template: `<prx-header><h4>Something</h4></prx-header>`
})
class TestComponent {}

describe('Component: HeaderComponent', () => {

  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TestComponent, HeaderComponent]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(TestComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('renders a home logo link', () => {
    expect(de.query(By.css('h1')).nativeElement.textContent).toContain('PRX');
  });

  it('includes ng content', () => {
    expect(de.query(By.css('h4')).nativeElement.textContent).toEqual('Something');
  });

});
