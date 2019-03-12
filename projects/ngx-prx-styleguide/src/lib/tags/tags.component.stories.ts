import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import { TagsModule } from './tags.module';

// Module metadata for stories.
const componentMetaData = moduleMetadata({
  imports: [
    TagsModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Forms Controls|Inputs/Tags', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(componentMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const placeholder = text('placeholder', 'Type your tag and press Enter...');
      const selectedTags = array('selected', []);
      const quickTags = array('options', ['quick', 'tags']);
      const onTagsChange = action('Tags Changed');

      return {
        template: `
          <div style="min-width: 50vw;">
            <prx-tags [placeholder]="placeholder" [options]="quickTags" (onChange)="onTagsChange($event)" [selected]="selectedTags"></prx-tags>
          </div>
        `,
        props: {
          placeholder,
          selectedTags,
          quickTags,
          onTagsChange
        }
      }
    },
    {
      notes: {
        markdown:`
# Tags

Provides input for providing tags in a structured manner.

----

__Module__ \`TagsModule\`

__Selector__ \`prx-tags\`

----

- \`@Input() selected: string[]\` \\- Initially selected values.
- \`@Input() options: any[] | [string, string][] | object[]\` \\- Preset tags shown as toggles below input.
- \`@Input() placeholder: string = ''\` \\- Placeholder when nothing is selected.
- \`@Output() onChange: string[]\` \\- Outputs any change to the selected values.

----

### Usage
\`\`\`html
<prx-tags [selected]="selected" [options]="options" (onChange)="onChange($event)"></prx-tags>
\`\`\`
`
      }
    }
  );
