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
          <a prx-status-bar-link routerLink="/some/place">
            <prx-icon name="chevron-left"></prx-icon>
          </a>
          <prx-status-bar-text bold uppercase>Episode</prx-status-bar-text>
          <prx-status-bar-text italic stretch>Honey, your puns are tearing this relationship apart</prx-status-bar-text>
          <a prx-status-bar-link routerLink="/series/12344">Bearly Bearable <prx-image src="https://placebear.com/40/40"></prx-image></a>
        </prx-status-bar>
      </div>
      `,
      props: {},
      styles: [
        `
        :host {
          --header-height: 50px;
        }
        .main {
          width: 90vw;
        }
        `
      ]
    })
  );