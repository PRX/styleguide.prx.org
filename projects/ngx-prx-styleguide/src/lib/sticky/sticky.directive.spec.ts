import { StickyDirective } from './sticky.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StickyModule } from './sticky.module';

@Component({
  selector: 'test-component',
  template: `
    <div class="main">
      <h1 class="sticky-header" prxSticky="all">Header</h1>
      <div class="sticky-sidebar" prxSticky="sidebar" sticky-offset="20"></div>
      <div class="content">
        <h2 class="sticky-element" prxSticky>Heading</h2>
      </div>
    </div>
  `,
  styles: [
    `
    .main {
      display: grid;
      grid-template-columns: 10vw 90vw;
      grid-template-rows: min-content 1fr;
      grid-gap: 10px;
      grid-template-areas:
        'HEADER HEADER'
        'SIDEBAR CONTENT';
      height: 200vh;
      background: purple;
    }
    .content {
      grid-area: CONTENT;
      padding-top: 100px;
      height: 50vh;
      background: pink;
    }
    .sticky-header {
      grid-area: HEADER;
      height: 50px;
      background: green;
    }
    .sticky-sidebar {
      grid-area: SIDEBAR;
      height: 100px;
      margin-top: 20px;
      background: yellow;
    }
    .sticky-element {
      height: 40px;
      background: blue;
    }
    `
  ]
})
class TestComponent {}

describe('StickyDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let hdr: Element;
  let hdrDebug: DebugElement;
  let sbr: Element;
  let sbrDebug: DebugElement;
  let elm: Element;
  let elmDebug: DebugElement;
  let originalTimeout: number;

  // TODO: Convert to integration tests.
  // const onScroll = () => {
  //   fixture.detectChanges();
  // };

  beforeEach(async(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      imports: [
        StickyModule
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement;
      hdrDebug = de.query(By.css('.sticky-header'));
      hdr = hdrDebug.nativeElement;
      sbrDebug = de.query(By.css('.sticky-sidebar'));
      sbr = sbrDebug.nativeElement;
      elmDebug = de.query(By.css('.sticky-element'));
      elm = elmDebug.nativeElement;

      // window.addEventListener('scroll', onScroll); // TODO: Convert to integration tests.
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    // window.removeEventListener('scroll', onScroll); // TODO: Convert to integration tests.
  });

  it('should add default `position` style', () => {
    expect(hdrDebug.styles.position).toBeDefined();
    expect(elmDebug.styles.position).toBeDefined();
  });

  it('should add default `top` style of "0"', () => {
    expect(hdrDebug.styles.top).toBeDefined();
    expect(hdrDebug.styles.top).toBe('0');
    expect(elmDebug.styles.top).toBeDefined();
    expect(elmDebug.styles.top).toBe('0');
  });

  // TODO: Convert to integration tests.
  xit('should update `top` style to pixel value', () => {
    window.dispatchEvent(new Event('scroll'));
    expect(hdrDebug.styles.top).toBeDefined();
    expect(hdrDebug.styles.top).toBe('0px');
    expect(sbrDebug.styles.top).toBeDefined();
    expect(sbrDebug.styles.top).toBe('70px');
    expect(elmDebug.styles.top).toBeDefined();
    expect(elmDebug.styles.top).toBe('50px');
  });

  // TODO: Convert to integration tests.
  xit('should detect sticky behavior on scroll', done => {
    const elmScrollTarget = elm.getBoundingClientRect().top + 10;
    const sbrScrollTarget = sbr.getBoundingClientRect().top + 10;
    const hdrScrollTarget = hdr.getBoundingClientRect().top + 10;

    // Impotant: Jasmine CSS forces vertical scrolling to the body, which breaks
    // `position: sticky` behaviour. Override to restore sticky behavior.
    document.body.style.overflowY = 'visible';

    // Test if header sticks.
    window.scrollTo({
      top: hdrScrollTarget,
      behavior: 'smooth'
    });
    setTimeout(() =>{
      expect(hdrDebug.classes['js-stuck']).toBeDefined();
      expect(hdrDebug.classes['js-stuck']).toBe(true);
      expect(sbrDebug.classes['js-stuck']).toBeDefined();
      expect(sbrDebug.classes['js-stuck']).toBe(false);
      expect(elmDebug.classes['js-stuck']).toBeDefined();
      expect(elmDebug.classes['js-stuck']).toBe(false);

      // Test if sidebar sticks.
      window.scrollTo({
        top: sbrScrollTarget,
        behavior: 'smooth'
      });
      setTimeout(() =>{
        expect(hdrDebug.classes['js-stuck']).toBeDefined();
        expect(hdrDebug.classes['js-stuck']).toBe(true);
        expect(sbrDebug.classes['js-stuck']).toBeDefined();
        expect(sbrDebug.classes['js-stuck']).toBe(true);
        expect(elmDebug.classes['js-stuck']).toBeDefined();
        expect(elmDebug.classes['js-stuck']).toBe(false);
        expect(elmDebug.styles.top).toBe('50px');

        window.scrollTo({
          top: elmScrollTarget,
          behavior: 'smooth'
        });
        setTimeout(() =>{
          expect(hdrDebug.classes['js-stuck']).toBeDefined();
          expect(hdrDebug.classes['js-stuck']).toBe(true);
          expect(sbrDebug.classes['js-stuck']).toBeDefined();
          expect(sbrDebug.classes['js-stuck']).toBe(true);
          expect(elmDebug.classes['js-stuck']).toBeDefined();
          expect(elmDebug.classes['js-stuck']).toBe(true);
          expect(elmDebug.styles.top).toBe('50px');

          // Test if elements unstick.
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          setTimeout(() =>{
            expect(hdrDebug.classes['js-stuck']).toBeDefined();
            expect(hdrDebug.classes['js-stuck']).toBe(false);
            expect(sbrDebug.classes['js-stuck']).toBeDefined();
            expect(sbrDebug.classes['js-stuck']).toBe(false);
            expect(elmDebug.classes['js-stuck']).toBeDefined();
            expect(elmDebug.classes['js-stuck']).toBe(false);
            done();
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  });
});
