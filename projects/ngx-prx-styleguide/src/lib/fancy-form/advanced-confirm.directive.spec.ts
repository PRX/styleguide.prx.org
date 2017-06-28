import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { Component, DebugElement }    from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { AdvancedConfirmDirective } from './advanced-confirm.directive';

@Component({
  selector: 'test-component',
  template: `<input [prxAdvancedConfirm]="confirmText" [prxModel]="model"
                    [prxName]="fieldName" [prxEvent]="eventName"/>`
})
class TestComponent {
  confirmText: string;
  model: any;
  fieldName: string;
  eventName: string;
}

describe('AdvancedConfirmDirective', () => {

  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let modalAlertMessage: string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, AdvancedConfirmDirective],
      providers: [
        {
          provide: ModalService,
          useValue: {
            confirm: (title: string, message: string, callback: Function) => {
              modalAlertMessage = message;
            }
          }
        }
      ]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(TestComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;

      modalAlertMessage = null;
    });
  }));


  it('forces user to confirm changes to advanced fields', () => {
    comp.confirmText = 'some warning';
    comp.model = {
      isNew: false,
      changed: () => true,
      invalid: () => false
    };
    comp.fieldName = 'fieldName';
    comp.eventName = 'blur';
    fix.detectChanges();

    let e = document.createEvent('HTMLEvents');
    let advancedConfirm = de.query(By.css('input'));
    e.initEvent('blur', false, true);
    advancedConfirm.nativeElement.dispatchEvent(e);
    expect(modalAlertMessage).toEqual(comp.confirmText);
  });

  it('can also trigger on the change event', () => {
    comp.confirmText = 'some warning';
    comp.model = {
      isNew: false,
      changed: () => true,
      invalid: () => false
    };
    comp.fieldName = 'fieldName';
    comp.eventName = 'change';
    fix.detectChanges();

    // creating events is tricky!
    let e = document.createEvent('HTMLEvents');
    let advancedConfirm = de.query(By.css('input'));

    e.initEvent('blur', false, true);
    advancedConfirm.nativeElement.dispatchEvent(e);
    expect(modalAlertMessage).toBeNull();

    e.initEvent('change', false, true);
    advancedConfirm.nativeElement.dispatchEvent(e);
    expect(modalAlertMessage).toEqual(comp.confirmText);
  });

});
