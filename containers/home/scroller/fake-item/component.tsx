import {
  FC,
} from 'react';

import cx from 'classnames';

import { useAppSelector } from 'store/hooks';

import {
  motion,
} from 'framer-motion';

import useStep from 'hooks/steps';

import Tag from 'components/tag';

interface FakeItemProps {}

export const FakeItem: FC<FakeItemProps> = () => {
  const {
    step, steps, exit,
  } = useAppSelector((state) => state['/home']);

  const STEP = useStep({ step, steps });

  return (
    <div
      className={cx({
        'absolute top-0 left-0 w-full h-full z-10': true,
        'lg:pt-20 md:pt-16 pt-12 ': true,
        'lg:p-8 md:p-6 p-4': true,
      })}
    >
      <motion.div
        initial={{
          padding: exit ? 24 : 16,
        }}
        animate={{
          padding: exit ? 16 : 24,
        }}
        transition={{
          duration: 0.5,
          bounce: 0,
        }}
        className={cx({
          'w-full h-full overflow-hidden flex flex-col p-4 grow rounded-3xl justify-between': true,
          [STEP.className]: true,
        })}
      >
        <header className="flex space-x-2">
          <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{STEP.index}</div>
          <Tag>
            {STEP.title}
          </Tag>
        </header>

        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {
              opacity: exit ? 0 : 1,
            },
            animate: {
              opacity: exit ? 1 : 0,
            },
          }}
          transition={{
            duration: 0.25,
            delay: exit ? 0.25 : 0,
            bounce: 0,
          }}
          className={cx({
            'max-w-[138px] origin-top-left': true,
          })}
        >
          {STEP.subtitle}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FakeItem;
