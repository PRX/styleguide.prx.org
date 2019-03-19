import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import { TagsModule } from './tags.module';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
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
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const placeholder = text('Placeholder', 'Type your tag and press Enter...');
      const selectedTags = array('Selected', []);
      const quickTags = array('Options', ['quick', 'tags']);
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

storiesOf('Forms Controls|Inputs/Tags/Examples', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Quick Tags w/ Labeled Values',
    () => ({
      template: `
        <div style="min-width: 50vw;">
          <prx-tags [options]="options" (onChange)="onTagsChange($event)"></prx-tags>
        </div>
      `,
      props: {
        options: [['Label 1', 'value_1'], ['Label 2', 'value_2'], ['Label 2', 'value_2']],
        onTagsChange: action('Tags Changed')
      }
    }),
    {
      notes: {
        markdown: `
### Usage
### Usage
\`\`\`javascript
const options = [['Label 1', 'value_1'], ['Label 2', 'value_2'], ['Label 2', 'value_2']];
const onTagsChange = (val: string[]) => ( console.log('Selection Changed', val) );
\`\`\`

\`\`\`html
<prx-tags [options]="options" (onChange)="onTagsChange($event)"></prx-tags>
\`\`\`
        `
      }
    }
  )
  .add(
    'Quick Tag w/ Tooltips',
    () => ({
      template: `
        <div style="min-width: 50vw;">
          <prx-tags [options]="options" (onChange)="onTagsChange($event)"></prx-tags>
        </div>
      `,
      props: {
        options: [{name: 'Quick Tag', value: 'quick_tag', tooltip: 'Click me to toggle as a selected value.'}],
        onTagsChange: action('Tags Changed')
      }
    }),
    {
      notes: {
        markdown: `
### Usage
### Usage
\`\`\`javascript
const options = [{name: 'Quick Tag', value: 'quick_tag', tooltip: 'Click me to toggle as a selected value.'}];
const onTagsChange = (val: string[]) => ( console.log('Selection Changed', val) );
\`\`\`

\`\`\`html
<prx-tags [options]="options" (onChange)="onTagsChange($event)"></prx-tags>
\`\`\`
        `
      }
    }
  );
