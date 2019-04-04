import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Observable ,  Observer } from 'rxjs';
import { ModalService, ModalState } from './modal.service';
import { ModalComponent } from './modal.component';

const simulateKey = (key: string) => {
  let e = document.createEvent('Event');
  e['key'] = key;
  e.initEvent('keydown', true, true);
  document.dispatchEvent(e);
};

describe('ModalComponent', () => {

  let comp: ModalComponent;
  let fix: ComponentFixture<ModalComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        {
          provide: ModalService,
          useValue: {
            state: Observable.create((observer: Observer<ModalState>) => {})
          }
        }
      ]
    }).compileComponents().then(() => {

      fix = TestBed.createComponent(ModalComponent);
      comp = fix.componentInstance;
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('defaults to hidden', () => {
    expect(de.query(By.css('.overlay'))).toBeNull();
    expect(de.query(By.css('.modal'))).toBeNull();
  });

  it('shows title and body info', () => {
    comp.shown = true;
    comp.state = {title: 'hello', body: 'world'};
    fix.detectChanges();
    expect(de.query(By.css('h1')).nativeElement.innerText).toContain('hello');
    expect(de.query(By.css('section')).nativeElement.innerText).toContain('world');
  });

  it('shows a close button', () => {
    comp.shown = true;
    comp.state = {};
    fix.detectChanges();
    let close = de.query(By.css('button.close'));
    expect(close).not.toBeNull();
    jest.spyOn(comp, 'close').mockImplementation(() => {});
    close.nativeElement.click();
    expect(comp.close).toHaveBeenCalled();
  });

  it('shows footer buttons', () => {
    comp.shown = true;
    comp.state = {primaryButton: 'foo', secondaryButton: 'bar'};
    fix.detectChanges();
    expect(de.query(By.css('button.close'))).toBeNull();
    let buttons = de.queryAll(By.css('footer button'));
    expect(buttons.length).toEqual(2);
    expect(buttons[0].nativeElement.innerText).toContain('foo');
    expect(buttons[1].nativeElement.innerText).toContain('bar');

    jest.spyOn(comp, 'close').mockImplementation(() => {});
    buttons[0].nativeElement.click();
    buttons[1].nativeElement.click();
    expect(comp.close).toHaveBeenCalledTimes(2);
  });

  it('listens to keys when open', () => {
    comp.shown = true;
    comp.state = {};
    fix.detectChanges();
    simulateKey('Escape');
    expect(comp.shown).toEqual(false);

    comp.shown = true;
    fix.detectChanges();
    simulateKey('Enter');
    expect(comp.shown).toEqual(false);
  });

  it('matches the escape key to the secondary button', () => {
    comp.shown = true;
    comp.state = {primaryButton: 'Okay', secondaryButton: 'Cancel'};
    fix.detectChanges();
    jest.spyOn(comp, 'buttonClick').mockImplementation(() => {});
    simulateKey('Escape');
    expect(comp.buttonClick).toHaveBeenCalledWith('Cancel');
  });

  it('matches the enter key to the primary button', () => {
    comp.shown = true;
    comp.state = {primaryButton: 'Ok', secondaryButton: 'Cancel'};
    fix.detectChanges();
    jest.spyOn(comp, 'buttonClick').mockImplementation(() => {});
    simulateKey('Enter');
    expect(comp.buttonClick).toHaveBeenCalledWith('Ok');
  });

});
