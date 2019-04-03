import { storiesOf, moduleMetadata } from '@storybook/angular';
import { StatusBarModule } from './status-bar.module';

// Module metadata for stories.
const storiesModuleMetaData = moduleMetadata({
  imports: [
    StatusBarModule
  ],
  schemas: [],
  declarations: [],
  providers: [],
});


storiesOf('Navigation|Status Bar', module)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Usage Details',
    () => ({
      template: `
      <div class="main">
        <div class="header"></div>
        <prx-status-bar>
          <prx-status-bar-text bold uppercase>Episode</prx-status-bar-text>
          <prx-status-bar-text italic stretch>These Words Cause Happiness</prx-status-bar-text>
          <prx-status-bar-text bold>The Science of Happiness</prx-status-bar-text>
        </prx-status-bar>
      </div>
      `,
      props: {},
      styles: [
        `
        :host {
          --header-height: 50px;
        }
        .main {
          position: relative;
          height: 200vh;
          padding-top: calc(var(--header-height) + 130px);
          border-bottom: 30vh solid #1a1a1a;
        }
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          background-color: #1a1a1a;
        }
        `
      ]
    })
  )