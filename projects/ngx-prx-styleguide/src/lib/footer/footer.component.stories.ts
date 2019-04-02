import { storiesOf, moduleMetadata } from '@storybook/angular';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { FooterModule } from './footer.module';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    FooterModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Navigation|Footer', module)
  .addDecorator(withKnobs)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details',
    () => ({
      template: `
      <prx-footer>
        <p>
          And also some footer content, including a <a href="#">link to something</a>.
        </p>
        <a href="#">And also a standalone link</a>
      </prx-footer>
        `,
      props: {},
      styles: []
    }),
    {
      notes: {
        markdown:`
# Footer

The Footer Component provides an HTML5 footer element containing various PRX
links. You can see an example of this footer component in the demo application
below.

Any content inside the prx-footer will be projected into the left-most column.

----

__Module__ \`FooterModule\`

__Selector__ \`prx-footer\`

----

## Usage

\`\`\`html
<prx-footer>
  <p>
    And also some footer content, including a <a href="#">link to something</a>.
  </p>
  <a href="#">And also a standalone link</a>
</prx-footer>
\`\`\`
`
      }
    }
  );
