import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TabService } from './tab.service';
import { TabComponent } from './tab.component';
import { SpinnerModule } from '../spinner/spinner.module';

@Component({
  selector: 'test-component',
  template: `
    <prx-tabs [model]="testModel">
      <nav>
        <a [routerLink]="['foo']">Foo</a>
        <a [routerLink]="['bar']">Bar</a>
      </nav>
      <h1>Extra stuff here</h1>
    </prx-tabs>
  `
})
class TestComponent {
  testModel: any;
}
describe('TabComponent', () => {
  let comp: TestComponent;
  let fix: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let currentModel: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TabComponent],
      providers: [TabService],
      imports: [RouterTestingModule, SpinnerModule]
    })
      .compileComponents()
      .then(() => {
        fix = TestBed.createComponent(TestComponent);
        comp = fix.componentInstance;
        de = fix.debugElement;
        el = de.nativeElement;
      });

    currentModel = null;
    jest.spyOn(TabService.prototype, 'setModel').mockImplementation((m: any) => (currentModel = m));
  }));

  it('shows the tabbed content', () => {
    const navs = de.queryAll(By.css('nav a'));
    expect(navs.length).toEqual(2);
    expect(navs[0].nativeElement.textContent).toContain('Foo');
    expect(navs[1].nativeElement.textContent).toContain('Bar');
    expect(de.query(By.css('h1')).nativeElement.textContent).toContain('Extra stuff here');
  });

  it('shows a spinner until the model is bound', () => {
    fix.detectChanges();
    expect(de.query(By.css('prx-spinner'))).not.toBeNull();
    comp.testModel = {};
    fix.detectChanges();
    expect(de.query(By.css('prx-spinner'))).toBeNull();
  });

  it('tells the tab service about the model', () => {
    expect(currentModel).toBeNull();
    comp.testModel = 'thing1';
    fix.detectChanges();
    expect(currentModel).toEqual('thing1');
    comp.testModel = 'thing2';
    fix.detectChanges();
    expect(currentModel).toEqual('thing2');
  });
});
