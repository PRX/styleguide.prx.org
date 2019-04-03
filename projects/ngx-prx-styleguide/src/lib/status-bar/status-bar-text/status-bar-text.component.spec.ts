import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBarTextComponent } from './status-bar-text.component';

describe('StatusBarTextComponent', () => {
  let component: StatusBarTextComponent;
  let fixture: ComponentFixture<StatusBarTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusBarTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBarTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
