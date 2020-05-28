import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from './checkbox.component';

@Component({
  selector: 'test-component',
  template: `
    <prx-checkbox
      #check
      [disabled]="disabled"
      [color]="color"
      [(checked)]="checked"
      (change)="onChange($event)"
    ></prx-checkbox>
  `
})
class TestComponent {
  @ViewChild('check', { static: true }) check: CheckboxComponent;
  disabled = false;
  color: string;
  checked = false;
  onChangeVal: boolean;
  onChange(val: boolean) {
    this.onChangeVal = val;
  }
}

describe('CheckboxComponent', () => {
  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let clickit = () => de.query(By.css('label')).nativeElement.click();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent, TestComponent],
      imports: [FormsModule]
    })
      .compileComponents()
      .then(() => {
        fix = TestBed.createComponent(TestComponent);
        comp = fix.componentInstance;
        de = fix.debugElement;
      });
  }));

  it('disables the checkbox', () => {
    expect(de.query(By.css('input')).nativeElement.getAttribute('disabled')).toBeNull();
    comp.disabled = true;
    comp.checked = false;
    fix.detectChanges();
    expect(de.query(By.css('input')).nativeElement.getAttribute('disabled')).not.toBeNull();
    clickit();
    expect(comp.checked).toEqual(false);
  });

  it('changes the checkbox color based on state', () => {
    comp.disabled = false;
    comp.checked = false;
    comp.color = '#ff0000';
    fix.detectChanges();
    expect(comp.check.dynamicColor).not.toEqual('#ff0000');
    comp.checked = true;
    fix.detectChanges();
    expect(comp.check.dynamicColor).toEqual('#ff0000');

    comp.check.focused = true;
    let focusedColor = comp.check.dynamicColor;
    comp.check.mousedown = true;
    let pressedColor = comp.check.dynamicColor;
    expect('#ff0000' > focusedColor).toEqual(true);
    expect(focusedColor > pressedColor).toEqual(true);
  });

  it('gets and sets the checked state', () => {
    comp.disabled = false;
    comp.checked = false;
    fix.detectChanges();
    expect(comp.onChangeVal).toBeUndefined();
    clickit();
    expect(comp.checked).toEqual(true);
    expect(comp.onChangeVal).toEqual(true);
    clickit();
    expect(comp.checked).toEqual(false);
    expect(comp.onChangeVal).toEqual(false);
  });
});
