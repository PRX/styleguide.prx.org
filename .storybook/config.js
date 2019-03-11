import { addDecorator, addParameters, configure } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { themes } from '@storybook/theming';
import { withNotes } from '@storybook/addon-notes';
import theme from './theme';

console.log(themes);

// Add Notes to all stories.
addDecorator(withNotes);

// Add Centered to all stories.
addDecorator(centered);

// Theme Storybook UI.
addParameters({
  backgrounds: [
    { name: 'White Smoke', value: '#f0f0f0', default: true},
    { name: 'White Fog', value: '#e6e6e6'},
    { name: 'Dark', value: '#1a1a1a'},
  ],
  options: {
    theme
  }
});

// automatically import all files ending in *.stories.ts
const req = require.context('../projects', true, /.stories.ts$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
