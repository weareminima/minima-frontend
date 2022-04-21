import {
  FC,
} from 'react';

import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  className?: string;
}

export const Section: FC<SectionProps> = ({
  id,
  className,
}: SectionProps) => {
  return (
    <motion.section
      key={id}
      className={className}
      initial={{
        opacity: 1,

      }}
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

export default Section;
