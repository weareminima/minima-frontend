import Head from 'next/head';

import ComingSoon from 'containers/coming-soon';
import Header from 'containers/header';

const PageComingSoon: React.FC = () => {
  return (
    <div>
      <Head>
        <title>We Are Mínima</title>
      </Head>

      <Header align="center" comingSoon />

      <ComingSoon />
    </div>
  );
};

export default PageComingSoon;
