import { useCallback, useEffect } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { OverlayProvider } from '@react-aria/overlays';
import { Hydrate } from 'react-query/hydration';

import Favicon from 'containers/favicon';
// import Mouse from 'containers/mouse';

import { GAPage } from 'lib/analytics/ga';
import store from 'store';

import 'styles/globals.css';
import 'styles/fonts.css';

const queryClient = new QueryClient();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const onRouteChangeEnd = useCallback((pathname) => {
    GAPage(`${window.location.origin}${pathname}`);
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', onRouteChangeEnd);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeEnd);
    };
  }, []); // eslint-disable-line

  return (
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
};

export default MyApp;
