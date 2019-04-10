import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatusBarModule } from '../status-bar.module';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { centered } from '@storybook/addon-centered/angular';
import { boolean, withKnobs } from '@storybook/addon-knobs';

const routing: ModuleWithProviders = RouterModule.forRoot([]);

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    StatusBarModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Navigation|Status Bar/ Status Bar Text', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const bold = boolean('Bold', false);
      const italic = boolean('Italic', false);
      const uppercase = boolean('Uppercase', false);

      return {
        template: `
        <prx-status-bar>
          <prx-status-bar-text
            [bold]="bold"
            [italic]="italic"
            [uppercase]="uppercase"
          >Here is some text.</prx-status-bar-text>
        </prx-status-bar>
        `,
        props: {
          bold,
          italic,
          uppercase
        },
        styles: []
      };
    },
    {
      notes: {
        markdown:
`
# Status Bar Text

Status bar sub-component to provide text feedback.

----

__Module__ \`StatusBarModule\`

__Selector__ \`prx-status-bar\`

----

- \`@Input bold: any\` \\- Makes text bold. Attribute without value or with truthy value will apply style.
- \`@Input italic: any\` \\- Makes text italic. Attribute without value or with truthy value will apply style.
- \`@Input bold: any\` \\- Makes text upperacse. Attribute without value or with truthy value will apply style.
- \`@Input stretch: any\` \\- Makes container fill available space of toolbar. Multiple stretched text containers will split the space evenly. Attribute without value or with truthy value will apply style.
`
      }
    }
  );

storiesOf('Navigation|Status Bar/Status Bar Text/Examples', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Simple Section Bar',
    () => ({
      template: `
      <div class="main">
        <prx-status-bar>
          <prx-status-bar-text bold uppercase>Section</prx-status-bar-text>
          <prx-status-bar-text italic stretch>You are currently in this section.</prx-status-bar-text>
          <prx-status-bar-text>Welcome!</prx-status-bar-text>
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
  <prx-status-bar-text bold uppercase>Section</prx-status-bar-text>
  <prx-status-bar-text italic stretch>You are currently in this section.</prx-status-bar-text>
  <prx-status-bar-text>Welcome!</prx-status-bar-text>
</prx-status-bar>
\`\`\`
`
      }
    }
  );