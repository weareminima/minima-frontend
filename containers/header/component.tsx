import { FC } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

import Icon from 'components/icon';

import LOGO_SVG from 'svgs/logo.svg?sprite';

interface HeaderProps {
  align: 'left' | 'center' | 'right';
}

export const Header: FC<HeaderProps> = ({
  align = 'left',
}: HeaderProps) => {
  return (
    <AnimatePresence>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key="header"
        className={cx({
          'relative z-10 flex p-4 md:p-8': true,
          'justify-between': align === 'left',
          'justify-center': align === 'center',
        })}
      >
        <Link href="/">
          <h1>
            <a href="/" className="relative -indent-{9999} overflow-hidden interactive">
              <Icon icon={LOGO_SVG} className="w-[88px] h-4" />
              <span className="absolute -indent-[9999px]">Minima</span>
            </a>
          </h1>
        </Link>
      </motion.header>
    </AnimatePresence>
  );
};

export default Header;
