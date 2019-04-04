import { storiesOf, moduleMetadata } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { IconModule } from './icon.module';
import { withKnobs, select, text } from '@storybook/addon-knobs';

const req = require.context('../../assets/images/icons/', false, /\.svg$/);
const iconNames = req.keys().map(filename => filename.match(/\/([^\/]+)\.svg$/)[1]);

console.log(iconNames);

export const iconColorOptions = {
  'Color in SVG': null,
  Default: 'default',
  Primary: 'primary',
  Secondary: 'secondary',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Light: 'light',
  Dark: 'dark',
};

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
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(storiesModuleMetaData)
  .add(
    'Default Usage (Knobs)',
    () => {
      const name = select("Icon", iconNames, iconNames[0]);
      const color = select('Color', iconColorOptions, iconColorOptions[0]);
      const size = text('Size', '');

      return {
        template: `
          <div class="main">
            <prx-icon
              [color]="color"
              [size]="size"
              [name]="name"
            ></prx-icon>
          </div>
        `,
        props: {
          name,
          color,
          size
        },
        styleUrls: [
          './icon.component.stories.scss'
        ]
      };
    }
  )
  .add(
    'Custom SVG (Knobs)',
    () => {
      const color = select('Color', iconColorOptions, iconColorOptions[0]);
      const size = text('Size', '');

      return {
        template: `
          <div class="main">
            <prx-icon
              [color]="color"
              [size]="size"
            >
              <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M893 0q240-2 451 120 232 134 352 372l-742-39q-160-9-294 74.5t-185 229.5l-276-424q128-159 311-245.5t383-87.5zm-747 405l337 663q72 143 211 217t293 45l-230 451q-212-33-385-157.5t-272.5-316-99.5-411.5q0-267 146-491zm1586 169q58 150 59.5 310.5t-48.5 306-153 272-246 209.5q-230 133-498 119l405-623q88-131 82.5-290.5t-106.5-277.5zm-836 20q125 0 213.5 88.5t88.5 213.5-88.5 213.5-213.5 88.5-213.5-88.5-88.5-213.5 88.5-213.5 213.5-88.5z"/></svg>
            </prx-icon>
          </div>
        `,
        props: {
          color,
          size
        },
        styleUrls: [
          './icon.component.stories.scss'
        ]
      };
    }
  );