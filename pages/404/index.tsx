import Head from 'next/head';

import Custom404 from 'containers/404';
import Header from 'containers/header';

const Page404: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Minima</title>
      </Head>

      <Header align="left" />

      <Custom404 />

    </div>
  );
};

export default Page404;
