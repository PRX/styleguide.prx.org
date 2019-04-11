import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBarTextComponent } from './status-bar-text.component';

describe('StatusBarTextComponent', () => {
  let component: StatusBarTextComponent;
  let fixture: ComponentFixture<StatusBarTextComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusBarTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBarTextComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add .text--bold class', () => {
    component.bold = true;
    fixture.detectChanges();
    expect(de.classes['text--bold']).toBeDefined();
    expect(de.classes['text--bold']).toBe(true);
  });

  it('should add .text--italic class', () => {
    component.italic = true;
    fixture.detectChanges();
    expect(de.classes['text--italic']).toBeDefined();
    expect(de.classes['text--italic']).toBe(true);
  });

  it('should add .text--uppercase class', () => {
    component.uppercase = true;
    fixture.detectChanges();
    expect(de.classes['text--uppercase']).toBeDefined();
    expect(de.classes['text--uppercase']).toBe(true);
  });

  it('should add .layout--stretch class', () => {
    component.stretch = true;
    fixture.detectChanges();
    expect(de.classes['layout--stretch']).toBeDefined();
    expect(de.classes['layout--stretch']).toBe(true);
  });
});
