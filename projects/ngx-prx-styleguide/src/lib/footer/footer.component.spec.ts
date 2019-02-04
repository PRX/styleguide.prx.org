import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'test-component',
  template: `
    <prx-footer>
      Some projected content
    </prx-footer>
  `
})
class TestComponent {}

describe('FooterComponent', () => {
  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, FooterComponent]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(TestComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('renders the footer', () => {
    expect(de.nativeElement.innerText).toContain('About Us');
    expect(de.nativeElement.innerText).toContain('Radiotopia');
  });

  it('projects inner content', () => {
    expect(de.nativeElement.innerText).toContain('Some projected content');
  });

});
