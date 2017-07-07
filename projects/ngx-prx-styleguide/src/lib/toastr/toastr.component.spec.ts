import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ToastrService } from './toastr.service';
import { ToastrComponent } from './toastr.component';

const simulateKey = (key: string) => {
  let e = document.createEvent('Event');
  e['key'] = key;
  e.initEvent('keydown', true, true);
  document.dispatchEvent(e);
};

describe('ToastrComponent', () => {
  let comp: ToastrComponent;
  let fix: ComponentFixture<ToastrComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToastrComponent],
      providers: [ToastrService]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(ToastrComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('defaults to hidden', () => {
    expect(de.query(By.css('div'))).not.toBeNull();
    expect(de.query(By.css('div.show'))).toBeNull();
  });

  it('shows message', () => {
    comp.shown = true;
    comp.toastMessage = 'something happened';
    comp.status = '';
    fix.detectChanges();
    expect(de.query(By.css('div.show')).nativeElement.innerText).toContain('something happened');
  });

  it('shows info/success/error status', () => {
    comp.status = 'info';
    fix.detectChanges();
    expect(de.query(By.css('div')).nativeElement.classList).toContain('info');
    comp.status = 'success';
    fix.detectChanges();
    expect(de.query(By.css('div')).nativeElement.classList).toContain('success');
    comp.status = 'error';
    fix.detectChanges();
    expect(de.query(By.css('div')).nativeElement.classList).toContain('error');
    // fix.detectChanges();
  });

  it('closes with Esc', () => {
    comp.shown = true;
    comp.toastMessage = 'something happened';
    comp.status = 'info';
    fix.detectChanges();
    simulateKey('Escape');
    expect(comp.shown).toEqual(false);
  });

});
