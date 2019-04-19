import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatusBarModule } from './status-bar.module';
import { IconModule } from '../icon/icon.module';
import { ImageModule } from '../image/image.module';
import { centered } from '@storybook/addon-centered/angular';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    StatusBarModule,
    IconModule,
    ImageModule
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