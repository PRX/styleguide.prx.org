import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatusBarModule } from './status-bar.module';
import { IconModule } from '../icon/icon.module';
import { ImageModule } from '../image/image.module';
import { FancyFormModule } from '../fancy-form/fancy-form.module';
import { centered } from '@storybook/addon-centered/angular';
import { BaseModel, RelatedMap } from '../model/base.model';
import { HalDoc } from '../hal/doc/haldoc';
import { Observable, of as ofasobservableOf } from 'rxjs';

// Setup simple model for the stories.
class SimpleModel extends BaseModel {
  public foo: string;

  constructor(parent: HalDoc, demo?: HalDoc, loadRelated = true) {
    super();
    this.init(parent, demo, loadRelated);
  }

  SETABLE = ['foo'];

  encode(): {} { return {}; };
  decode(): void {
    this.foo = this.doc['foo'];
  };
  key(): string { return 'simple-model'; };
  related(): RelatedMap { return {}; };
  saveNew(data: {}): Observable<HalDoc> { return ofasobservableOf(this.doc); };
};
const model = new SimpleModel(null, new HalDoc({
  foo: 'bar'
}, null));

// Force model change so examples using model will be visible. T_T
model.set('foo', 'baz');

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    StatusBarModule,
    IconModule,
    ImageModule,
    FancyFormModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});


storiesOf('Navigation|Status Bar', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details',
    () => ({
      template: `
      <div class="main">
        <prx-status-bar>
          <!-- Add status bar sub-components here. -->
        </prx-status-bar>
      </div>
      `,
      props: {},
      styles: [
        `
        .main {
          width: 90vw;
        }
        `
      ]
    }),
    {
      notes: {
        markdown:
`
# Status Bar

Base wrapper for status bar sub-components. Doesn't do much other than provide
base layout and theme styles.

----

_Module_ \`StatusBarModule\`

_Selector_ \`prx-status-bar\`

----

## Usage

\`\`\`html
<prx-status-bar>
  <!-- Add status bar sub-components here. -->
</prx-status-bar>
\`\`\`
`
      }
    }
  );

storiesOf('Navigation|Status Bar/Examples', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Save Button w/ model error',
    () => ({
      template: `
      <div class="main">
        <prx-status-bar>
          <prx-status-bar-text stretch></prx-status-bar-text>
          <prx-button [model]="model" disabled=1 >
            Save
            <div class="invalid-tip">
              <h4>Invalid changes</h4>
              <p>Correct them before saving</p>
            </div>
          </prx-button>
        </prx-status-bar>
      </div>
      `,
      props: {},
      styles: [
        `
        .main {
          width: 90vw;
        }
        `
      ]
    }),
    {
      notes: {
        markdown:
`
## Usage

\`\`\`html
<prx-status-bar>
  <prx-button [model]="model" disabled=0 >Save</prx-button>
</prx-status-bar>
\`\`\`
`
      }
    }
  );