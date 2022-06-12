import {
  FC, useState,
} from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';

import useTimeout from 'hooks/timeout';

import { COLORS } from 'constants/colors';

export interface QuestionProps {
  id: string;
  index: number;
  text: string;
  animation: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

export const Question: FC<QuestionProps> = ({
  id,
  index,
  text,
  animation,
  onAnimationStart,
  onAnimationComplete,
}: QuestionProps) => {
  const [TEXT, setTEXT] = useState('...');
  const COLOR = COLORS[index % COLORS.length];
  const TIMEOUT = animation ? 1250 : 0;

  useTimeout(() => {
    setTEXT(text);
  }, TIMEOUT + 1);

  return (
    <motion.div
      key={id + index}
      className="overflow-hidden max-w-[270px]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          width: 47,
        },
        visible: {
          width: '100%',
          transition: {
            duration: 0,
            delay: TIMEOUT / 1000,
          },
        },
      }}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.div
        key={`${id}-question`}
        className={cx({
          'inline-flex relative items-center rounded-3xl py-2 px-4 text-sm w-full max-w-fit': true,
        })}
        initial={{
          opacity: animation ? 0 : 1,
          scale: animation ? 0.85 : 1,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: animation ? 0.25 : 0,
          delay: animation ? 0.5 : 0,
        }}
      >
        <div
          className="absolute top-0 left-0 z-0 w-full h-full border"
          style={{
            backgroundColor: COLOR,
            borderRadius: '24px 24px 24px 4px',
            borderColor: COLOR,
          }}
        />
        <span className="relative z-10">
          {TEXT}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default Question;
