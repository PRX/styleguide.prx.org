import { storiesOf, moduleMetadata } from '@storybook/angular';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { HeroModule } from './hero.module';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    HeroModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Navigation|Hero', module)
  .addDecorator(withKnobs)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details',
    () => ({
      template: `
        <div class="header"></div>
          <div class="main">
            <prx-hero>
              <div class="hero-title">
                <h1>Edit Campaign</h1>
              </div>
              <div class="hero-info">
                <h2>Blue Apron</h2>
                <p>Due 3/24 (3 days from now)</p>
              </div>
              <div class="hero-actions">
                <button>Save</button>
              </div>
            </prx-hero>
          </div>
        `,
      props: {},
      styles: [
        `
        .main {
          height: 150vh;
          padding-top: 73px;
        }
        .main >>> section {
          padding-left: 30px;
          padding-right: 30px;
        }
        .header {
          position: fixed;
          width: 100vw;
          height: 73px;
          background: #1a1a1a;
        }
        `
      ]
    }),
    {
      notes: {
        markdown:`
# Hero

The Hero Component shows a banner image, title, status text and navigation
elements on individual resource pages (for example: a page to take action an
individual episode.) On scroll, the hero banner will scroll away but the toolbar
will be fixed. An example is shown above.

Content projection is used to display information and action buttons within the
hero. Some deep style selectors are provided, but the parent component should
also expect to provide styles for the projected content.

----

__Module__ \`HeroModule\`

__Selector__ \`prx-hero\`

----

- \`.hero-title\` \\- Main hero title content.
- \`.hero-info\` \\- Status content in left side of toolbar.
- \`.hero-actions\` \\- Action buttons in right side of toolbar.

----

## Usage

\`\`\`html
<prx-hero>
  <div class="hero-title">
    <h1>Edit Campaign</h1>
  </div>
  <div class="hero-info">
    <h2>Blue Apron</h2>
    <p>Due 3/24 (3 days from now)</p>
  </div>
  <div class="hero-actions">
    <button>Save</button>
  </div>
</prx-hero>
\`\`\`
`
      }
    }
  );
