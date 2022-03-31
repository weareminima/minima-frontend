import Head from 'next/head';

import Header from 'containers/header';
import Home from 'containers/home';

const HomePage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Minima</title>
      </Head>

      <Header />

      <Home />
    </div>
  );
};

export default HomePage;
