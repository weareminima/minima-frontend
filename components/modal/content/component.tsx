import { FC } from 'react';

import { motion } from 'framer-motion';

import type { ModalContentProps } from './types';

export const ModalContent: FC<ModalContentProps> = ({
  children,
  floating,
  getFloatingProps,
  // onOpenChange,
}: ModalContentProps) => {
  return (
    <div
      className="flex flex-col items-end justify-end w-full h-full overflow-hidden pointer-events-none md:p-6 lg:p-8"
      {...getFloatingProps({
        ref: floating,
      })}

    >
      <motion.div
        key="contact-modal-content"
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            delay: 0.25,
          },
        }}
        exit={{
          opacity: 0,
          x: 20,
          transition: {
            delay: 0,
          },
        }}
        className="relative w-full md:w-1/3 bg-white shadow-2xl pointer-events-auto grow md:rounded-3xl max-w-md h-full md:max-h-[600px] flex flex-col"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ModalContent;
