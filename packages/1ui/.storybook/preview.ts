// import type { Preview } from '@storybook/react';
// import '../styles/globals.css';

// const preview: Preview = {
//   parameters: {
//     backgrounds: {
//       default: 'light',
//       values: [
//         {
//           name: 'light',
//           value: '#F8F4F1',
//         },
//         {
//           name: 'dark',
//           value: '#333333',
//         },
//       ],
//     },
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/i,
//       },
//     },
//   },
// };

// export default preview;

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
