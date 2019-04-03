import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconChevronComponent } from './icon-chevron.component';

describe('IconChevronComponent', () => {
  let component: IconChevronComponent;
  let fixture: ComponentFixture<IconChevronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconChevronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconChevronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
