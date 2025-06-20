import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Charts',
          'Charts-Mobile',
          'Charts-Mini',
          'EXAMPLE',
          'Configure your project',
        ],
      },
    },
  },
};

export default preview;
