import {
  FC,
} from 'react';

import Content from './content';
import Intro from './intro';

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  return (
    <div
      className="relative"
    >
      <Intro />

      <Content />

    </div>
  );
};

export default Home;
