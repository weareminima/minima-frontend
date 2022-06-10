import {
  FC, useCallback, useState,
} from 'react';

import { motion } from 'framer-motion';

import ContactModal from 'containers/contact/modal';

import Icon from 'components/icon';
import Modal from 'components/modal';

import CONTACT_ISOTYPE_SVG from 'svgs/contact-isotype.svg?sprite';
import CONTACT_TEXT_SVG from 'svgs/contact-text.svg?sprite';

interface ContactButtonProps {}

export const ContactButton: FC<ContactButtonProps> = () => {
  const [open, setOpen] = useState(false);

  // Callbacks
  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <motion.button
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: open ? 0 : 1,
          y: open ? 10 : 0,
          transition: {
            delay: open ? 0 : 0.5,
          },
        }}
        type="button"
        className="fixed z-20 flex items-center justify-center w-20 h-20 group right-4 bottom-4 md:right-6 md:bottom-6 lg:right-8 lg:bottom-8"
        onClick={onClick}
      >
        <motion.div
          className="absolute top-0 left-0 z-10 w-20 h-20"
          initial={{
            rotate: 0,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 15,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <Icon icon={CONTACT_TEXT_SVG} className="w-20 h-20 backface-invisible" />
        </motion.div>

        <div className="absolute z-0 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2 left-1/2" />

        <Icon icon={CONTACT_ISOTYPE_SVG} className="block w-4 h-4 transition-transform scale-100 group-hover:scale-110 backface-invisible" />
      </motion.button>

      <Modal
        title="Contact"
        open={open}
        onOpenChange={setOpen}
      >
        <ContactModal
          onClose={() => setOpen(false)}
        />
      </Modal>
    </>
  );
};

export default ContactButton;
