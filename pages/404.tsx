import Head from 'next/head';

import Custom404 from 'containers/404';
import Header from 'containers/header';

const HomePage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Minima</title>
      </Head>

      <Header />

      <Custom404 />

    </div>
  );
};

export default HomePage;
