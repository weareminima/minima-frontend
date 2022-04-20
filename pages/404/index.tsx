import Head from 'next/head';

import Custom404 from 'containers/404';
import Header from 'containers/header';

const Page404: React.FC = () => {
  return (
    <div>
      <Head>
        <title>404 - We Are Mínima</title>
      </Head>

      <Header align="left" />

      <Custom404 />

    </div>
  );
};

export default Page404;
