import { storiesOf, moduleMetadata } from '@storybook/angular';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { HeaderModule } from './header.module';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { ImageModule } from '../image/image.module';
import { SpinnerModule } from '../spinner/spinner.module';

import '../../assets/styles/_layout.scss'

const routing: ModuleWithProviders = RouterModule.forRoot([]);

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    HeaderModule,
    ImageModule,
    RouterModule,
    routing,
    SpinnerModule
  ],
  schemas: [],
  declarations: [],
  providers: [{ provide: APP_BASE_HREF, useValue: "" }],
});

storiesOf('Navigation|Header', module)
  .addDecorator(withKnobs)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Nav User',
    () => {
      const isLoaded = boolean('User Loaded', false);

      return {
        template: `
          <prx-header>
            <prx-navuser [userinfo]="isLoaded && userInfo">
              <prx-image class="user-loaded" src="../../assets/images/user_placeholder.png"></prx-image>
              <prx-spinner class="user-loading"></prx-spinner>
            </prx-navuser>
          </prx-header>
        `,
        props: {
          userInfo: {
            sub: 1,
            preferred_username: 'somebody',
            name: 'Some body',
            href: '',
            apps: {
              'exchange.prx.org': 'https://exchange.prx.org',
              'metrics.prx.org': 'https://metrics.prx.org',
              'publish.prx.org': 'https://publish.prx.org'
            }
          },
          isLoaded
        }
      };
    },
    {
      notes: {
        markdown:`
# Nav User

The Nav User Component typically contains the user image and a user apps
dropdown menu. It has two selectors for projected content, \`.user-loading\` and
\`.user-loaded\`. Typically, the user image is shown when loaded and the
\`prx-spinner\` is used when loading.

----

__Module__ \`HeaderModule\`

__Selector__ \`prx-navuser\`

----

- \`@Input() userinfo: Userinfo\` \\- User info object. See UserinfoService in AuthModule.
- \`.user-loaded\` \\- Content that is shown when username is present.
- \`.user-loading\` \\- Content that is shown when username is not present.

----

## Usage

\`\`\`html
<prx-navuser [userinfo]="userinfo">
  <div class="user-loading">Authenticating...</div>
  <div class="user-loaded">Sign Out</div>
</prx-navuser>
\`\`\`
`
      }
    }
  );
