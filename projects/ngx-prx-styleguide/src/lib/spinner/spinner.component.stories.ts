import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, array, boolean, number } from '@storybook/addon-knobs';
import { SpinnerModule } from './spinner.module';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    SpinnerModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

const storyStyles = `
  .wrapper {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 50vh auto;
    background: #0089bd;
  }
  .inverse {
    background: none;
  }
`;

storiesOf('Utilities|Spinner', module)
  .addDecorator(withKnobs)
  // .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const spinning = boolean('Spinning', true);
      const delay = number('Delay', 300);
      const inverse = boolean('Inverse', false);
      const overlay = boolean('Overlay', false);
      const overlayFixed = boolean('Overlay Fixed', false);
      const loadingMessage = text('Loading Message', '');

      return {
        template: `
          <div class="wrapper">
            <prx-spinner
              [spinning]="spinning"
              [delay]="delay"
              [inverse]="inverse"
              [overlay]="overlay"
              [overlayFixed]="overlayFixed"
              [loadingMessage]="loadingMessage"
            ></prx-spinner>
          </div>
        `,
        props: {
          spinning,
          delay,
          inverse,
          overlay,
          overlayFixed,
          loadingMessage
        },
        styles: [storyStyles]
      }
    },
    {
      notes: {
        markdown:`
# Spinner

The Spinner Component shows a loading indicator. Typically the spinner is
displayed with \`*ngIf\` until a resource has finished loading.

The animation uses \`position: absolute\`, so it should be inside a
\`position: relative\` container.

----

__Module__ \`SpinnerModule\`

__Selector__ \`prx-spinner\`

----

- \`@Input() spinning: boolean\` \\- Toggles spinner visibility.
- \`@Input() delay: number = 300\` \\- Delay before spinner should shown.
- \`@Input() inverse: boolean = false\` \\- Give spinner a grey background color.
- \`@Input() overlay: boolean = false\` \\- Show the spinner with an absolutely positioned overlay behind.
- \`@Input() overlayFixed: boolean = false\` \\- Show the overlay with fixed positioning.
- \`@Input() loadingMessage: string\` \\- _(optional)_ Message to show over spinner.

----

## Usage
\`\`\`html
<prx-spinner
  [spinning]="spinning"
  [delay]="delay"
  [inverse]="inverse"
  [overlay]="overlay"
  [overlayFixed]="overlayFixed"
  [loadingMessage]="loadingMessage"
></prx-spinner>
\`\`\`
`
      }
    }
  );

storiesOf('Utilities|Spinner/Examples', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Loading Message',
    () => ({
      template: `
        <div class="wrapper">
          <prx-spinner loadingMessage="Please wait..." ></prx-spinner>
        </div>
      `,
      props: {},
      styles: [storyStyles]
    }),
    {
      notes: {
        markdown:`
## Usage

\`\`\`html
<prx-spinner loadingMessage="Please wait..." ></prx-spinner>
\`\`\`
`
      }
    }
  )
  .add(
    'Inverse',
    () => ({
      template: `
        <div class="wrapper inverse">
          <prx-spinner inverse="true"></prx-spinner>
        </div>
      `,
      props: {},
      styles: [storyStyles]
    }),
    {
      notes: {
        markdown:`
## Usage

\`\`\`html
<prx-spinner inverse="true"></prx-spinner>
\`\`\`
`
      }
    }
  );

