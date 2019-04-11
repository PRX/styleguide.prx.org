import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatusBarModule, iconNames, iconColorOptions } from '../status-bar.module';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, select } from '@storybook/addon-knobs';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    StatusBarModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Navigation|Status Bar/ Status Bar Icon', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const name = select("Icon", iconNames, iconNames[0]);
      const color = select("Color", iconColorOptions, iconColorOptions[0]);

      return {
        template: `
        <prx-status-bar>
          <prx-status-bar-icon [name]="name" [color]="color"></prx-status-bar-icon>
        </prx-status-bar>
        `,
        props: {
          name,
          color
        },
        styles: []
      };
    },
    {
      notes: {
        markdown:
`
# Status Bar Icon

Status bar sub-component to provide icon sized for the status bar.

----

__Module__ \`StatusBarModule\`

__Selector__ \`prx-status-bar-icon\`

----

- \`@Input() name: string\` \\- _(optional)_ Loads SVG with that file name in \`assets/images/icons\`. Setting this will replace child content with file contents, if it can load.
    - __Available Icons__ \\- ${iconNames.join(', ')}
- \`@Input() color: string\` \\- _(optional)_ Sets a specific theme color on the icon. Use this to override inherited coloring.
    - __Color Options__ \\- ${Object.keys(iconColorOptions).map((key) => iconColorOptions[key]).filter((val) => !!val).join(', ')}

----

## Usage

\`\`\`html
<prx-status-bar-icon [name]="name" [color]="color"></prx-icon>
\`\`\`
`
      }
    }
  );

storiesOf('Navigation|Status Bar/Status Bar Icon/Examples', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Simple Section Bar w/ Icon',
    () => ({
      template: `
      <div class="main">
        <prx-status-bar>
          <prx-status-bar-icon name="headphones"></prx-status-bar-icon>
          <prx-status-bar-text bold uppercase>Audio Settings</prx-status-bar-text>
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
  <prx-status-bar-image src="https://placebear.com/40/40"></prx-status-bar-image>
  <prx-status-bar-text bold uppercase>Section</prx-status-bar-text>
  <prx-status-bar-text italic stretch>You are currently in this section.</prx-status-bar-text>
  <prx-status-bar-text>Welcome!</prx-status-bar-text>
</prx-status-bar>
\`\`\`
`
      }
    }
  );