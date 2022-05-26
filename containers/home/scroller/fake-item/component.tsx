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

interface ContentFakeItemProps {}

export const ContentFakeItem: FC<ContentFakeItemProps> = () => {
  const {
    step, steps,
  } = useAppSelector((state) => state['/home']);

  const STEP = useStep({ step, steps });

  return (
    <div
      className={cx({
        'absolute top-0 left-0 w-full h-full pt-20 p-6 z-10': true,
      })}
    >
      <div
        className={cx({
          'w-full h-full overflow-hidden flex flex-col p-6 grow rounded-3xl justify-between': true,
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
          exit="exit"
          variants={{
            initial: {
              opacity: 1,
            },
            animate: {
              opacity: 0,
            },
            exit: {
              opacity: 1,
            },
          }}
          transition={{
            duration: 0.5,
          }}
          className={cx({
            'max-w-[160px] origin-top-left': true,
          })}
        >
          {STEP.subtitle}
        </motion.div>
      </div>
    </div>
  );
};

export default ContentFakeItem;
