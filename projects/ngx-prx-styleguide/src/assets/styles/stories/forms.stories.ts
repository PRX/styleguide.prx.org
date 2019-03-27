import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [],
  schemas: [],
  declarations: [],
  providers: [],
});

storiesOf('Global|CSS', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Forms',
    () => ({
      styleUrls: [
        '../../../../../../src/styles.css'
      ],
      template: `
        <section class="main demo">
          <h1>Forms</h1>
          <p>A style sheet for form element look and feel</p>

          <section>
            <h2>Form</h2>
            <ul>
              <li><code>display: flex</code> with the following flex properties</li>
              <li><code>box-orient: horizontal</code> to lay out items horizontally</li>
              <li><code>box-lines: multiple</code> to allow items to lay out in multiple rows</li>
              <li><code>flex-flow: row wrap</code> to lay out items left to right with wrapping</li>
              <li>
                <code>justify-content: flex-start</code>, <code>box-pack: start</code>, and <code>align-content: start</code>
                to pack items at the start
              </li>
              <li><code>align-items: baseline</code> to lay out items such that their baselines align</li>
            </ul>
          </section>

          <section>
            <h2>Label</h2>
            <ul>
              <li><code>flex-grow: 0</code>, <code>flex-shrink: 1</code>, and <code>flex-basis: 100%</code></li>
              <li>Border and padding of zero</li>
              <li><code>margin-bottom:3px</code>, other margins are zero</li>
              <li><code>font-size: 100%</code> with normal <code>font-weight: 400</code></li>
              <li><code>vertical-align: baseline</code></li>
              <li>Background reset to <code>0 0</code></li>
              <li>No outline</li>
              <li><code>cursor: pointer</code></li>
            </ul>
          </section>

          <section>
            <h2>Input</h2>
            <ul>
              <li><code>flex-grow: 1</code>, <code>flex-shrink: 1</code>, and <code>flex-basis: 215px</code></li>
              <li><code>margin: 0</code></li>
              <li><code>vertical-align: middle</code></li>
              <li><code>background-color: @white</code></li>
              <li><code>color: @grey-suva</code> with <code>color: @black</code> on <code>:focus</code></li>
              <li><code>color: @grey-northernsky</code> for <code>::placeholder</code> text</li>
              <li><code>border: 1px solid @white-fog</code></li>
              <li><code>font-family: sans-serif</code></li>
              <li><code>font-size: 99%</code> (99% of 14px inherited from <code>body</code>)</li>
              <!-- TODO: #30 .invalid/.changed -->
              <li>Base <code>outline: none</code> that can be modified with <code>.invalid</code> and <code>.changed</code> classes</li>
              <li>Base <code>padding: @padding-base</code> of 10px</li>
            </ul>
          </section>

          <section>
            <h2>Textarea</h2>
            <ul>
              <li><code>margin: 0</code></li>
              <li><code>background-color: @white</code></li>
              <li><code>color: @grey-suva</code> with <code>color: @black</code> on <code>:focus</code></li>
              <li><code>font-family: sans-serif</code></li>
              <li><code>font-size: 99%</code> (99% of 14px inherited from <code>body</code>)</li>
            </ul>
          </section>

          <section>
            <h2>Select</h2>
            <ul>
              <li><code>margin: 0</code></li>
              <li><code>vertical-align: middle</code></li>
              <li><code>background-color: @white</code></li>
              <li><code>color: @grey-dark</code> with <code>color: @black</code> on <code>:focus</code></li>
              <li><code>border-color: @grey-suva</code></li>
              <li><code>font-family: sans-serif</code></li>
              <li><code>font-size: 16px</code></li>
            </ul>
          </section>

          <aside>
            Example:
            <form>
              <p class="form-group">
                <span>input <code>type=checkbox</code></span>
                <br/>
                <input id="checkbox" type="checkbox">
                <label for="checkbox">How ya like me now?</label>
              </p>
              <p class="form-group">
                <label for="email">input <code>type=email</code></label>
                <input id="email" type="email" value="user@domain.com">
                <br/>(mobile users should get an email keyboard)
              </p>
              <p class="form-group">
                <label for="number">input <code>type=number</code></label>
                <input id="number" type="number" placeholder="numbers only">
                <br/>(mobile users should get a numeric keyboard)
              </p>
              <p class="form-group">
                <label for="password">input <code>type=password</code></label>
                <input id="password" type="password" placeholder="it's a secret">
              </p>
              <p class="form-group">
                <span>input <code>type=radio</code></span>
                <br/>
                <input id="red" name="radio" type="radio">
                <label for="red">Red</label>
                <input id="yellow" name="radio" type="radio">
                <label for="yellow">Yellow</label>
                <input id="blue" name="radio" type="radio">
                <label for="blue">Blue</label>
              </p>
              <p class="form-group">
                <label for="range">input <code>type=range</code></label>
                <input id="range" type="range" step="1" min="0" max="9">
              </p>
              <p class="form-group">
                <label for="search">input <code>type=search</code></label>
                <input id="search" type="search" placeholder="search">
              </p>
              <p class="form-group">
                <label for="tel">input <code>type=tel</code></label>
                <input id="tel" type="tel" placeholder="Digits please">
                <br/>(mobile users should get a numeric keyboard)
              </p>
              <p class="form-group">
                <label for="text">input <code>type=text</code></label>
                <input id="text" type="text" placeholder="try me">
              </p>
              <p class="form-group">
                <label for="textarea"><code>textarea</code></label>
                <textarea id="textarea">Hello!</textarea>
              </p>
              <p class="form-group">
                <label for="select"><code>select</code></label>
                <select id="select">
                  <option>apples</option>
                  <option>oranges</option>
                  <option>bananas</option>
                </select>
              </p>
            </form>
          </aside>

          <section>
          <h2>Disabled and Readonly fields</h2>
          <ul>
            <li>
              Elements with the <code>disabled</code> attribute have <code>cursor: default</code>
              to remove where we are otherwise setting a pointer cursor
            </li>
            <li>
              <code>input type=checkbox</code> and <code>input type=radio</code> with the <code>disabled</code> attribute have
              <code>cursor: not-allowed</code> to override the browser's pointer cursor
            </li>
            <li><code>label</code> elements with the <code>disabled=disabled</code> attribute have <code>color: @grey-silver</code></li>
            <li>
              <code>select</code> elements with the <code>disabled</code> attribute have <code>border-color: @grey-northernsky</code>,
              <code>color: @grey-northernsky</code>, and
              <code>background: @white-smoke</code>
            </li>
            <li>
              <code>input</code> and <code>textarea</code> elements with the <code>disabled</code> or <code>readonly</code>
              attribute have <code>background-color: @white-smoke</code> and <code>border: 1px solid @grey-silver</code>
            </li>
          </ul>
          </section>

          <aside>
            Example:
            <form>
              <p class="form-group">
                <label disabled="disabled" disabled="disabled"><code>disabled</code> input <code>type=checkbox</code></label>
                <br/>
                <input id="disabled-checkbox" type="checkbox" disabled>
                <label for="disabled-checkbox" disabled="disabled">We cool?</label>
              </p>
              <p class="form-group">
                <label disabled="disabled" disabled="disabled"><code>disabled</code> input <code>type=radio</code></label>
                <br/>
                <input type="radio" disabled>
                <label id="disabled-radio" disabled="disabled">One job</label>
              </p>
              <p class="form-group">
                <label disabled="disabled"><code>disabled textarea</code></label>
                <textarea disabled>Can't change what doesn't want changed</textarea>
              </p>
              <p class="form-group">
                <label disabled="disabled"><code>disabled</code> input <code>type=text</code></label>
                <input type="text" disabled>
              </p>
              <p class="form-group">
                <label disabled="disabled"><code>disabled select</code></label>
                <select disabled>
                  <option>flip-flops</option>
                  <option>sneakers</option>
                  <option>boots</option>
                </select>
              </p>
            </form>
          </aside>
        </section>
      `
    })
  );

