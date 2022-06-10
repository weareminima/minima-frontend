import { FC, useCallback } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { setMenu } from 'store/home/slice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

import { AnimatePresence, motion } from 'framer-motion';

import Icon from 'components/icon';

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
            initial={{
              opacity: 0, y: '-50%', z: 0, scale: 1,
            }}
            animate={{
              opacity: 1, y: '-50%', z: 0, scale: 1,
            }}
            exit={{
              opacity: 0, y: '-50%', z: 0, scale: 1,
            }}
            key="hamburger"
            type="button"
            whileHover={{
              scale: 1.05, y: '-50%', z: 0, opacity: 1,
            }}
            className="absolute flex items-center justify-center h-5 -translate-y-1/2 top-1/2 right-4 md:right-6 lg:right-8 backface-invisible"
            onClick={onMenuClick}
          >
            <div className="w-5 h-2.5">
              <motion.div
                initial="hamburger"
                animate={menu ? 'close' : 'hamburger'}
                variants={{
                  hamburger: {
                    rotate: 0,
                    x: 'calc(-50% + 1px)',
                    y: 'calc(-50% - 4px)',
                  },
                  close: {
                    rotate: 45,
                    x: 'calc(-50% + 1px)',
                    y: 'calc(-50% + 1px)',
                  },
                }}
                className="absolute top-1/2 left-1/2 z-10 w-full h-[2px] bg-dark"
              />
              <motion.div
                initial="hamburger"
                animate={menu ? 'close' : 'hamburger'}
                variants={{
                  hamburger: {
                    rotate: 0,
                    x: 'calc(-50% + 1px)',
                    y: 'calc(-50% + 4px)',
                  },
                  close: {
                    rotate: -45,
                    x: 'calc(-50% + 1px)',
                    y: 'calc(-50% + 1px)',
                  },
                }}
                className="absolute top-1/2 left-1/2 z-10 w-full h-[2px] bg-dark"
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
