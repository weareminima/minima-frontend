import {
  FC, RefObject, useMemo, useRef, useState,
} from 'react';

import cx from 'classnames';

import {
  setState,
} from 'store/home/slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import { Keyframes, Scroll } from 'scrollex';

import useWindowSize from 'hooks/window';

import Icon from 'components/icon';
import Tag from 'components/tag';

import CLOSE_SVG from 'svgs/close.svg?sprite';

import {
  ContentContact,
  ContentLab,
  ContentMethod,
  ContentPrinciples,
  ContentServices,
  ContentStudio,
} from './content';

const CONTENT = {
  studio: <ContentStudio />,
  principles: <ContentPrinciples />,
  services: <ContentServices />,
  method: <ContentMethod />,
  lab: <ContentLab />,
  contact: <ContentContact />,
};

const SIZES = {
  header: 80,
  footer: 24,
};

interface ScrollerItemProps {
  index: number;
  id: string;
  title: string;
  className: string;
  gradient: string;
  scrollRef: RefObject<HTMLDivElement>;
}

const keyframes: Record<string, Keyframes> = {
  background: ({ section, container }) => {
    return {
      [section.topAt('container-top')]: {
        translateY: '0%',
      },
      [section.topAt('container-bottom') - SIZES.header - SIZES.footer]: {
        translateY: '100%',
      },
      [section.bottomAt('container-bottom') - SIZES.header - SIZES.footer]: {
        scale: 1,
        opacity: 1,
      },
      [section.bottomAt('container-bottom') + (container.height) - SIZES.header - SIZES.footer]: {
        scale: 0.95,
        opacity: 0,
      },
    };
  },
  content: ({ section, container }) => {
    return {
      [section.topAt('container-top')]: {
        translateY: 0,
      },
      [section.bottomAt('container-bottom')]: {
        translateY: -section.height + container.height - SIZES.footer,
      },
    };
  },
};

