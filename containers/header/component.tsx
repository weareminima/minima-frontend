import { FC, useCallback } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { setMenu } from 'store/home/slice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

import { AnimatePresence, motion } from 'framer-motion';

import Icon from 'components/icon';

import HAMBURGER_SVG from 'svgs/hamburger.svg?sprite';
import LOGO_SVG from 'svgs/logo.svg?sprite';

interface HeaderProps {
  align: 'left' | 'center' | 'right';
  comingSoon?: boolean;
}

export const Header: FC<HeaderProps> = ({
  align = 'left',
  comingSoon = false,
}: HeaderProps) => {
  const {
    menu,
    open,
  } = useAppSelector((state) => state['/home']);
  const dispatch = useAppDispatch();

  const onMenuClick = useCallback(() => {
    dispatch(setMenu(!menu));
  }, [menu, dispatch]);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      key="header"
      className={cx({
        'fixed top-0 left-0 w-full z-30 flex p-4 md:p-6 lg:p-8 items-center': true,
        'justify-between': align === 'left',
        'justify-center': align === 'center',
      })}
    >
      <Link href="/">
        <h1>
          <a
            href="/"
            className={cx({
              'relative -indent-{9999} overflow-hidden': true,
              interactive: !comingSoon,
            })}
          >
            <Icon icon={LOGO_SVG} className="w-[88px] h-4" />
            <span className="absolute -indent-[9999px]">Minima</span>
          </a>
        </h1>
      </Link>

      <AnimatePresence>
        {open && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="hamburger"
            type="button"
            className="absolute -translate-y-1/2 top-1/2 right-4 md:right-6 lg:right-8"
            onClick={onMenuClick}
          >
            <Icon icon={HAMBURGER_SVG} className="w-5 h-5 stroke-dark" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
