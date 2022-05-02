import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import { OverlayProvider } from '@react-aria/overlays';
import { Hydrate } from 'react-query/hydration';

import Favicon from 'containers/favicon';
// import Mouse from 'containers/mouse';

import store from 'store';

import 'styles/globals.css';
import 'styles/fonts.css';

const queryClient = new QueryClient();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <OverlayProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          </Head>

          {/* <Mouse /> */}
          <Favicon />
          <Component {...pageProps} />
        </OverlayProvider>
      </Hydrate>
    </QueryClientProvider>
  </ReduxProvider>
);

export default MyApp;
