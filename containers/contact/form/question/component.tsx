import {
  FC, useState,
} from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';

import useTimeout from 'hooks/timeout';

import { COLORS } from 'constants/colors';

interface QuestionProps {
  id: string;
  index: number;
  text: string;
  animation: boolean;
}

export const Question: FC<QuestionProps> = ({
  id,
  index,
  text,
  animation,
}: QuestionProps) => {
  const [TEXT, setTEXT] = useState('...');
  const COLOR = COLORS[index % COLORS.length];
  const DURATION = animation ? 0.5 : 0;
  const TIMEOUT = animation ? (Math.random() * 250) + 750 : 0;

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
          width: 44,
        },
        visible: {
          width: '100%',
          transition: {
            duration: DURATION,
            delay: TIMEOUT / 1000,
          },
        },
      }}
    >
      <div
        key={`${id}-question`}
        className={cx({
          'inline-flex items-center rounded-3xl h-10 px-4 border text-sm whitespace-nowrap w-full max-w-fit': true,
        })}
        style={{
          backgroundColor: COLOR,
          borderRadius: '24px 24px 24px 4px',
          borderColor: COLOR,
        }}
      >
        {TEXT}
      </div>
    </motion.div>
  );
};

export default Question;
