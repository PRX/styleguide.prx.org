import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, array, select } from '@storybook/addon-knobs';
import { ImageModule } from './image.module';
import { MockHalDoc } from '../hal/mock/mock-haldoc';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    ImageModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Images|Image Loader', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const srcOptions = {
        None: null,
        ['Actual URL']: 'https://placebear.com/g/1000/1000',
        ['Bad URL']: 'http://fake.url/doesnotexist.png'
      }
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
      const imageDocOptions: object = {
        None: null,
        ['Doc with image']: 'good',
        ['Doc without image']: 'empty',
        ['Doc with error']: 'bad'
      };
      const selectImageDoc = (label: string, options: object, defaultValue: any = null) => {
        const opt = select(label, options, defaultValue);
        return opt && imageDocMap[opt]();
      }
      const src = select('Image URL', srcOptions, null);
      const imageDoc = selectImageDoc('Image Doc', imageDocOptions, null);
      let attrs = `[src]="src"`;

      if (imageDoc) {
        attrs = `[imageDoc]="imageDoc"`;
      }

      console.log('imageDoc::', imageDoc);

      return {
        template: `
          <prx-image ${attrs} ></prx-image>
        `,
        props: {
          src,
          imageDoc
        },
        styles: [
          `
          prx-image {
            width: 100px;
            height: 100px;
            border: 1px solid #444;
          }
          `
        ]
      }
    },
    {
      notes: {
        markdown:`
# Image Loader

The Image Loader Component loads an image from a url or a haldoc.

Because it uses \`background-image\` for display, the prx-image element should
be given a width and a height. It defaults to \`display: inline-block\` but can be
overridden to \`display: block\`.

If src is not given and imageDoc has no prx-image, a placeholder image is shown.
If an error occurs loading src or the prx-image, a placeholder error image is
shown.

----

__Module__ \`ImageModule\`

__Selector__ \`prx-image\`

----

- \`@Input() src: string\` \\- Loads image from url.
- \`@Input() imageDoc: HalDoc\` \\- Load image from a HalDoc containing a \`prx:image\`.

__Note:__ Use one option or the other. When both are used, \`src\` value will
take precedence and its presence, even with a falsey value, can block HalDoc
image from being loaded.

----

## Usage

### Image From URL

\`\`\`html
<prx-image [src]="src"></prx-image>
\`\`\`

### Image From HalDoc

\`\`\`html
<prx-image [imageDoc]="imageDoc"></prx-image>
\`\`\`
`
      }
    }
  );

