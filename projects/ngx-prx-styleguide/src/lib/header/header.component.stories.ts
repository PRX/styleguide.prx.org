import { storiesOf, moduleMetadata } from '@storybook/angular';
import { HeaderModule } from './header.module';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

const routing: ModuleWithProviders = RouterModule.forRoot([]);

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    HeaderModule,
    RouterModule,
    routing
  ],
  schemas: [],
  declarations: [],
  providers: [{ provide: APP_BASE_HREF, useValue: "" }],
});

storiesOf('Navigation|Header', module)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Base Usage',
    () => ({
      template: `
        <prx-header></prx-header>
      `,
      props: {}
    }),
    {
      notes: {
        markdown:`
# Header

The Header Component is a fixed position navigation bar that shows a home logo
link and supports other navigation items using projected content. You can see an
example of this header component in use in the navigation bar above.

----

__Module__ \`HeaderModule\`

__Selector__ \`prx-header\`

----

## Usage

\`\`\`html
<prx-header>
  <!-- Add nav items here. -->
</prx-header>
\`\`\`
`
      }
    }
  );
