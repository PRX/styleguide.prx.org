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
    'App',
    () => ({
      styleUrls: [
        '../../../../../../src/styles.css'
      ],
      template: `
      <section class="main demo">
        <h1>App</h1>
        <p>A style sheet designed to give overall app consistent look and feel</p>

        <section>
          <ul>
            <li>
              Imports the Open Sans font from Google in the weights
              <span style="font-weight: 300; font-style: italic">300italic</span>,
              <span style="font-weight: 400; font-style: italic">400italic</span>,
              <span style="font-weight: 700; font-style: italic">700italic</span>,
              <span style="font-weight: 300">300</span>,
              <span style="font-weight: 400">400</span>, and
              <span style="font-weight: 700">700</span>
            </li>
            <li>
              h1-h3 color of <code>@grey-dark</code> and light font weight
              <aside>
                <h1>H1</h1>
                <h2>H2</h2>
                <h3>H3</h3>
              </aside>
            </li>
            <li>
              Link color of <code>@blue</code> and <code>@blue-emphasis</code> on <code>:focus</code>,
              <code>:hover</code>, and <code>:active</code> with no text-decoration
              <aside>
                Example: <a href="">Hover, Focus, or Click here</a>
              </aside>
            </li>
            <li><code>strong</code> font weight <strong>700</strong></li>
            <li>
              Text <code>::selection</code> to <code>@orange</code> background-color and <code>@white</code> text
              <aside>
                Example: select any of the text on this page
              </aside>
            </li>
          </ul>
        </section>
      </section>
      `
    })
  );

