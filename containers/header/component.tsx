import { FC } from 'react';

import Link from 'next/link';

import Icon from 'components/icon';

import LOGO_SVG from 'svgs/logo.svg?sprite';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <header
      key="header"
      className="relative z-10 flex justify-between p-4 md:p-8"
    >
      <Link href="/">
        <h1>
          <a href="/" className="relative -indent-{9999} overflow-hidden interactive">
            <Icon icon={LOGO_SVG} className="w-[88px] h-4" />
            <span className="absolute -indent-[9999px]">Minima</span>
          </a>
        </h1>
      </Link>
    </header>
  );
};

export default Header;
