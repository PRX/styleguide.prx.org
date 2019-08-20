import { storiesOf, moduleMetadata } from '@storybook/angular';
import { withKnobs, number } from '@storybook/addon-knobs';
import { Component, ModuleWithProviders } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagingModule } from './paging.module';

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
    PagingModule
  ],
  schemas: [],
  declarations: [StorybookRoutingComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: '' }],
});

storiesOf('Navigation|Paging', module)
  .addDecorator(withKnobs)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details (Knobs)',
    () => {
      const page = 10;
      const currentPage = number('Current Page', page);
      const totalPages = number('Total Pages', 12);
      const showNumPages = number('showNumPages', 6);
      return {
        template: `
        <prx-paging
          [currentPage]="currentPage"
          [totalPages]="totalPages"
          [showNumPages]="showNumPages"
          (showPage)="page = $event">
        </prx-paging>
          `,
        props: {
          currentPage,
          totalPages,
          showNumPages
        },
        styles: []
      };
    },
    {
      notes: {
        markdown: `
# Paging Component

The Paging Component provides a paging component for lists of paged items.

It shows a "window" of pages based on the Input parameter, showNumPages, along with prev, next, first, and last buttons.

----

__Module__ \`PagingModule\`

__Selector__ \`prx-paging\`

----

- \`@Input() currentPage = 1; \` \\- Current Page, defaults to 1
- \`@Input() totalPages: number\` \\- Total Pages
- \`@Input() showNumPages = 5\` \\- _(optional)_ Number of pages to show in window, defaults to 5
- \`@Output() showPage: EventEmitter<number>\` \\- emits page numbers to be shown when they are clicked

## Usage

\`\`\`html
<prx-paging
  [currentPage]="page"
  [totalPages]="totalPages"
  showNumPages="5"
  (showPage)="page = $event">
</prx-paging>
\`\`\`
`
      }
    }
  );
