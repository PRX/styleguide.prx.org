import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { centered } from '@storybook/addon-centered/angular';
import { withKnobs, text, array, boolean } from '@storybook/addon-knobs';
import { SelectModule } from './select.module';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    SelectModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Forms Controls|Inputs/Select', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const placeholder = text('Placeholder', 'Select Something...');
      const selectedTags = array('Selected', []);
      const options = array('Options', ['One', 'Two', 'Three', 'Four', 'Five', 'Six']);
      const searchable = boolean('Searchable', false);
      const single = boolean('Single Value', false);
      const closeOnSelect = boolean('Close On Select', false);
      const disabled = boolean('Disabled', false);
      const onSelect = action('Selection Changed');

      return {
        template: `
          <div style="max-width: 50vw;">
            <prx-select
              [placeholder]="placeholder"
              [selected]="selectedTags"
              [options]="options"
              [searchable]="searchable"
              [single]="single"
              [closeOnSelect]="closeOnSelect"
              [disabled]="disabled"
              (onSelect)="onSelect($event)"
            ></prx-select>
          </div>
        `,
        props: {
          placeholder,
          selectedTags,
          options,
          searchable,
          single,
          closeOnSelect,
          disabled,
          onSelect
        }
      }
    },
    {
      notes: {
        markdown:`
# Select

The Select component is both a straight up replacement for regular HTML \`<select>\`, and a multi-selector.



----

__Module__ \`SelectModule\`

__Selector__ \`prx-select\`

----

- \`@Input() selected: string[]\` \\- Initially selected values.
- \`@Input() options: any[] | [string, string][] | object[]\` \\- Dropdown options.
- \`@Input() placeholder: string = ''\` \\- Placeholder when nothing is selected.
- \`@Input() searchable: boolean = false\` \\- Enable dropdown search field.
- \`@Input() single: boolean = ''\` \\- Use single-select mode.
- \`@Input() closeOnSelect: boolean = ''\` \\- Force closing dropdown after a selection on multiselect field.
- \`@Output() onSelect: string | string[]\` \\- Outputs any change to the selected value or values.
`
      }
    }
  );

storiesOf('Forms Controls|Inputs/Select/Examples', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Basic Usage',
    () => ({
      template: `
        <div style="max-width: 50vw;">
          <prx-select [options]="options" (onSelect)="onSelect($event)"></prx-select>
        </div>
      `,
      props: {
        options: ['Dog', 'Cat', 'Hamster', 'Fish', 'Iguana'],
        onSelect: action('Selection Changed')
      }
    }),
    {
      notes: {
        markdown: `
### Usage
\`\`\`javascript
const options = ['Dog', 'Cat', 'Hamster', 'Fish', 'Iguana'];
const onSelect = (val: string[]) => ( console.log('Selection Changed', val) );
\`\`\`

\`\`\`html
<prx-select [options]="options" (onSelect)="onSelect($event)"></prx-select>
\`\`\`
        `
      }
    }
  )
  .add(
    'Single Select w/ Labeled Values',
    () => ({
      template: `
        <div style="max-width: 50vw;">
          <prx-select [options]="options" (onSelect)="onSelect($event)" single></prx-select>
        </div>
      `,
      props: {
        options: [['Label 1', 'value_1'], ['Label 2', 'value_2'], ['Label 2', 'value_2']],
        onSelect: action('Selection Changed')
      }
    }),
    {
      notes: {
        markdown: `
### Usage
### Usage
\`\`\`javascript
const options = [['Label 1', 'value_1'], ['Label 2', 'value_2'], ['Label 2', 'value_2']];
const onSelect = (val: string[]) => ( console.log('Selection Changed', val) );
\`\`\`

\`\`\`html
<prx-select [options]="options" (onSelect)="onSelect($event)" single></prx-select>
\`\`\`
        `
      }
    }
  )
  .add(
    'Searchable w/ Many Options',
    () => ({
      template: `
        <div style="max-width: 50vw;">
          <prx-select [options]="options" (onSelect)="onSelect($event)" searchable></prx-select>
        </div>
      `,
      props: {
        options: Array.apply(null, Array(200)).map((x: any, i: number) => [`Item #${i}`, i]),
        onSelect: action('Selection Changed')
      }
    }),
    {
      notes: {
        markdown: `
### Usage
### Usage
\`\`\`javascript
const options = Array.apply(null, Array(200)).map((x: any, i: number) => [\`Item #\${i}\`, i]);
const onSelect = (val: string[]) => ( console.log('Selection Changed', val) );
\`\`\`

\`\`\`html
<prx-select [options]="options" (onSelect)="onSelect($event)" searchable></prx-select>
\`\`\`
        `
      }
    }
  );

