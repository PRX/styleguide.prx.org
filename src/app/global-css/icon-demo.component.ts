import {Component} from '@angular/core';

@Component({
  selector: 'icon-demo',
  template: `
    <section class="main demo">
      <h1>icons</h1>
      <p>A style sheet used to provide an SVG icon set.</p>
      <section>
        <ul>
          <li>Elements are given the class name of the icon to be shown as a background image</li>
          <li>
            Default icon size is 1em. Because of our legacy font icons, it is common to adjust icon size with font-size,
            but icons will also adjust to the size of the element because they have <code>background-size: cover</code>
          </li>
          <li>
            Default icon color is our <code>blue</code> with <code>blue-emphasis</code> on <code>hover</code> and <code>focus</code>
          </li>
          <li>
            Some icons also provide a <code>grey-dove</code> option
            with <code>grey-darkest</code> on <code>hover</code> and <code>focus</code>
          </li>
          <li>Some icons also provide a <code>white</code> option</li>
          <li>Only one color is provided for social icons to match their branding</li>
          <li>If the <code>disabled</code> attribute is present, app icons will be shown as <code>grey-silver</code></li>
          <li>Standalone Icons used as buttons should be given an <code>aria-label</code> for screen reader accessibility</li>
          <li>Supplementary Icons should be given an <code>aria-hidden="true"</code> for screen reader accessibility</li>
        </ul>
        <aside>
          <h3><code>icon-calendar</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-calendar"&gt;&lt;/span&gt;
            &lt;span class="icon-calendar grey-dove"&gt;&lt;/span&gt;
            &lt;span class="icon-calendar" disabled&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-calendar"></span>
          <span class="icon-calendar grey-dove"></span>
          <span class="icon-calendar" disabled></span>
        </aside>
        <aside>
          <h3><code>icon-cancel</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-cancel"&gt;&lt;/span&gt;
            &lt;span class="icon-cancel grey-dove"&gt;&lt;/span&gt;
            &lt;span class="icon-cancel" disabled&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-cancel"></span>
          <span class="icon-cancel grey-dove"></span>
          <span class="icon-cancel" disabled></span>
        </aside>
        <aside>
          <h3><code>icon-cw</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-cw"&gt;&lt;/span&gt;
            &lt;span class="icon-cw" disabled&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-cw"></span>
          <span class="icon-cw" disabled></span>
        </aside>
        <aside>
          <h3><code>icon-down-dir</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-down-dir"&gt;&lt;/span&gt;
            &lt;span class="icon-down-dir" disabled&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-down-dir"></span>
          <span class="icon-down-dir" disabled></span>
        </aside>
        <aside>
          <h3><code>icon-globe</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-globe"&gt;&lt;/span&gt;
            &lt;span class="icon-globe grey-darkest"&gt;&lt;/span&gt;
            &lt;span class="icon-globe" disabled&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-globe"></span>
          <span class="icon-globe grey-darkest"></span>
          <span class="icon-globe" disabled></span>
        </aside>
        <aside>
          <h3><code>icon-headphones</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-headphones"&gt;&lt;/span&gt;
            &lt;span class="icon-headphones grey-darkest"&gt;&lt;/span&gt;
            &lt;span class="icon-headphones" disabled&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-headphones"></span>
          <span class="icon-headphones grey-darkest"></span>
          <span class="icon-headphones" disabled></span>
        </aside>
        <aside>
          <h3><code>icon-facebook-official</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-facebook-official"&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-facebook-official"></span>
        </aside>
        <aside>
          <h3><code>icon-mail-alt</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-mail-alt"&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-mail-alt"></span>
        </aside>
        <aside>
          <h3><code>icon-menu</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-menu"&gt;&lt;/span&gt;
            &lt;span class="icon-menu grey-dove"&gt;&lt;/span&gt;
            &lt;span class="icon-menu" disabled&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-menu"></span>
          <span class="icon-menu grey-dove"></span>
          <span class="icon-menu" disabled></span>
        </aside>
        <aside>
          <h3><code>icon-play</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-play"&gt;&lt;/span&gt;
            &lt;span class="icon-play" disabled&gt;&lt;/span&gt;
            &lt;button&gt;
              &lt;span class="icon-play white" aria-label="Play"&gt;&lt;/span&gt;
            &lt;/button&gt;
          </pre>
          Example:
          <span class="icon-play"></span>
          <span class="icon-play" disabled></span>
          <button>
            <span class="icon-play white" aria-label="Play"></span>
          </button>
        </aside>
        <aside>
          <h3><code>icon-plus</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-plus"&gt;&lt;/span&gt;
            &lt;span class="icon-plus" disabled&gt;&lt;/span&gt;
            &lt;button&gt;
              &lt;span class="icon-plus white" aria-label="Add New"&gt;&lt;/span&gt;
            &lt;/button&gt;
          </pre>
          Example:
          <span class="icon-plus"></span>
          <span class="icon-plus" disabled></span>
          <button>
            <span class="icon-plus white" aria-label="Add New"></span>
          </button>
        </aside>
        <aside>
          <h3><code>icon-right-dir</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-right-dir"&gt;&lt;/span&gt;
            &lt;span class="icon-right-dir" disabled&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-right-dir"></span>
          <span class="icon-right-dir" disabled></span>
        </aside>
        <aside>
          <h3><code>icon-smartphone</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-smartphone"&gt;&lt;/span&gt;
            &lt;span class="icon-smartphone grey-darkest"&gt;&lt;/span&gt;
            &lt;span class="icon-smartphone" disabled&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-smartphone"></span>
          <span class="icon-smartphone grey-darkest"></span>
          <span class="icon-smartphone" disabled></span>
        </aside>
        <aside>
          <h3><code>icon-speedometer</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-speedometer"&gt;&lt;/span&gt;
            &lt;span class="icon-speedometer grey-darkest"&gt;&lt;/span&gt;
            &lt;span class="icon-speedometer" disabled&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-speedometer"></span>
          <span class="icon-speedometer grey-darkest"></span>
          <span class="icon-speedometer" disabled></span>
        </aside>
        <aside>
          <h3><code>icon-twitter</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-twitter"&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-twitter"></span>
        </aside>
        <aside>
          <h3><code>icon-up-dir</code></h3>
          Usage:
          <pre>
            &lt;span class="icon-up-dir"&gt;&lt;/span&gt;
            &lt;span class="icon-up-dir" disabled&gt;&lt;/span&gt;
          </pre>
          Example:
          <span class="icon-up-dir"></span>
          <span class="icon-up-dir" disabled></span>
        </aside>
      </section>
    </section>
  `
})

export class IconDemoComponent {}
