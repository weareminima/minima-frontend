import {
  FC,
} from 'react';

import cx from 'classnames';

import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  index: number;
  className?: string;
  title: string;
}

export const Section: FC<SectionProps> = ({
  id,
  className,
  index,
  title,
}: SectionProps) => {
  return (
    <motion.section
      key={id}
      className={cx({
        'p-8 min-h-full': true,
        [className]: !!className,
      })}
      initial={{
        opacity: 1,
      }}
    >
      <header className="flex space-x-2">
        <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-gray-900 rounded-full">{index}</div>
        <h2 className="flex items-center h-6 px-3 text-sm leading-none border border-gray-900 rounded-xl">{title}</h2>
      </header>
    </motion.section>
  );
};

export default Section;
