import { addDecorator, addParameters, configure } from '@storybook/angular';
import { themes } from '@storybook/theming';
import { withNotes } from '@storybook/addon-notes';
import theme from './theme';

console.log(themes);

// Add Notes to all stories.
addDecorator(withNotes);

// Theme Storybook UI.
addParameters({
  backgrounds: [
    { name: 'White Smoke', value: '#f0f0f0', default: true},
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
