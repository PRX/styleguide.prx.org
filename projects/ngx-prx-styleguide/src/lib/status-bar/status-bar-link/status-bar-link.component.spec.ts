import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBarModule } from './../status-bar.module';
import { StatusBarLinkComponent } from './status-bar-link.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: `
    <a prx-status-bar-link [alignArt]="alignArt">
      <prx-status-bar-icon name="menu" *ngIf="showIcon"></prx-status-bar-icon>
      <prx-status-bar-image src="https://placebear.com/40/40" *ngIf="showImage"></prx-status-bar-image>
      {{text}}
    </a>
  `
})
class TestComponent {
  alignArt: string;
  showIcon: boolean = false;
  showImage: boolean = false;
  text: string;
}

describe('StatusBarLinkComponent', () => {
  let testComp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let component: StatusBarLinkComponent;
  let de: DebugElement;
  let compDe: DebugElement;
  let iconDe: DebugElement;
  let imageDe: DebugElement;
  let textDe: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StatusBarModule ],
      declarations: [ TestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComp = fixture.componentInstance;
    de = fixture.debugElement;
    compDe = de.query(By.directive(StatusBarLinkComponent));
    component = compDe.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show text element when content is provided', () => {
    testComp.text = 'Click Me';
    fixture.detectChanges();
    textDe = de.query(By.css('.text'));
    expect(textDe).toBeTruthy();
    expect(textDe.nativeElement.innerText).toBe('Click Me');
  });

  it('should show icon element when content includes status bar icon component', () => {
    testComp.showIcon = true;
    fixture.detectChanges();
    iconDe = de.query(By.css('.icon'));
    expect(iconDe).toBeTruthy();
  });

  it('should show image element when content includes status bar image component', () => {
    testComp.showImage = true;
    fixture.detectChanges();
    imageDe = de.query(By.css('.image'));
    expect(imageDe).toBeTruthy();
  });

  it('should add .align-art--right class', () => {
    testComp.alignArt = 'right';
    fixture.detectChanges();
    expect(compDe.classes['align-art--right']).toBeDefined();
    expect(compDe.classes['align-art--right']).toBe(true);
  });
});
