import { storiesOf, moduleMetadata } from "@storybook/angular";
import { Observable, of as ofasobservableOf, Subscription } from "rxjs";
import { Component, ModuleWithProviders } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";
import { Routes, Route, RouterModule } from "@angular/router";
import { TabService } from "./tab.service";
import { TabModule } from "./tab.module";
import { BaseModel, RelatedMap } from "../model/base.model";
import { HalDoc } from "../hal/doc/haldoc";

// Setup simple model for the stories.
class TabModel extends BaseModel {
  constructor(parent: HalDoc, demo?: HalDoc, loadRelated = true) {
    super();
    this.init(parent, demo, loadRelated);
  }

  SETABLE = [];

  encode(): {} {
    return {};
  }
  decode(): void {}
  key(): string {
    return "tab-model";
  }
  related(): RelatedMap {
    return {};
  }
  saveNew(data: {}): Observable<HalDoc> {
    return ofasobservableOf(this.doc);
  }
}
const model = new TabModel(null, new HalDoc({}, null));

// Setup some simple compoents for tab content.
class TabContent {
  tabSub: Subscription;
  model: TabModel;

  constructor(tab: TabService) {
    this.tabSub = tab.model.subscribe((tm: TabModel) => {
      this.model = tm;
    });
  }
}

@Component({
  selector: "tab-content-one",
  template: `
    <section *ngIf="model">
      <h1>First Tab</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </section>
  `
})
class FirstTabContentComponent extends TabContent {
  constructor(tab: TabService) {
    super(tab);
  }
}

@Component({
  selector: "tab-content-two",
  template: `
    <section *ngIf="model">
      <h1>Second Tab</h1>
      <p>
        Elementum tempus egestas sed sed risus. Mauris a diam maecenas sed enim
        ut sem. Orci phasellus egestas tellus rutrum. Pellentesque pulvinar
        pellentesque habitant morbi. Tellus cras adipiscing enim eu turpis
        egestas. Nisi quis eleifend quam adipiscing vitae proin. Quam
        pellentesque nec nam aliquam sem et. Orci phasellus egestas tellus
        rutrum tellus pellentesque eu tincidunt tortor. Feugiat in ante metus
        dictum at tempor. Duis ut diam quam nulla porttitor massa id neque
        aliquam. Et malesuada fames ac turpis egestas sed tempus urna et.
        Potenti nullam ac tortor vitae purus faucibus ornare. At urna
        condimentum mattis pellentesque id nibh tortor id. Nunc congue nisi
        vitae suscipit tellus mauris a. Elit pellentesque habitant morbi
        tristique. Rhoncus dolor purus non enim praesent elementum facilisis leo
        vel. A iaculis at erat pellentesque adipiscing commodo elit at. Sed
        tempus urna et pharetra pharetra massa massa. Blandit volutpat maecenas
        volutpat blandit aliquam etiam. Dolor sed viverra ipsum nunc aliquet
        bibendum enim.
      </p>
    </section>
  `
})
class SecondTabContentComponent extends TabContent {
  constructor(tab: TabService) {
    super(tab);
  }
}

@Component({
  selector: "tab-content-three",
  template: `
    <section *ngIf="model">
      <h1>Third Tab</h1>
      <p>
        Viverra ipsum nunc aliquet bibendum. At risus viverra adipiscing at in
        tellus. Viverra nam libero justo laoreet sit amet cursus sit. Neque
        gravida in fermentum et sollicitudin ac. Imperdiet sed euismod nisi
        porta lorem. Ut aliquam purus sit amet. Lacus vestibulum sed arcu non.
        Bibendum est ultricies integer quis auctor elit sed vulputate. Facilisi
        etiam dignissim diam quis enim lobortis scelerisque. Commodo ullamcorper
        a lacus vestibulum.
      </p>
    </section>
  `
})
class ThirdTabContentComponent extends TabContent {
  constructor(tab: TabService) {
    super(tab);
  }
}

const tabComponents: any[] = [
  FirstTabContentComponent,
  SecondTabContentComponent,
  ThirdTabContentComponent
];

