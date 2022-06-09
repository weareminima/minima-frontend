import {
  FC,
} from 'react';

import Intro from './intro';
import Scroller from './scroller';

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  return (
    <div
      className="relative"
    >
      <Intro />

      <Scroller />
    </div>
  );
};

export default Home;
