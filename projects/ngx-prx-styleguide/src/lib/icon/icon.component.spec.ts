import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';

import { IconComponent } from './icon.component';
import { By } from '@angular/platform-browser';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpClientModule } from '@angular/common/http';

@Component({
  template: `<prx-icon class="foo" [name]="name" [color]="color" [size]="size"></prx-icon>`
})
class TestComponent {
  color: string;
  name: string;
  size: string
}

describe('IconComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let icon: IconComponent;
  let iconDebug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, IconComponent ],
      imports: [
        HttpClientModule,
        InlineSVGModule.forRoot()
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement;
      iconDebug = de.query(By.directive(IconComponent));
      icon = iconDebug.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(icon).toBeTruthy();
  });

  it('should keep classes defined on element', () => {
    expect(iconDebug.attributes['class']).toBe('foo');
  });

  it('should set color class', () => {
    component.color = 'default';
    fixture.detectChanges();
    expect(iconDebug.classes['color--default']).toBe(true);
  });

  it('should remove color class', () => {
    component.color = 'default';
    fixture.detectChanges();
    expect(iconDebug.classes['color--default']).toBe(true);
    component.color = null;
    fixture.detectChanges();
    expect(iconDebug.classes['color--default']).toBeFalsy();
  });

  it('should remove previous color class when changing color', () => {
    component.color = 'default';
    fixture.detectChanges();
    expect(iconDebug.classes['color--default']).toBe(true);
    component.color = 'primary';
    fixture.detectChanges();
    expect(iconDebug.classes['color--default']).toBeFalsy();
    expect(iconDebug.classes['color--primary']).toBe(true);
  });

  it('should set empty array of attribute to remove from SVG', () => {
    expect(icon.removedSVGAttributes.length).toBe(0);
  });

  it('should set array of attribute to remove from SVG', () => {
    component.color = 'default';
    fixture.detectChanges();
    expect(icon.removedSVGAttributes.length).toBeGreaterThan(0);
  });

  it('should set relative asset path for icon name', () => {
    component.name = 'plus';
    fixture.detectChanges();
    expect(icon.svgFilePath).toBe('../../assets/images/icons/plus.svg');
  });

  it('should remove ".svg" extension from name', () => {
    component.name = 'plus.svg';
    fixture.detectChanges();
    expect(icon.name).toBe('plus');
  });

  it('should set width and height styles', () => {
    component.size = '20px';
    fixture.detectChanges();
    expect(iconDebug.styles.width).toBe('20px');
    expect(iconDebug.styles.height).toBe('20px');
  });


});
