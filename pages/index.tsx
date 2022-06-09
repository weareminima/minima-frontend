import Head from 'next/head';

import { ScrollProvider } from 'hooks/scroll';

import Contact from 'containers/contact';
import Header from 'containers/header';
import Home from 'containers/home';

const PageHome: React.FC = () => {
  return (
    <ScrollProvider>
      <div>
        <Head>
          <title>We Are Mínima</title>
        </Head>

        <Header align="left" />

        <Home />

        <Contact />
      </div>
    </ScrollProvider>
  );
};

export default PageHome;
