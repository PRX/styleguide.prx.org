import { Component } from '@angular/core';

@Component({
  selector: 'select-demo',
  template: `
    <section class="main demo">
      <h1>Select</h1>
      <p>
        The Select component is both a straight up replacement for regular HTML
        <code>&lt;select&gt;</code>, and a multi-selector.
      </p>
      <dl>
        <dt>module</dt><dd><code>SelectModule</code></dd>
        <dt>selector</dt><dd><code>prx-select</code></dd>
      </dl>
      <ul>
        <li><code>@Input() selected: string | string[]</code> - Initially selected values</li>
        <li><code>@Input() options: string[] | [string, string][]</code> - Dropdown options</li>
        <li><code>@Input() placeholder: string = ''</code> - placeholder when nothing is selected</li>
        <li><code>@Input() titlemax: number = 4</code> - max number of selected items to show in the field</li>
        <li><code>@Input() maxheight: number = 300</code> - max height in px for the dropdown</li>
        <li><code>@Input() searchable: boolean = false</code> - enable dropdown search field</li>
        <li><code>@Input() selectall: boolean = false</code> - show the select all control</li>
        <li><code>@Input() selectnone: boolean = false</code> - show the unselect all control</li>
        <li><code>@Input() single: boolean = false</code> - use single-select mode</li>
        <li><code>@Output() select: string | string[]</code> - outputs any change to the selected value(s)</li>
      </ul>
      <aside>
        Usage:
        <pre class="code">
          &lt;prx-select [options]="options" (onSelect)="onselect($event)"&gt;&lt;/prx-select&gt;
        </pre>
        Basic Example:
        <div class="container blue">
          <prx-select titlemax=3 [options]="options1" (onSelect)="onselect1($event)"></prx-select>
          <span>Selected = {{selected1}}</span>
        </div><br/>
        Single-select Example:
        <div class="container blue">
          <prx-select single placeholder="Select somethin'" [options]="options2" (onSelect)="onselect2($event)"></prx-select>
          <span>Selected = {{selected2}}</span>
        </div><br/>
        Searchable Example:
        <div class="container blue">
          <prx-select searchable selectall selectnone [options]="options3" (onSelect)="onselect3($event)"></prx-select>
          <span>Selected = {{selected3}}</span>
        </div><br/>
        Disabled Example:
        <div class="container blue">
          <prx-select disabled placeholder="Is disabled" [options]="options3"></prx-select>
        </div><br/>
        Huge number of options example:
        <div class="container blue">
          <prx-select searchable [options]="options4"></prx-select>
        </div>
      </aside>
    </section>
  `,
  styleUrls: ['select-demo.component.css']
})

export class SelectDemoComponent {

  options1 = ['Option first', 'The second option', 'And another long option', 'Final thing'];
  options2 = [['Display 1', 'val1'], ['Display 2', 'val2'], ['Display 3', 'val3']];
  options3 = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'];
  options4 = Array.apply(null, Array(200)).map((x: any, i: number) => `Item #${i}`);

  selected1 = '';
  selected2 = '';
  selected3 = '';

  onselect1(val: string[]) { this.selected1 = val.join(', '); }
  onselect2(val: string) { this.selected2 = val; }
  onselect3(val: string[]) { this.selected3 = val.join(', '); }

}
