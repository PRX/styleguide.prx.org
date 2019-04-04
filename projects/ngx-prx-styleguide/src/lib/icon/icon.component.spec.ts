import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';

import { IconComponent } from './icon.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `<prx-icon [color]="color"></prx-icon>`
})
class TestComponent {
  color: string = 'default';
}

describe('IconComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let icon: IconComponent;
  let iconDebug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, IconComponent ]
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

  it('should set color class', () => {
    expect(iconDebug.classes['color--default']).toBe(true);
  });

  it('should change color class', () => {
    component.color = 'primary';
    fixture.detectChanges();
    expect(iconDebug.classes['color--default']).toBe(false);
    expect(iconDebug.classes['color--primary']).toBe(true);
  });
});
