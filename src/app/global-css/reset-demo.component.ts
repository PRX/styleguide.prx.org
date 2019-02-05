import {Component} from '@angular/core';

@Component({
  selector: 'reset-demo',
  template: `
    <section class="main demo">
      <h1>CSS reset</h1>
      <p>A style sheet designed to strip initial styles from browsers to help keep designs consistent</p>
      
      <section>
        <ul>
          <li><code>display: block</code> on HTML5 block level elements</li>
          <li>Default border, margin, and padding of zero</li>
          <li><code>vertical-align: baseline</code> is the consistent default</li>
          <li><code>font-size: 100%</code> and <code>font-weight: 400</code> defaults</li>
          <li><code>background: 0 0</code> for consistent default background properties of no background</li>
          <li><code>box-sizing: border-box</code> sizing so the width and height properties (and min/max properties)
            includes content, padding and border, but not the margin</li>
          <li><code>max-width: 100%</code> for responsive <code>embed</code>, <code>img</code>, <code>object</code></li>
          <li><code>list-style: none</code> on <code>ul</code> elements</li>
          <li>
            Remove quotes from <code>blockquote</code> and <code>q</code>
            <aside>Examples: <q>This is an inline <code>q</code>.</q>
              <blockquote>
                Hello, I am a blockquote. My browser provided margin has been zeroed due to this reset.
              </blockquote>
            </aside>
          </li>
          <li>
            <code>text-decoration: line-through</code> on <code>del</code> 
            <del>This text has been deleted from the document.</del>
          </li>
          <li>
            A default <dfn title="dfn example">dotted underline border</dfn> and <abbr title="abbr example">help cursor</abbr> for 
            <code>abbr</code> and <code>dfn</code> elements with <code>title</code> help text
            <aside>
              <code>
                &lt;abbr title="help text"&gt;<abbr 
                  title="abbr should include title attribute for help text">How to</abbr>&lt;/abbr&gt;
              </code>
            </aside>
          </li>
          <li>
            Zero padding, 1em margin, and 1px height and <code>@grey-silver</code> border-top for <code>hr</code> elements
          </li>
          <li>
            Allows unbreakable words to be broken and white space preserved on <code>pre</code> elements
            <aside>
              Example:
              <pre>
                I have line breaks.
                My cat's breath smells like cat food.
              </pre>
            </aside>
          </li>
          <li><small><code>font-size: 85%</code></small> on <code>small</code></li>
          <li><code>font-weight: <strong>700</strong></code> on <code>strong</code></li>
          <li>
            Defaults for <code>table</code>, <code>th</code>, and <code>td</code>
            <aside>
              Example:
              <table>
                <tr><th>things</th><th>stuff</th></tr>
                <tr><td></td><td>non empty cell</td></tr>
              </table>
            </aside>
          </li>
          <li>
            Consistent font-size and top and bottom placement for <code>sup</code> and <code>sub</code> elements
            <aside>
              Examples:
              <blockquote>
                superscript: Everything's comin' up Milhouse!<sup><a href="http://simpsons.wikia.com/wiki/Milhouse_Van_Houten">[src]</a></sup>
              </blockquote>
              <blockquote>
                subscript: H<sub>2</sub>O
              </blockquote>
            </aside>
          </li>
          <li>
            <code>font-family: monospace, sans-serif</code> for 
            <code>code</code>, <code>kbd</code>, <code>pre</code>, and <code>samp</code>
          </li>
          <li>Provide <code>.ie7</code> <code>-ms-interpolation-mode: bicubic</code> <a href="ms-interpolation-mode: bicubic">fix</a></li>
          <li>Provide <code>.clearfix</code> for clearing floats</li>
        </ul>
      </section>
    </section>
  `
})

export class ResetDemoComponent {}
