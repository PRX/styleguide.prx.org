import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBarIconComponent } from './status-bar-icon.component';
import { StatusBarModule } from '../status-bar.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('StatusBarIconComponent', () => {
  let component: StatusBarIconComponent;
  let fixture: ComponentFixture<StatusBarIconComponent>;
  let de: DebugElement;
  let icon: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StatusBarModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBarIconComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    icon = de.query(By.css('prx-icon'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set icon name', () => {
    component.name = 'plus';
    fixture.detectChanges();
    expect(icon).toBeTruthy();
    expect(icon.attributes['ng-reflect-name']).toBe('plus');
  });

  it('should set icon color', () => {
    component.color = 'success';
    fixture.detectChanges();
    expect(icon).toBeTruthy();
    expect(icon.attributes['ng-reflect-color']).toBe('success');
  });
});
