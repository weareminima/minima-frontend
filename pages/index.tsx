import dynamic from 'next/dynamic';
import Head from 'next/head';

import Contact from 'containers/contact';
import Header from 'containers/header';

const Home = dynamic(() => import('containers/home'), { ssr: false });

const PageHome: React.FC = () => {
  return (
    <div>
      <Head>
        <title>We Are Mínima</title>
      </Head>

      <Header align="left" />

      <Home />

      <Contact />
    </div>
  );
};

export default PageHome;
