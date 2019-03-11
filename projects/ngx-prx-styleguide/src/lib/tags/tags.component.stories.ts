import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, number, boolean, array, select, radios, color, date, button } from '@storybook/addon-knobs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TooltipModule } from "ngx-tooltip";
import { TagsComponent } from './tags.component';

import '../../assets/styles/_reset.scss';
import '../../assets/styles/_button.scss';

const componentMetaData = moduleMetadata({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    TooltipModule
  ],
  schemas: [],
  declarations: [TagsComponent],
  providers: [],
});

storiesOf('Forms Controls|Tags', module)
  .addDecorator(withKnobs)
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
          <prx-tags [placeholder]="placeholder" [options]="quickTags" (onChange)="onTagsChange($event)" [selected]="selectedTags" style="min-width: 50vw;"></prx-tags>
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
<prx prx-tags [selected]="selected" [options]="options" (onChange)="onChange($event)"></prx-tags>
\`\`\`
`
      }
    }
  );