// Setup routes for tab content.
const tabLinks = [
  { path: "iframe.html", label: "First", component: FirstTabContentComponent },
  { path: "second", label: "Second", component: SecondTabContentComponent },
  { path: "third", label: "Third", component: ThirdTabContentComponent }
];

const tabRoutes: Routes = [
  ...tabLinks.map(
    ({ path, component }): Route => ({
      path,
      component
    })
  )
];

const tabRouting: ModuleWithProviders = RouterModule.forRoot(tabRoutes);

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [TabModule, RouterModule, tabRouting],
  schemas: [],
  declarations: [tabComponents],
  providers: [{ provide: APP_BASE_HREF, useValue: "" }]
});

storiesOf("Navigation|Tabs", module)
  .addDecorator(storiesModuleMetaData)
  .add(
    "Usage Details",
    () => ({
      template: `
        <prx-tabs [model]="model">
          <nav>
            <a *ngFor="let t of tabLinks"
              routerLinkActive="active"
              [routerLink]="t.path"
              skipLocationChange
            >{{ t.label }}</a>
            <a disabled>Disabled</a>
          </nav>
        </prx-tabs>
      `,
      props: {
        model,
        tabLinks
      },
      styles: [
        `
        :host >>> .main {
          padding: 5rem;
        }
        :host >>> h1 {
          font-size: 2em;
          margin: 0.67em 0;
        }
        `
      ]
    }),
    {
      notes: {
        markdown: `
# Tabs

The Tab Component used in conjunction with the Tab Service provides styling for
side "tab" navigation and a mechanism for passing the resource model to the
routed tab content components. Until the resource is available, the Tab
Component shows a Spinner, and typically tab content is not displayed (using
*ngIf on the model.)

The Tab Component sets the model in the Tab Service, and the routed tab content
component subscribes to the model from the service.

----

__Module__ \`TabModule\`

__Selector__ \`prx-tabs\`

----

- \`@Input() model: BaseModel\` \\- The resource model.

----

## Usage

For this example, we will creating a three tab menu with following route structure:

\`\`\`text
.
.
+-- /tab
|   + ./second
|   + ./third
.
.
\`\`\`


### Tab Component Usage

The Tab Component uses content projection to display the tabs provided by the
parent component containing tabs. The tabs should be structured as a nav
containing a links that use the routerLinkActive directive with the class
active to get appropriate active tab styling.

\`\`\`html
<prx-tabs [model]="model">
  <nav>
    <a routerLinkActive="active"
      [routerLinkActiveOptions]="{exact:true}"
      routerLink="/tab">First</a>
    <a routerLinkActive="active"
      routerLink="second">Second</a>
    <a routerLinkActive="active"
      routerLink="third">Third</a>
  </nav>
</prx-tabs>
\`\`\`

Note the use of \`[routerLinkActiveOptions]="{exact:true}"\` on the first tab
link. This prevents it from showing as active when the second or third tab is
selected as their routes would be prefixed with \`/tab\`.

Disabled tab styling is provided by adding \`disabled\` attribute to the link.

\`\`\`html
<prx-tabs [model]="demo">
  <nav>
    <a disabled>Disabled</a>
  </nav>
</prx-tabs>
\`\`\`

### Routing Usage

The tabs are typically child routes of the parent route. In this example, the
parent route is 'tab', and the child routes are '', 'second', and 'third'. The
routerLink on the empty route as shown above points back to the parent route.
The non empty routerLinks can point just to the child since we're already on the
relative path or can use an array of the parent base route as the first element
and the child route as the second.

\`\`\`javascript
{
  path: 'tab',
  component: ParentThatHasPrxTabsComponent,
  children: [
    { path: '',        component: TabContentSubscribesToTabServiceComponent },
    { path: 'second',  component: TabContentSecondComponent },
    { path: 'third',   component: TabContentThirdComponent }
  ]
}
\`\`\`

### Tab Service Usage

The routed tab content component subscribes to the model from the service.

\`\`\`javascript
export class TabContentComponent {
  tabSub: Subscription;
  demo: DemoModel;

  constructor(tab: TabService) {
    this.tabSub = tab.model.subscribe((d: DemoModel) => {
      this.demo = d;
    });
  }
}
\`\`\`
`
      }
    }
  );