export const ScrollerItem: FC<ScrollerItemProps> = ({
  index,
  id,
  title,
  className,
  gradient,
  scrollRef,
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [menuAnimation, setMenuAnimation] = useState<string>('initial');
  const {
    menu,
    menuHover,
    menuClick,
    steps,
    scrollReady,
  } = useAppSelector((state) => state['/home']);

  const { height } = useWindowSize();

  const dispatch = useAppDispatch();

  const menuVariants = useMemo(() => {
    const hoverIndex = steps.findIndex((s) => s.id === menuHover);
    const clickIndex = steps.findIndex((s) => s.id === menuClick);

    const calculateAnimate = (ix: number, hx: number) => {
      let y = menu ? height - ((steps.length + 2 - index) * 72) : 0;
      if (hx >= ix) {
        y -= 30;
      }

      return {
        animateY: y,
        animateOpacity: 1,
        animateScale: 1,
      };
    };

    const calculateExit = (ix: number, c: number) => {
      const i = ix - 1;
      const style = window.getComputedStyle(backgroundRef.current);
      const { transform, opacity } = style;
      const { m11, m42 } = new DOMMatrixReadOnly(transform);

      let y = m42;
      let s = m11;
      let o = +opacity;

      if (c >= 0) {
        if (i > c) {
          y = height;
          s = 1;
          o = 1;
        }

        if (c === i) {
          y = 0;
          s = 1;
          o = 1;
        }

        if (i < c) {
          y = 0;
          s = 0.95;
          o = 0;
        }
      }

      return {
        exitY: y,
        exitOpacity: o,
        exitScale: s,
      };
    };

    if (backgroundRef.current) {
      const { animateY, animateOpacity, animateScale } = calculateAnimate(index, hoverIndex);
      const { exitY, exitOpacity, exitScale } = calculateExit(index, clickIndex);
      const style = window.getComputedStyle(backgroundRef.current);
      const { transform, opacity } = style;
      const { m11, m42 } = new DOMMatrixReadOnly(transform);

      return {
        initial: {
          y: m42,
          scale: m11,
          opacity: +opacity,
        },
        animate: {
          y: animateY,
          scale: animateScale,
          opacity: animateOpacity,
        },
        exit: {
          y: exitY,
          scale: exitScale,
          opacity: exitOpacity,
          transition: {
            delay: 0.125,
            duration: 0.5,
            bounce: 0,
          },
        },
        hover: {
          y: animateY - 30,
        },
      };
    }

    return null;
  }, [
    menu,
    menuHover,
    menuClick,
    height,
    index,
    steps,
  ]);

  return (
    <Scroll.Section
      key={id}
    >
      {/* MENU */}
      <AnimatePresence>
        {menu && (
          <motion.div
            key="background-menu"
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            variants={menuVariants}
            transition={{
              duration: 0.5,
              bounce: 0,
            }}
            className={cx({
              'fixed pointer-events-none w-full h-full top-0 left-0 z-0 overflow-hidden rounded-3xl will-change-auto': true,
              'lg:pt-20 md:pt-16 pt-12 ': true,
              'lg:px-8 md:px-6 px-4': true,
              'lg:pb-8 md:pb-6 pb-4': true,
            })}
            style={{
              zIndex: 100 + index,
            }}
            onAnimationComplete={(animation) => {
              if (typeof animation === 'string') {
                setMenuAnimation(animation);
              }
            }}
            onMouseEnter={() => {
              dispatch(setState({ menuHover: id }));
            }}
            onMouseLeave={() => {
              dispatch(setState({ menuHover: '' }));
            }}
          >
            <button
              type="button"
              className={cx({
                'w-full h-full z-0 overflow-hidden rounded-3xl pointer-events-auto cursor-pointer appearance-none flex flex-col justify-start items-start': true,
                [className]: !!className,
              })}
              onClick={() => {
                const { top } = document.getElementById(id)?.getBoundingClientRect();

                scrollRef.current.style.scrollBehavior = 'auto'; // eslint-disable-line no-param-reassign
                scrollRef.current.scrollTo(0, scrollRef.current.scrollTop + top);
                scrollRef.current.style.scrollBehavior = 'smooth'; // eslint-disable-line no-param-reassign

                dispatch(setState({ menuClick: id }));

                setTimeout(() => {
                  dispatch(setState({
                    menu: false,
                    menuClick: '',
                    menuHover: '',
                  }));
                }, 0);
              }}
            >
              {/* HEADER */}
              <header
                className={cx({
                  'sticky top-0 z-10 bg-gradient-to-b rounded-t-3xl': true,
                  [gradient]: !!gradient,
                })}
              >
                <div
                  className={cx({
                    'flex items-start justify-between lg:p-8 md:p-6 p-4': true,
                  })}
                >
                  <div className="flex space-x-2">
                    <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{index}</div>
                    <Tag>
                      {title}
                    </Tag>
                  </div>
                </div>
              </header>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* FIXED */}
      <Scroll.Item
        ref={backgroundRef}
        key="background"
        data={{
          index,
          steps,
        }}
        keyframes={keyframes.background}
        springs={{
          translateY: {
            mass: 0.01,
            damping: 10,
            stiffness: 150,
            ...(!scrollReady || menu) && {
              duration: 0,
            },
          },
        }}
        className={cx({
          'fixed w-full h-full top-0 left-0 z-0 overflow-hidden rounded-3xl will-change-auto': true,
          'lg:pt-20 md:pt-16 pt-12 ': true,
          'lg:px-8 md:px-6 px-4': true,
          'lg:pb-8 md:pb-6 pb-4': true,
        })}
      >
        <div
          className={cx({
            'w-full h-full z-0 overflow-hidden rounded-3xl': true,
            [className]: !!className,
          })}
          style={{
            visibility: (menu || (menuAnimation === 'animate' || menuAnimation === 'hover')) ? 'hidden' : 'visible',
          }}
        >
          {/* HEADER */}
          <header
            className={cx({
              'sticky top-0 z-10 bg-gradient-to-b rounded-t-3xl': true,
              [gradient]: !!gradient,
            })}
          >
            <div
              className={cx({
                'flex items-start justify-between lg:p-8 md:p-6 p-4': true,
              })}
            >
              <div className="flex space-x-2">
                <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{index}</div>
                <Tag>
                  {title}
                </Tag>

              </div>

              <motion.button
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.5,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                  transition: {
                    duration: 0,
                  },
                }}
                type="button"
                onClick={() => {
                  dispatch(setState({
                    ready: false,
                    exit: true,
                    step: id,
                  }));

                  setTimeout(() => {
                    dispatch(setState({
                      open: false,
                    }));
                  }, 0);
                }}
              >
                <Icon
                  icon={CLOSE_SVG}
                  className="block w-4 h-4 stroke-current text-dark"
                />
              </motion.button>
            </div>
          </header>

          {/* CONTENT */}
          <Scroll.Item
            key="content"
            keyframes={keyframes.content}
            className="px-4 pb-4 md:px-6 lg:px-8 md:pb-6 lg:pb-8 grow will-change-transform"
          >
            {CONTENT[id]}
          </Scroll.Item>

          {/* FOOTER */}
          <footer
            className={cx({
              'sticky bottom-0 z-10 h-6 bg-gradient-to-t rounded-b-3xl': true,
              [gradient]: !!gradient,
            })}
          />
        </div>
      </Scroll.Item>

      {/* CONTENT SCOLLABLE */}
      <div
        id={id}
        className={cx({
          'relative z-20 w-full opacity-0 pointer-events-none': true,
          'lg:pt-20 md:pt-16 pt-12 ': true,
          'lg:px-8 md:px-6 px-4': true,
          'lg:pb-8 md:pb-6 pb-4': true,
        })}
      >
        <header
          className={cx({
            'bg-gradient-to-b rounded-t-3xl': true,
            [gradient]: !!gradient,
          })}
        >
          <div
            className={cx({
              'flex items-start justify-between lg:p-8 md:p-6 p-4': true,
            })}
          >
            <div className="flex space-x-2">
              <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{index}</div>
              <h2 className="flex items-center h-6 px-3 text-sm leading-none border border-gray-900 rounded-xl">{title}</h2>
            </div>
          </div>
        </header>

        <div
          className="px-4 pb-4 overflow-hidden md:px-6 lg:px-8 md:pb-6 lg:pb-8"
        >
          {CONTENT[id]}
        </div>
      </div>
    </Scroll.Section>
  );
};

export default ScrollerItem;
