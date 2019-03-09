import { addDecorator, addParameters, configure } from '@storybook/angular';
import { themes } from '@storybook/theming';
import { withNotes } from '@storybook/addon-notes';

console.log(themes);

// Add Notes to all stories.
addDecorator(withNotes);

// Theme Storybook UI.
addParameters({
  backgrounds: [
    { name: 'White Smoke', value: '#f0f0f0', default: true},
    { name: 'White Fog', value: '#e6e6e6'},
    { name: 'Dark', value: '#1a1a1a'},
  ],
  options: {
    name: 'PRX Styleguide',
    url: 'https://github.com/PRX/styleguide.prx.org',
    theme: {
      ...themes.normal,
      brand: {
        background: 'url("assets/images/prx_logo.svg")',
        backgroundRepeat: 'no-repeat'
      },
      brandLink: {
        paddingLeft: '40px'
      }
    }
  }
});

// automatically import all files ending in *.stories.ts
const req = require.context('../projects', true, /.stories.ts$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
