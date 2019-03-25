import { addDecorator, addParameters, configure } from '@storybook/angular';
import { themes } from '@storybook/theming';
import { withA11y } from '@storybook/addon-a11y';
import { withNotes } from '@storybook/addon-notes';
import theme from './theme';

// Add Notes to all stories.
addDecorator(withNotes);

// Add a11y checks to stories.
addDecorator(withA11y);

// Theme Storybook UI.
addParameters({
  backgrounds: [
    { name: 'White Smoke', value: '#f0f0f0', default: true},
    { name: 'Dark', value: '#1a1a1a'},
  ],
  options: {
    theme
  },
  knobs: {
    timestamps: true,
    escapeHTML: false
  }
});

// automatically import all files ending in *.stories.ts
const req = require.context('../projects', true, /.stories.ts$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
