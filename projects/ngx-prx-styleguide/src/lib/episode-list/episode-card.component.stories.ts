import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, date, text } from '@storybook/addon-knobs';
import { Component, ModuleWithProviders } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EpisodeListModule } from './episode-list.module';

@Component({
  selector: 'prx-storybook-iframe',
  template: ``
})
class StorybookRoutingComponent {}

const routing: ModuleWithProviders = RouterModule.forRoot([
  { path: 'iframe.html', component: StorybookRoutingComponent }
]);

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    RouterModule,
    routing,
    EpisodeListModule
  ],
  schemas: [],
  declarations: [StorybookRoutingComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: '' }],
});

storiesOf('Episode List|Episode Card', module)
  .addDecorator(withKnobs)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const dateFormat = text('Date Format', 'M/d');
      const dateInput = date('Date', new Date());
      const editLink = text('Edit Link', '/story/1234');
      const title = text('Title', 'Very Best Episode');
      const teaser = text('Teaser', 'You don\'t want to miss this');
      const status = text('Status', 'scheduled');
      return {
        template: `
        <prx-episode-card
          [date]="dateInput"
          [dateFormat]="dateFormat"
          [editLink]="editLink"
          [title]="title"
          [teaser]="teaser"
          [status]="status">
          <div>
            Something
          </div>
        </prx-episode-card>
          `,
        props: {
          dateFormat,
          dateInput: new Date(),
          editLink,
          title,
          teaser,
          status
        },
        styles: []
      };
    },
    {
      notes: {
        markdown: `
# Episode Card

The Episode Card Component provides a card component for lists of episodes.

Any content inside the prx-episode-card will be projected into the right-most area.

----

__Module__ \`EpisodeListModule\`

__Selector__ \`prx-episode-card\`

----

- \`@Input() date: Date \` \\- Story date
- \`@Input() dateFormat: string = 'M/d'\` \\- _(optional)_ Story date format
- \`@Input() editLink: string | any[]\` \\- _(optional)_ Router link, typically to story edit page
- \`@Input() title: string\` \\- _(optional)_ If not provided or empty, shows story date instead
- \`@Input() teaser: string\` \\- _(optional)_ If provided, shown below title
- \`@Input() status: 'new' | 'draft' | 'scheduled' | 'published'\` \\- published status

## Usage

\`\`\`html
<prx-episode-card
  [date]="story.publishedAt || story.releasedAt"
  dateFormat="M/d"
  [editLink]="['/story', id]"
  [title]="story.title"
  [teaser]="story.shortDescription"
  [status]="status">
    <a>Edit</a>
</prx-episode-card>
\`\`\`
`
      }
    }
  );
