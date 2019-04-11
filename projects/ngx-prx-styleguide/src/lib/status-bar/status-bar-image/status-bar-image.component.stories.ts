import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatusBarModule } from '../status-bar.module';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, select } from '@storybook/addon-knobs';
import { MockHalDoc } from '../../hal/mock/mock-haldoc';

const routing: ModuleWithProviders = RouterModule.forRoot([]);

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    StatusBarModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Navigation|Status Bar/ Status Bar Image', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const imageDocMap = {
        good: () => {
          const doc = new MockHalDoc({});
          doc.mock('prx:image', {_links: {enclosure: {href: 'https://placebear.com/1000/1000'}}});
          return doc;
        },
        empty: () => new MockHalDoc({}),
        bad: () => {
          const doc = new MockHalDoc({});
          doc.mockError('prx:image', 'something went horribly wrong');
          doc.has = () => true;
          return doc;
        }
      }
      const imageSrcOptions: object = {
        ['Actual URL']: 'https://placebear.com/g/1000/1000',
        ['Bad URL']: 'http://fake.url/doesnotexist.png',
        ['Doc with image']: 'good',
        ['Doc without image']: 'empty',
        ['Doc with error']: 'bad',
        ['None (Hide Image)']: null,
      };
      const selectImageSrc = (label: string, options: object, defaultValue: any = null) => {
        const opt = select(label, options, defaultValue);
        return opt && imageDocMap[opt] ? imageDocMap[opt]() : opt;
      }
      const src = selectImageSrc('Image Source', imageSrcOptions, imageSrcOptions['Actual URL']);

      return {
        template: `
        <prx-status-bar>
          <prx-status-bar-image [src]="src"></prx-status-bar-image>
        </prx-status-bar>
        `,
        props: {
          src
        },
        styles: []
      };
    },
    {
      notes: {
        markdown:
`
# Status Bar Image

Status bar sub-component to provide image sized for the status bar.

----

__Module__ \`StatusBarModule\`

__Selector__ \`prx-status-bar-image\`

----

- \`@Input src: string|HalDoc\` \\- Image URL or HalDoc with \`prx:image\` relationship. If not provided or is unsupported type, component will not be displayed.
`
      }
    }
  );

storiesOf('Navigation|Status Bar/Status Bar Image/Examples', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Simple Section Bar w/ Image',
    () => ({
      template: `
      <div class="main">
        <prx-status-bar>
          <prx-status-bar-image src="https://placebear.com/40/40"></prx-status-bar-image>
          <prx-status-bar-text bold uppercase>Section</prx-status-bar-text>
          <prx-status-bar-text italic stretch>You are currently in this section.</prx-status-bar-text>
          <prx-status-bar-text>Welcome!</prx-status-bar-text>
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
  <prx-status-bar-image src="https://placebear.com/40/40"></prx-status-bar-image>
  <prx-status-bar-text bold uppercase>Section</prx-status-bar-text>
  <prx-status-bar-text italic stretch>You are currently in this section.</prx-status-bar-text>
  <prx-status-bar-text>Welcome!</prx-status-bar-text>
</prx-status-bar>
\`\`\`
`
      }
    }
  );