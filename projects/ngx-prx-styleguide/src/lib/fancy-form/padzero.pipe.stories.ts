import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, number } from '@storybook/addon-knobs';
import { FancyFormModule } from './fancy-form.module';

// Module metadata for stories.
const componentMetaData = moduleMetadata({
  imports: [
    FancyFormModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Forms Controls|Pipes/PadZero', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(componentMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const intNumber = number('Number', 5);
      const intPadLength = number('Pad Length', 2);

      return {
        template: `
          <span>{{ intNumber | padzero:intPadLength }}</span>
        `,
        props: {
          intNumber,
          intPadLength
        }
      }
    },
    {
      notes: {
        markdown:`
# PadZero

The Pad Zero Pipe is a pipe that transforms values to be left zero padded to the given length.

----

__Module__ \`FancyFormModule\`

__Name__ \`padzero\`

----

## Usage
\`\`\`html
<span>{{ intNumber | capitalize:intPadLength }}</span>
\`\`\`
`
      }
    }
  );
