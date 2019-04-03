import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { IconModule } from './icon.module';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    IconModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});


storiesOf('Global|Icons', module)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details',
    () => ({
      template: `
        <div class="main">
          <prx-icon>
            <svg width="1792" height="1792" viewBox="80 -80 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"/></svg>
          </prx-icon>
        </div>
      `,
      props: {},
      styles: [
        `
        .main {
          width: 5vw;
          height: 5vw;
        }
        `
      ]
    })
  )