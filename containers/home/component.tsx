import { FC } from 'react';

import Link from 'next/link';

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  return (
    <div className="px-4 py-4 mt-16 md:px-8">
      <Link
        href="/asdfasdfasdf"
      >
        <a href="/asdfasdfasdf" className="text-2xl leading-none">
          404
        </a>
      </Link>
    </div>
  );
};

export default Home;
