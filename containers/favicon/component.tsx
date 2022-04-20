import { FC, useEffect, useState } from 'react';

import Head from 'next/head';

interface FaviconProps {
}

export const Favicon: FC<FaviconProps> = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check if you are using dark mode
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (e.matches) {
          setTheme('dark');
        } else {
          setTheme('light');
        }
      });
  }, []);

  return (
    <Head>
      {theme === 'light' && (
        <link rel="icon" href="/favicon-light.svg" />
      )}

      {theme === 'dark' && (
        <link rel="icon" href="/favicon-dark.svg" />
      )}
    </Head>
  );
};

export default Favicon;
