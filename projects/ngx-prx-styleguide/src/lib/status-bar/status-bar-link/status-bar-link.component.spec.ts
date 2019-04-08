import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBarLinkComponent } from './status-bar-link.component';

describe('StatusBarLinkComponent', () => {
  let component: StatusBarLinkComponent;
  let fixture: ComponentFixture<StatusBarLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusBarLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBarLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
