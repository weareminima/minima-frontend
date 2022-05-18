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

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/close.svg?sprite';

interface ContentItemProps {
  index: number;
  id: string;
  title: string;
  className: string;
}

export const ContentItem: FC<ContentItemProps> = ({
  index,
  id,
  title,
  className,
}) => {
  // const {
  //   step, steps,
  // } = useAppSelector((state) => state['/home']);

  const dispatch = useAppDispatch();

  return (
    <div
      key={id}
      className="relative w-full min-h-full p-6"
      style={{
        zIndex: index,
      }}
    >
      {/* BACKGROUND */}
      <div
        className={cx({
          'flex flex-col absolute interactive w-full h-full top-0 left-0 z-0 p-6 pt-20': true,
        })}
      >
        <div
          key="background"
          className={cx({
            'grow rounded-3xl': true,
            [className]: !!className,
          })}
        />
      </div>

      {/* SCROLL */}
      <div
        className={cx({
          'w-full h-full pt-14': true,
        })}
      >
        <div
          className="relative z-10"
        >
          <header
            key="header"
            className={cx({
              'sticky top-20 left-0 bg-white z-10': true,
            })}
          >
            <div
              className={cx({
                'flex items-start justify-between p-6 rounded-t-3xl roun': true,
                [className]: !!className,
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

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.5,
                duration: 0.75,
              },
            }}
            exit={{
              opacity: 0,
            }}
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
          </motion.div>

          <footer
            className={cx({
              'sticky bottom-0 left-0 bg-white': true,
            })}
          >
            <div
              className={cx({
                'flex items-start justify-between p-6 rounded-b-3xl roun': true,
                [className]: !!className,
              })}
            />
            <div className="h-6 bg-white -bottom-6" />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
