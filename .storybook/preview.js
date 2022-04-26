import React from 'react';

import { OverlayProvider } from '@react-aria/overlays';

import '../styles/fonts.css';

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
  previewTabs: { 'storybook/docs/panel': { index: -1 } },
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
