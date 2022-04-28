import {
  FC,
} from 'react';

import { motion } from 'framer-motion';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/close.svg?sprite';
import CONTACT_ISOTYPE_2_SVG from 'svgs/contact-isotype-2.svg?sprite';

interface ContactModalProps {
  open?: boolean;
  onClose: () => void;
  floating: any;
  floatingProps: Record<string, any>;
}

export const ContactModal: FC<ContactModalProps> = ({
  onClose,
  floating,
  floatingProps,
}) => {
  return (
    <div
      ref={floating}
      className="flex flex-col items-end justify-end w-full h-full p-8 pointer-events-none"
      {...floatingProps}
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
        className="w-1/3 bg-white shadow-2xl pointer-events-auto grow rounded-3xl max-w-md max-h-[600px] overflow-y-auto overflow-x-hidden"
      >
        {/* HEADER */}
        <header className="flex items-center justify-between p-4 border-b border-dark/10">
          <h2 className="flex items-center space-x-2 text-base">
            <Icon icon={CONTACT_ISOTYPE_2_SVG} className="w-8 h-8" />
            <span>Mínima</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
          >
            <Icon icon={CLOSE_SVG} className="w-4 h-4 stroke-current" />
          </button>
        </header>

        {/* FORM */}
      </motion.div>
    </div>
  );
};

export default ContactModal;
