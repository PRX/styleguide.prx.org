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
    'Nav Items',
    () => ({
      template: `
        <prx-header>
          <prx-navitem route="/" text="PRX StyleGuide"></prx-navitem>
          <prx-navitem href="https://metrics.prx.org" text="Metrics"></prx-navitem>
        </prx-header>
      `,
      props: {}
    }),
    {
      notes: {
        markdown:`
# Nav Item

The Nav Item Component provides a router link within the application or an href
link outside the application.

----

__Module__ \`HeaderModule\`

__Selector__ \`prx-navitem\`

----

## Usage

### Router Link

\`\`\`html
<prx-navitem route="/" text="PRX StyleGuide"></prx-navitem>
\`\`\`

### Href Link

\`\`\`html
<prx-navitem href="https://metrics.prx.org" text="Metrics"></prx-navitem>
\`\`\`
`
      }
    }
  );
