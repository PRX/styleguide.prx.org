import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TabService } from 'ngx-prx-styleguide';
import { DemoModel } from '../model/demo.model';

@Component({
  selector: 'app-tab-content-first-demo',
  template: `
    <section class="demo" *ngIf="demo">
      <h1>Tab</h1>
      <p>
        The Tab Component used in conjunction with the Tab Service provides styling for side "tab" navigation and a mechanism
        for passing the resource model to the routed tab content components. Until the resource is available, the Tab Component
        shows a Spinner, and typically tab content is not displayed (using <code>*ngIf</code> on the model.)
      </p>
      <p>
        The Tab Component sets the model in the Tab Service, and the routed tab content component subscribes to the model from the service.
      </p>
      <dl>
        <dt>module</dt><dd><code>TabModule</code></dd>
        <dt>selector</dt><dd><code>prx-tabs</code></dd>
      </dl>
      <ul>
        <li><code>@Input() model: BaseModel</code> - the resource model</li>
      </ul>
      <aside>
        Tab Component Usage:
        <p>
          The Tab Component uses content projection to display the tabs provided by the parent component containing tabs.
          The tabs should be structured as a <code>nav</code> containing <code>a</code> links that use the <code>routerLinkActive</code>
          directive with the class <code>active</code> to get appropriate active tab styling.
        </p>
        <pre class="code">
          &lt;prx-tabs [model]="demo"&gt;
            &lt;nav&gt;
              &lt;a routerLinkActive="active"
                [routerLinkActiveOptions]="&#123;exact:true&#125;"
                [routerLink]="['/tab']"&gt;First&lt;/a&gt;
              &lt;a routerLinkActive="active"
                [routerLink]="['second']"&gt;Second&lt;/a&gt;
              &lt;a routerLinkActive="active"
                [routerLink]="['third']"&gt;Third&lt;/a&gt;
            &lt;/nav&gt;
          &lt;/prx-tabs&gt;
        </pre>
        <p>
          Disabled tab styling is also provided by the Tab Component.
        </p>
        <pre class="code">
          &lt;prx-tabs [model]="demo"&gt;
            &lt;nav&gt;
              &lt;a disabled&gt;Disabled&lt;/a&gt;
            &lt;/nav&gt;
          &lt;/prx-tabs&gt;
        </pre>
      </aside>
      <aside>
        Routing Usage:
        <p>
          The tabs are typically child routes of the parent route. In this example, the parent route is 'tab', and the
          child routes are '', 'second', and 'third'. The <code>routerLink</code> on the empty route as shown above points
          back to the parent route. The non empty <code>routerLink</code>s can point just to the child since we're already
          on the relative path or can use an array of the parent base route as the first element and the child route as the second.
        </p>
        <pre class="code">
          &#123;
            path: 'tab',
            component: ParentThatHasPrxTabsComponent,
            children: [
              &#123; path: '',        component: TabContentSubscribesToTabServiceComponent &#125;,
              &#123; path: 'second',  component: TabContentSecondComponent &#125;,
              &#123; path: 'third',   component: TabContentThirdComponent &#125;
            ]
          &#125;
        </pre>
      </aside>
      <aside>
        Tab Service Usage:
        <p>
          The routed tab content component subscribes to the model from the service.
        </p>
        <pre class="code">
          export class TabContentComponent &#123;
            tabSub: Subscription;
            demo: DemoModel;

            constructor(tab: TabService) &#123;
              this.tabSub = tab.model.subscribe((d: DemoModel) => &#123;
                this.demo = d;
              &#125;);
            &#125;
          &#125;
        </pre>
      </aside>
    </section>
  `
})
export class TabContentFirstDemoComponent {
  tabSub: Subscription;
  demo: DemoModel;

  constructor(tab: TabService) {
    this.tabSub = tab.model.subscribe((d: DemoModel) => {
      this.demo = d;
    });
  }
}
