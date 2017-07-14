import {Component} from '@angular/core';

@Component({
  selector: 'button-demo',
  template: `
    <section class="main demo">
      <h1>Button</h1>
      <p>A style sheet for buttons (and some things that act and look like buttons.) PRX buttons have a flat 
        appearance with no border radius, drop shadow, or gradient.</p>
      
      <section>
        <h2>A note on .button:</h2>
        <ul>
          <li><code>&lt;a class="button"&gt;</code> can be used to open external links</li>
          <li><code>&lt;label class="button"&gt;</code> can be used as button like labels such as on image upload</li>
          <li>Non buttons with <code>class="button"</code> is otherwise discouraged for accessibility</li>
        </ul>
      </section>
      
      <section>
        <h2>Button, .button, and some support for input type=button|submit|reset</h2>
        <ul>
          <li><code>flex-grow: 0.5</code>, <code>flex-shrink: 1</code>, and <code>flex-basis: auto</code></li>
          <li><code>margin: 0</code></li>
          <li><code>font-size: 100%</code></li>
          <li>No outline</li>
          <li>Base <code>padding: @padding-base</code> of 10px</li>
          <li><code>cursor: pointer</code> to indicate clickable</li>
          <li><code>width: auto</code></li>
          <li><code>overflow: visible</code></li>
          <li><code>border: 1px solid transparent</code></li>
          <li><code>display: inline-block</code></li>
          <li><code>position: relative</code></li>
          <li><code>text-align: center</code></li>
          <li><code>color: @white</code></li>
          <li><code>background-color: @blue</code> with <code>background-color: @blue-emphasis</code> on <code>:hover</code></li>
          <li>When disabled <code>background-color: @blue-emphasis</code> with <code>color: @blue-muted</code></li>
        </ul>
        <aside>
          Example:
          <button>Click me</button>
        </aside>
      </section>
      
      <section>
        <h2>Button Link, i.e. <code>&lt;a class="button"&gt;</code></h2>
        <p>Sometimes you need a link that looks like a button, such as for opening external URLs</p>
        <ul>
          <li><code>background-color: @blue</code> with <code>background-color: @blue-emphasis</code> on <code>:hover</code></li>
          <li><code>color: @white</code></li>
          <li><code>line-height: 17px</code></li>
        </ul>
        <aside>
          Example:
          <a class="button" href="http://somewhere.else">Maybe Don't Click</a>
        </aside>
      </section>
      
      <section>
        <h2>Link Button, i.e. <code>&lt;button class="btn-link"&gt;</code></h2>
        <p>Sometimes you need a button with click behavior that looks like a link, such as for paging results</p>
        <ul>
          <li>The link button has <code>color: @blue</code> and on <code>:hover color: @blue-emphasis</code></li>
          <li>When given the class <code>active</code>, the link button has color: <code>@blue-emphasis</code></li>
          <li>When disabled, the button has <code>color: @grey-silver</code></li>
          <li><code>vertical-align: baseline</code></li>
          <li><code>padding: 0</code></li>
          <li><code>border: 0</code></li>
          <li><code>background: 0 0 transparent</code></li>
        </ul>
        <aside>
          Example:
          <button class="btn-link">Click me</button>
        </aside>
      </section>
      
      <section>
        <h2>Icon Button, i.e. <code>&lt;button class="btn-icon"&gt;</code></h2>
        <p>
          An Icon Button is a button that shows a font icon. 
          The content of the <code>::before</code> pseudo element is set to the unicode character of the desired icon 
          by the font icon library CSS.
        </p>
        <ul>
          <li>The button is given the class <code>btn-icon</code> along with a class corresponding to the desired icon</li>
          <li><code>background: none</code>
          <li><code>font-size: 22px</code></li>
          <li><code>padding: 0</code></li>
          <li>The button has <code>margin: @margin-base</code> of 10px but the pseudo <code>::before</code> element has no margins</li>
          <li>The font icon has <code>color: @blue</code> and on <code>:hover color: @blue-emphasis</code></li>
          <li>When disabled, the button has <code>color: @grey-silver</code></li>
          <li>For accessibility, the icon should be given alternative text for screen readers with <code>aria-label</code></li>
          <li>See <a [routerLink]="['/global/icons']">icon reference</a> for available icons</li>
        </ul>
        <aside>
          Example:
          <pre class="code">&lt;button class="btn-icon icon-cancel"&gt;&lt;/button&gt;</pre>
          <button class="btn-icon icon-cancel" aria-label="Cancel"></button>
          <pre class="code">&lt;button disabled class="btn-icon icon-cancel"&gt;&lt;/button&gt;</pre>
          <button class="btn-icon icon-cancel" disabled aria-label="Cancel"></button>
        </aside>
        <h3>Button with Icon and Text</h3>
        <p>
          If you want to make a button with an icon and text. Use a <code>span</code> with the icon class inside the button.
          The icon itself should be given <code>aria-hidden="true"</code> for screen reader accesibility.
        </p>
        <aside>
          Example:
          <pre class="code">&lt;button&gt;&lt;span class="icon-plus white" aria-hidden="true" &gt; New Series&lt;/button&gt;</pre>
          <button><span class="icon-plus white" aria-hidden="true"></span> New Series</button>
        </aside>
      </section>
  
      <section>
        <h2>Delete Button, i.e. <code>&lt;button class="delete"&gt;</code></h2>
        <ul>
          <li><code>color: @white</code></li>
          <li><code>background-color: @red</code> with <code>background-color: @red-emphasis</code> on <code>:hover</code></li>
        </ul>
        <aside>
          Example:
          <button class="delete">Delete</button>
        </aside>
      </section>
  
      <section>
        <h2>Up-Down Toggle Button</h2>
        <p>
          An Up-Down Toggle is a triangle-shaped type of button used as an asc/desc toggle.
          It appears as a button but is implemented as a "checkbox hack" with an invisible checkbox and a label with borders 
          styled to look like a triangle pointing up or down.
          Up-Down is also a chain of vintage arcade bars, but that is neither here nor there.
        </p>
        <ul>
          <li>The checkbox and label should be sibling elements</li>
          <li>The label will <code>float: right</code> inside its container</li>
          <li>Gie the container the class <code>clearfix</code> (from <a routerLink="/global/reset">Reset CSS</a>) to clear the float</li>
          <li>The label should use the for attribute pointing to the id of checkbox so that clicking activates the checkbox</li>
          <li>A checkbox with class <code>updown-toggle</code> will have <code>display:none</code></li>
          <li>The label has <code>margin: 8px 0 8px 4px</code></li>
          <li>
            The label sibling to the checkbox when checked will point down having a width and height of zero, border-left and
            border-right of <code>8px solid transparent</code>, border-top of <code>8px solid @blue</code>, and border-bottom of zero.
          </li>
          <li>
            The label sibling to the checkbox when not checked will point up having a width and height of zero, border-left and 
            border-right of <code>8px solid transparent</code>, border-bottom of <code>8px solid @blue</code>, and border-top of zero.
          </li>
        </ul>
        <aside>
          Example:
          <div style="width:60px" class="clearfix">
            <span>{{ down ? 'Down' : 'Up'}}</span>
            <input id="updown" type="checkbox" class="updown-toggle" [(ngModel)]="down">
            <label for="updown"></label>
          </div>
          <pre class="code">
            &lt;div class="clearfix"&gt;
              &lt;input id="updown" type="checkbox" class="updown-toggle"&gt;
              &lt;label for="updown"&gt;&lt;/label&gt;
            &lt;/div&gt;
          </pre>
        </aside>
      </section>
    </section>
  `
})

export class ButtonDemoComponent {
  down: boolean;
}
