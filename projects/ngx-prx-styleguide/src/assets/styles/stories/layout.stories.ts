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
    'Layout',
    () => ({
      styleUrls: [
        '../../../../../../src/styles.css'
      ],
      template: `
        <section class="main demo">
          <h1>CSS layout</h1>
          <p>A style sheet used to create a global layout</p>
          <section>
            <ul>
              <li>Darkest grey background color and stripes image on <code>html</code></li>
              <li>White background on <code>body</code></li>
              <li>Grey color on <code>body</code></li>
              <li>1200px max-width on <code>body</code>, can be overridden in global styling of individual applications</li>
              <li>14px Font size on <code>body</code></li>
              <li>Open Sans, sans-serif font-family on <code>body</code></li>
              <li>1.5em line-height on <code>html</code></li>
              <li>1.5rem line-height on <code>body</code></li>
              <li>White smoke background on <code>.main</code></li>
              <li>Top padding on <code>.main</code> to make space for header nav</li>
              <li>1060px max-width on the <code>.main section</code> with additional horizontal margin and padding</li>
            </ul>
          </section>
        </section>
      `
    })
  );

