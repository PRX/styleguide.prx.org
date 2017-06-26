import {Component} from '@angular/core';
import { HalService, HalDoc } from 'ngx-prx-styleguide';

@Component({
  moduleId: module.id,
  selector: 'hero-demo',
  template: `    
    <prx-hero>
      <div class="hero-title">
        <h1>Edit Campaign</h1>
        <div class="campaign">
          <prx-image src="../../assets/images/blue-apron.png"></prx-image>
          <h3>4/1 - 4/31</h3>
        </div>
      </div>
      <div class="hero-info">
        <h2>Blue Apron</h2>
        <p>Due 3/24 (3 days from now)</p>
      </div>
      <div class="hero-actions">
        <button>Save</button>
      </div>
    </prx-hero>
    <section class="main demo">
      <h1>Hero</h1>
      <p>
        The Hero Component shows a banner image, title, status text and navigation elements on individual resource pages
        (for example: a page to take action an individual episode.) On scroll, the hero banner will scroll away but the 
        toolbar will be fixed. An example is shown above.
      </p>
      <p>
        Content projection is used to display information and action buttons within the hero.
        The <code>.hero-title</code> selector shows title content, the <code>.hero-info</code> selector
        shows status text, and the <code>.hero-actions</code> selector shows action buttons.
        The parent component should expect to provide styles for the projected content.
      </p>
      <aside>
        Usage <code>src</code>:
        <pre class="code">
          &lt;prx-hero&gt;
            &lt;div class="hero-title"&gt;&lt;/div&gt;
            &lt;div class="hero-info"&gt;&lt;/div&gt;
            &lt;div class="hero-actions"&gt;&lt;/div&gt;
          &lt;/prx-hero&gt;
        </pre>
        <div [style.height.px]="1000"></div>
      </aside>
    </section>
  `,
  styleUrls: ['hero-demo.component.css']
})

export class HeroDemoComponent {}
