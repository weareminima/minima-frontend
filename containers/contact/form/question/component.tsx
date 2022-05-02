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
  const TIMEOUT = animation ? (Math.random() * 250) + 500 : 0;

  useTimeout(() => {
    setTEXT(text);
  }, TIMEOUT);

  return (
    <motion.div
      key={id + index}
      className="overflow-hidden"
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
      <div
        key={`${id}-question`}
        className={cx({
          'inline-flex relative items-center rounded-3xl py-2 px-4 text-sm w-full max-w-fit': true,
        })}
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
      </div>
    </motion.div>
  );
};

export default Question;
