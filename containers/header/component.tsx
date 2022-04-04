import { FC } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import Icon from 'components/icon';

import HAMBURGER_SVG from 'svgs/hamburger.svg?sprite';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const buttonStyles = 'border border-zinc-900 border-opacity-10 rounded-3xl min-h-[40px]';

  return (
    <header
      key="header"
      className="relative z-10 flex justify-between px-4 py-4 md:px-8"
    >
      <Link href="/">
        <h1
          className={cx({
            'px-4 text-2xl font-display leading-none flex items-center justify-center': true,
            [buttonStyles]: true,
          })}
        >
          <a href="/" className="-translate-y-0.5">
            Minima
          </a>
        </h1>
      </Link>

      <div className="flex space-x-4">
        <button
          type="button"
          className={cx({
            'flex items-center justify-center space-x-3 w-10 bg-gray-900 hover:bg-gray-700 active:bg-gray-500 transition-colors': true,
            [buttonStyles]: true,
          })}
        >
          <Icon icon={HAMBURGER_SVG} className="w-4 h-4 stroke-primary" />
        </button>
      </div>

    </header>
  );
};

export default Header;
