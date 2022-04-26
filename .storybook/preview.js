import React from 'react';

import { themes } from '@storybook/theming';
import { OverlayProvider } from '@react-aria/overlays';

import '../styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: [
        'Intro',
        'Docs',
        ['Install', 'Deploy', 'Authentication', 'Fetching', 'Media', 'Tests'],
        'Components',
      ],
    },
  },
  docs: {
    theme: themes.dark,
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};

export const decorators = [
  (Story) => {
    return (
      <OverlayProvider>
        <div>{Story()}</div>
      </OverlayProvider>
    );
  },
];
