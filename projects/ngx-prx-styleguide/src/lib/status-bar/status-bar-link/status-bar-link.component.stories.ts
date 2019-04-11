import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatusBarModule } from '../status-bar.module';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { centered } from '@storybook/addon-centered/angular';
import { boolean, withKnobs, select } from '@storybook/addon-knobs';
import { IconModule } from '../../icon/icon.module';
import { ImageModule } from '../../image/image.module';

const routing: ModuleWithProviders = RouterModule.forRoot([]);

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

storiesOf('Navigation|Status Bar/ Status Bar Link', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const decoration = select('Show Decorator', ['None', 'Icon', 'Image'], 'None');
      const showIcon = (decoration === 'Icon');
      const showImage = (decoration === 'Image');
      const alignArt = decoration !== 'None' && select('Align Art', {Left: 'left', Right: 'right'}, 'left');

      return {
        template: `
        <prx-status-bar>
          <a prx-status-bar-link [alignArt]="alignArt">
            <prx-status-bar-icon name="menu" *ngIf="showIcon"></prx-status-bar-icon>
            <prx-status-bar-image src="https://placebear.com/40/40" *ngIf="showImage"></prx-status-bar-image>
            Click Me
          </a>
        </prx-status-bar>
        `,
        props: {
          showIcon,
          showImage,
          alignArt
        },
        styles: []
      };
    },
    {
      notes: {
        markdown:
`
# Status Bar Link

Status bar sub-component to use in place of \`prx-status-bar-text\` to provide
link styling and layout to text and other sub-components.

Links should be an \`<a>\` element to allow application to attach its own link
attributes, such as \`[href]\` or \`[routerLink]\`.

Links can be composed of text and/or an art element (\`prx-status-bar-icon\` or
\`prx-status-bar-image\`).

----

__Module__ \`StatusBarModule\`

__Selector__ \`a[prx-status-link]\`

----

- \`@Input alignArt: string\` \\- Set to \`'right'\` to shift art to the right-side of link.
`
      }
    }
  );

storiesOf('Navigation|Status Bar/Status Bar Link/Examples', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Page Header Bar w/ Social Links',
    () => ({
      template: `
      <div class="main">
        <prx-status-bar>
          <prx-status-bar-text bold uppercase>Welcome</prx-status-bar-text>
          <prx-status-bar-text italic stretch>Thanks for visiting our site.</prx-status-bar-text>
          <a prx-status-bar-link alignArt="right" href="https://www.facebook.com/PRXOfficial/" target="_blank">
            <prx-status-bar-icon name="facebook" aria-label="Our Facebook Page"></prx-status-bar-icon>
          </a>
          <a prx-status-bar-link alignArt="right" href="https://twitter.com/prx" target="_blank">
            <prx-status-bar-icon name="twitter" aria-label="Our Twitter Page"></prx-status-bar-icon>
          </a>
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
  <prx-status-bar-text bold uppercase>Welcome</prx-status-bar-text>
  <prx-status-bar-text italic stretch>Thanks for visiting our site.</prx-status-bar-text>
  <a prx-status-bar-link alignArt="right" href="https://www.facebook.com/PRXOfficial/" target="_blank">
    <prx-status-bar-icon name="facebook" aria-label="Our Facebook Page"></prx-status-bar-icon>
  </a>
  <a prx-status-bar-link alignArt="right" href="https://twitter.com/prx" target="_blank">
    <prx-status-bar-icon name="twitter" aria-label="Our Twitter Page"></prx-status-bar-icon>
  </a>
</prx-status-bar>
\`\`\`
`
      }
    }
  )
  .add(
    'Episode Status Bar w/ Series Link and Back Button',
    () => ({
      template: `
      <div class="main">
      <div class="main">
        <prx-status-bar>
          <a prx-status-bar-link routerLink="/">
            <prx-status-bar-icon name="chevron-left" aria-label="Return To Home"></prx-status-bar-icon>
          </a>
          <prx-status-bar-text bold uppercase>Episode</prx-status-bar-text>
          <prx-status-bar-text italic stretch>Honey, your puns are tearing this relationship apart</prx-status-bar-text>
          <a prx-status-bar-link routerLink="/series/12344" alignArt="right"><prx-status-bar-image src="https://placebear.com/40/40" alignAart="right"></prx-status-bar-image>Bearly Bearable</a>
        </prx-status-bar>
      </div>
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
  <prx-status-bar-text bold uppercase>Welcome</prx-status-bar-text>
  <prx-status-bar-text italic stretch>Thanks for visiting our site.</prx-status-bar-text>
  <a prx-status-bar-link alignArt="right" href="https://www.facebook.com/PRXOfficial/" target="_blank">
    <prx-status-bar-icon name="facebook" aria-label="Our Facebook Page"></prx-status-bar-icon>
  </a>
  <a prx-status-bar-link alignArt="right" href="https://twitter.com/prx" target="_blank">
    <prx-status-bar-icon name="twitter" aria-label="Our Twitter Page"></prx-status-bar-icon>
  </a>
</prx-status-bar>
\`\`\`
`
      }
    }
  );