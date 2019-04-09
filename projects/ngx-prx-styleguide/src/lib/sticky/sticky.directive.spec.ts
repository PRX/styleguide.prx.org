import { StickyDirective } from './sticky.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: `
    <div class="sticky-main">
      <div class="sticky-header" prxSticky="all"></div>
      <div class="sticky-content">
        <div class="sticky-element" [prxSticky]="group" [sticky-offset]="offset"></div>
      </div>
    </div>
  `,
  styles: [
    `
    .sticky-main {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 200vh;
    }
    .sticky-container {
      margin-top: 100px;
      height: 100vh;
    }
    .sticky-header {
      height: 50px;
    }
    .sticky-element {
      height: 40px;
    }
    `
  ]
})
class TestComponent {
  group: string;
  offset: number;
}

describe('StickyDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let elm: Element;
  let elmDebug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, StickyDirective ],
      imports: []
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement;
      elmDebug = de.query(By.css('.sticky-element'));
      elm = elmDebug.nativeElement;
      fixture.detectChanges();
    });
  }));

  it('should add `position` style', () => {
    expect(elmDebug.styles.position).toBeDefined();
  });

  it('should add `top` style of "0"', () => {
    expect(elmDebug.styles.top).toBeDefined();
    expect(elmDebug.styles.top).toBe('0');
  });

  //// TODO: Get tests like this working after Jest conversion.
  // it('should stick on scroll', done => {
  //   const onScroll = () => {
  //     fixture.detectChanges();
  //     console.log(elm, {...elmDebug.classes}, elmDebug);
  //     expect(elmDebug.classes['js-stuck']).toBeDefined();
  //     expect(elmDebug.classes['js-stuck']).toBe(true);
  //     window.removeEventListener('scroll', onScroll);
  //     done();
  //   };
  //   window.addEventListener('scroll', onScroll);
  //   console.log(elm.getBoundingClientRect());
  //   window.scrollTo({ top: elm.getBoundingClientRect().top + 10 });
  // });
});
