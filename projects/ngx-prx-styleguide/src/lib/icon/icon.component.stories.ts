import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { IconModule } from './icon.module';
import { withKnobs, select, text } from '@storybook/addon-knobs';

const req = require.context('../../assets/images/icons/', false, /\.svg$/);
const iconNames = req.keys()
  .map(filename => filename.match(/\/([^\/]+)\.svg$/)[1])
  .filter(name => name.indexOf('ic_') === -1);

console.log(iconNames);

export const iconColorOptions = {
  Default: 'default',
  Primary: 'primary',
  Secondary: 'secondary',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Light: 'light',
  Dark: 'dark',
  'Color in SVG': null,
};

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    IconModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});


storiesOf('Global|Icons', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Default Usage (Knobs)',
    () => {
      const name = select("Icon", iconNames, iconNames[0]);
      const color = select('Color', iconColorOptions, iconColorOptions[0]);
      const size = text('Size', '');

      return {
        template: `
          <div class="main">
            <prx-icon
              [color]="color"
              [size]="size"
              [name]="name"
            ></prx-icon>
          </div>
        `,
        props: {
          name,
          color,
          size
        },
        styleUrls: [
          './icon.component.stories.scss'
        ]
      };
    },
    {
      notes: {
        markdown:
`
# Icon Component

Inline SVG icons are now easy with this component. Load one from the assets directory or use your own inline.

----

__Module__ \`IconsModule\`

__Selector__ \`prx-icon\`

----

- \`@Input() name: string\` \\- _(optional)_ Loads SVG with that file name in \`assets/images/icons\`. Setting this will replace child content with file contents, if it can load.
- \`@Input() color: string\` \\- _(optional)_ Sets a specific theme color on the icon. Use this to override inherited coloring.
    - __Color Options__ \\- default, primary, secondary, info, success, warning, danger, light, dark
- \`@Input() size: string\` \\- _(optional)_ Sets icon to a specific size. Without this set, the icon will fill the parent element. Any valid CSS sizing value can be used, and will be applied to both width and height of the icon.

----

## Usage

\`\`\`html
<prx-icon [name]="name" [color]="color" [size]="size"></prx-icon>
\`\`\`
`
      }
    }
  )
  .add(
    'Custom SVG (Knobs)',
    () => {
      const color = select('Color', iconColorOptions, iconColorOptions[0]);
      const size = text('Size', '');

      return {
        template: `
          <div class="main">
            <prx-icon
              [color]="color"
              [size]="size"
            >
              <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M893 0q240-2 451 120 232 134 352 372l-742-39q-160-9-294 74.5t-185 229.5l-276-424q128-159 311-245.5t383-87.5zm-747 405l337 663q72 143 211 217t293 45l-230 451q-212-33-385-157.5t-272.5-316-99.5-411.5q0-267 146-491zm1586 169q58 150 59.5 310.5t-48.5 306-153 272-246 209.5q-230 133-498 119l405-623q88-131 82.5-290.5t-106.5-277.5zm-836 20q125 0 213.5 88.5t88.5 213.5-88.5 213.5-213.5 88.5-213.5-88.5-88.5-213.5 88.5-213.5 213.5-88.5z"/></svg>
            </prx-icon>
          </div>
        `,
        props: {
          color,
          size
        },
        styleUrls: [
          './icon.component.stories.scss'
        ]
      };
    },
    {
      notes: {
        markdown:
`
## Usage

Wrap custom one-off icon SVG's to apply consistent sizing and color themes.

\`\`\`html
<prx-icon [color]="color" [size]="size">
  <!-- Your Custom One-off SVG here -->
</prx-icon>
\`\`\`
`
      }
    }
  );


storiesOf('Global|Icons/Examples', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Link Hover',
    () => {
      return {
        template: `
          <a><prx-icon size="1.5em" name="plus" ></prx-icon> Add A Thing</a>
        `,
        props: {},
        styles: [
          `
          a { cursor: pointer; }
          `
        ]
      };
    },
    {
      notes: {
        markdown:
`
## Usage

Leave off color attribute to inherit coloring from link and button state changes, such as hover.

\`\`\`html
<a><prx-icon size="1.5em" name="plus" ></prx-icon> Add A Thing</a>
\`\`\`
`
      }
    }
  );