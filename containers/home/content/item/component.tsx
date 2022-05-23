import {
  FC,
} from 'react';

import cx from 'classnames';

import {
  setState,
} from 'store/home/slice';
import { useAppDispatch } from 'store/hooks';

import {
  motion,
} from 'framer-motion';
import { Keyframes, Scroll } from 'scrollex';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/close.svg?sprite';

const SIZES = {
  header: 80,
  footer: 24,
};

interface ContentItemProps {
  index: number;
  id: string;
  title: string;
  className: string;
  gradient: string;
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
        backdropFilter: 'blur(0px)',
      },
      [section.bottomAt('container-bottom') + (container.height) - SIZES.header - SIZES.footer]: {
        scale: 0.95,
        opacity: 0,
        backdropFilter: 'blur(10px)',
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

export const ContentItem: FC<ContentItemProps> = ({
  index,
  id,
  title,
  className,
  gradient,
}) => {
  // const {
  //   step, steps,
  // } = useAppSelector((state) => state['/home']);

  const dispatch = useAppDispatch();

  return (
    <Scroll.Section
      showOverflow
      key={id}
    >
      {/* FIXED */}
      <Scroll.Item
        key="background"
        keyframes={keyframes.background}
        className={cx({
          'fixed w-full h-full top-0 left-0 z-0 pt-20 px-6 pb-6 overflow-hidden rounded-3xl': true,
        })}
      >
        <div
          className={cx({
            'w-full h-full z-0 overflow-hidden rounded-3xl': true,
            [className]: !!className,
          })}
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
                'flex items-start justify-between p-6': true,
              })}
            >
              <div className="flex space-x-2">
                <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{index}</div>
                <h2 className="flex items-center h-6 px-3 text-sm leading-none border border-gray-900 rounded-xl">{title}</h2>
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
                    open: false,
                    stepDirection: null,
                    stepTop: null,
                    stepBottom: null,
                  }));
                  // scrollRef.current.scrollTop = 0;
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
            className="p-6 space-y-20 overflow-hidden"
          >
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis quidem praesentium veritatis ipsam, autem ex
              consequuntur atque iste rem repellendus aliquam!
              Non magni ex dicta, minima quod error adipisci iusto.
            </div>
          </Scroll.Item>

          {/* FOOTER */}
          <footer
            className={cx({
              'sticky bottom-0 z-10 h-12 bg-gradient-to-t rounded-b-3xl': true,
              [gradient]: !!gradient,
            })}
          />
        </div>
      </Scroll.Item>

      {/* CONTENT SCOLLABLE */}
      <div
        className="relative z-20 w-full px-6 pt-20 opacity-0 pointer-events-none"
      >
        <header
          className={cx({
            'bg-gradient-to-b rounded-t-3xl': true,
            [gradient]: !!gradient,
          })}
        >
          <div
            className={cx({
              'flex items-start justify-between p-6': true,
            })}
          >
            <div className="flex space-x-2">
              <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{index}</div>
              <h2 className="flex items-center h-6 px-3 text-sm leading-none border border-gray-900 rounded-xl">{title}</h2>
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
                  open: false,
                  stepDirection: null,
                  stepTop: null,
                  stepBottom: null,
                }));
                // scrollRef.current.scrollTop = 0;
              }}
            >
              <Icon
                icon={CLOSE_SVG}
                className="block w-4 h-4 stroke-current text-dark"
              />
            </motion.button>
          </div>
        </header>

        <div
          className="p-6 space-y-20 overflow-hidden"
        >
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis quidem praesentium veritatis ipsam, autem ex
            consequuntur atque iste rem repellendus aliquam!
            Non magni ex dicta, minima quod error adipisci iusto.
          </div>
        </div>
      </div>
    </Scroll.Section>
  );
};

export default ContentItem;
