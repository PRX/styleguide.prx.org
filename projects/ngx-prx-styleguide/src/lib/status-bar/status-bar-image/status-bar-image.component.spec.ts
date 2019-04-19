import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBarImageComponent } from './status-bar-image.component';
import { StatusBarModule } from '../status-bar.module';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockHalService } from '../../hal/mock/mock-hal.service';

describe('StatusBarImageComponent', () => {
  let component: StatusBarImageComponent;
  let fixture: ComponentFixture<StatusBarImageComponent>;
  let de: DebugElement;
  let img: DebugElement;

  const cms: MockHalService = new MockHalService();
  const mockDoc = (linkHref: string) => {
    let doc = cms.mock('prx:anything', {});
    if (linkHref) {
      doc.mock('prx:image', {_links: {enclosure: {href: linkHref}}});
    }
    return doc;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StatusBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBarImageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show when src is not provided', () => {
    const img = de.query(By.css('prx-image'));
    expect(img).toBeNull();
  });

  it('should show image with src attribute when src is a string', () => {
    let img: DebugElement;
    component.src = 'https://placebear.com/42/42';
    fixture.detectChanges();
    img = de.query(By.css('prx-image'));
    expect(img).toBeTruthy();
    expect(img.attributes['ng-reflect-src']).toBe('https://placebear.com/42/42');
  });

  it('should show image with imageDoc attribute when src is a HalDoc', () => {
    const imageDoc = mockDoc('https://placebear.com/42/42')
    component.src = imageDoc;
    fixture.detectChanges();
    img = de.query(By.css('prx-image'));
    expect(img).toBeTruthy();
    expect(img.attributes['ng-reflect-image-doc']).toBeTruthy();
  });
});
