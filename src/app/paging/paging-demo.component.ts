import { Component } from '@angular/core';

@Component({
  selector: 'app-paging-demo',
  template: `
    <section class="main demo">
      <h1>Paging</h1>
      <prx-paging
        [currentPage]="page"
        totalPages="12"
        showNumPages="5"
        (showPage)="page = $event">
      </prx-paging>
    </section>
  `,
  styles: ['.changed { padding-left: 20px; font-style: italic;}']
})
export class PagingDemoComponent {

  page = 2;
}
