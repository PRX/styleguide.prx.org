import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatusBarModule } from './status-bar.module';
import { IconModule } from '../icon/icon.module';
import { ImageModule } from '../image/image.module';
import { ModuleWithProviders } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { centered } from '@storybook/addon-centered/angular';

const routing: ModuleWithProviders = RouterModule.forRoot([]);

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    StatusBarModule,
    IconModule,
    ImageModule,
    // Uncomment following line to verify routerLinks function. Comment to keep hotreload functional.
    // routing
  ],
  schemas: [],
  declarations: [],
  providers: [{ provide: APP_BASE_HREF, useValue: "" }],
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