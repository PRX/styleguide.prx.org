import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { IconModule } from './icon.module';
import { withKnobs, select, text } from '@storybook/addon-knobs';

const req = require.context('../../assets/images/icons/', false, /\.svg$/);
export const iconNames = req.keys()
  // Convert filenames to icon names.
  .map(filename => filename.match(/\/([^\/]+)\.svg$/)[1])
  // Filter out legacy colorized icons.
  .filter(name => name.indexOf('ic_') === -1);

export const iconColorOptions = {
  Inherit: null,
  Default: 'default',
  Primary: 'primary',
  Secondary: 'secondary',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Light: 'light',
  Dark: 'dark',
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
              class="foo"
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

__Module__ \`IconModule\`

__Selector__ \`prx-icon\`

----

- \`@Input() name: string\` \\- _(optional)_ Loads SVG with that file name in \`assets/images/icons\`. Setting this will replace child content with file contents, if it can load.
    - __Available Icons__ \\- ${iconNames.join(', ')}
- \`@Input() color: string\` \\- _(optional)_ Sets a specific theme color on the icon. Use this to override inherited coloring.
    - __Color Options__ \\- ${Object.keys(iconColorOptions).map((key) => iconColorOptions[key]).filter((val) => !!val).join(', ')}
- \`@Input() size: string\` \\- _(optional)_ Sets icon to a specific size. Without this set, the icon will fill the parent element. Any valid CSS sizing value can be used, and will be applied to both width and height of the icon.

----

## Usage

\`\`\`html
<prx-icon [name]="name" [color]="color" [size]="size"></prx-icon>
\`\`\`

----

## Adding New Icons

1. Place the icon file in \`assets/images/icons\`.
2. start using the filename (without \`.svg\`) in the \`name\` input.
3. Done!

Icons should be readable at 16px in size and work as a single color. Multicolor
icons can be used, but if \`color\` input is set, fill colors in the SVG are
stripped out when loaded, so overlapping shapes or different colors will appear
to merge together.
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
            <prx-icon [size]="size">
              <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path style="fill:#82D889;" d="M256,386.648c-25.6,0-49.434-7.062-70.621-21.186c-21.186-14.124-37.076-31.779-47.669-53.848 L31.779,128C9.71,167.724,0,210.979,0,256c0,64.441,21.186,120.055,62.676,167.724s93.572,75.917,155.366,85.628l74.152-128.883 C285.131,383.117,271.89,386.648,256,386.648"/>
                <path style="fill:#E86438;" d="M175.669,150.069c23.834-18.538,50.317-26.483,80.331-26.483h219.807 c-22.952-38.841-53.848-67.09-92.69-89.159C344.276,11.476,301.903,0,256,0c-39.724,0-77.683,8.828-112.11,25.6 S76.8,67.09,53.848,98.869L128,220.69C135.062,192.441,151.834,168.607,175.669,150.069"/>
                <path style="fill:#FCE056;" d="M492.579,159.779H344.276c25.6,25.6,43.255,59.145,43.255,96.221 c0,27.366-7.945,52.083-22.952,75.034L258.648,512c69.738-0.883,129.766-25.6,179.2-75.917S512,325.738,512,256 C512,223.338,506.703,188.91,492.579,159.779"/>
                <path style="fill:#25B9E1;" d="M256,158.897c52.966,0,97.103,44.138,97.103,97.103S308.966,353.103,256,353.103 S158.897,308.966,158.897,256S203.034,158.897,256,158.897"/>
              </svg>
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
Coloring will only affect paths that do not have a fill color.

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