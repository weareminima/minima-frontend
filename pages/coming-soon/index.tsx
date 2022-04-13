import Head from 'next/head';

import Header from 'containers/header';

const PageComingSoon: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Minima - Coming soon</title>
      </Head>

      <Header align="center" />
    </div>
  );
};

export default PageComingSoon;
