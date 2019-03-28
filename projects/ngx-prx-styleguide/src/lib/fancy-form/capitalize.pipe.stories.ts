import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text } from '@storybook/addon-knobs';
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

storiesOf('Forms Controls|Pipes/Capitalized', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(componentMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const strValue = text('text', 'description is required');

      return {
        template: `
          <span>{{ strValue | capitalize }}</span>
        `,
        props: {
          strValue
        }
      }
    },
    {
      notes: {
        markdown:`
# Capitalize

The Capitalize Pipe is a pipe that transforms string values to have their first letter capitalized. It is most often used on field names and validation messages.


----

__Module__ \`FancyFormModule\`

__Name__ \`capitalize\`

----

### Usage
\`\`\`html
<span>{{ strValue | capitalize }}</span>
\`\`\`
`
      }
    }
  );
