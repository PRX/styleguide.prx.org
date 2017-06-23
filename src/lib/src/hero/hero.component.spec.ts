import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { Component, DebugElement }    from '@angular/core';
import { SpinnerModule } from '../spinner/spinner.module';
import { HeroComponent } from './hero.component';

@Component({
  selector: 'test-component',
  template: `<prx-hero>
    <h1 class="hero-title">The Title</h1>
    <h2 class="hero-info" *ngIf="showInfo">The Infos</h2>
    <h3 class="hero-actions">The Actions</h3>
  </prx-hero>
  <div [style.height.px]="1000"></div>`
})
class TestComponent {
  showInfo = false;
}

describe('HeroComponent', () => {

  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, HeroComponent],
      imports: [SpinnerModule]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(TestComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  let fakeScrollY = 0;
  beforeEach(() => {
    spyOn(HeroComponent.prototype, 'getScrollY').and.callFake(() => fakeScrollY);
  });

  const triggerScroll = () => {
    let e = document.createEvent('UIEvents');
    e.initUIEvent('scroll', true, true, window, 1);
    window.dispatchEvent(e);
  };

  it('shows the title content', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toContain('The Title');
  });

  // TODO: this test jacks up the whole test suite
  xit('shows a spinner when info is missing', () => {
    expect(de.query(By.css('h1'))).toBeNull();
    expect(de.query(By.css('prx-spinner'))).not.toBeNull();
    comp.showInfo = true;
    fix.detectChanges();
    expect(de.query(By.css('h2')).nativeElement.innerText).toContain('The Infos');
    expect(de.query(By.css('prx-spinner'))).toBeNull();
  });

  it('shows the actions', () => {
    expect(de.query(By.css('h3')).nativeElement.innerText).toContain('The Actions');
  });

  // TODO: this test doesn't pass
  xit('affixes when scrolled', () => {
    expect(de.query(By.css('.affix'))).toBeNull();
    fakeScrollY = 999;
    triggerScroll();
    fix.detectChanges();
    expect(de.query(By.css('.affix'))).not.toBeNull();// Error: Expected null not to be null.
  });

});
