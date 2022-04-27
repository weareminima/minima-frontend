import {
  FC, useCallback,
} from 'react';

import { motion } from 'framer-motion';

import { useScroll } from 'hooks/scroll';

import Icon from 'components/icon';

import CONTACT_ISOTYPE_SVG from 'svgs/contact-isotype.svg?sprite';
import CONTACT_TEXT_SVG from 'svgs/contact-text.svg?sprite';

interface ContactButtonProps {}

export const ContactButton: FC<ContactButtonProps> = () => {
  const onClick = useCallback(() => {

  }, []);

  const { y } = useScroll();

  return (
    <button
      type="button"
      className="fixed z-20 flex items-center justify-center w-20 h-20 group right-4 bottom-4 md:right-6 md:bottom-6 lg:right-8 lg:bottom-8"
      onClick={onClick}
    >
      <motion.div
        className="absolute top-0 left-0 w-20 h-20"
        initial={{
          rotate: 0,
        }}
        animate={{
          rotate: y > 0 ? y * 0.3 : 0,
        }}
      >
        <Icon icon={CONTACT_TEXT_SVG} className="w-20 h-20 backface-invisible" />
      </motion.div>

      <Icon icon={CONTACT_ISOTYPE_SVG} className="block w-4 h-4 transition-transform scale-100 group-hover:scale-110 backface-invisible" />
    </button>
  );
};

export default ContactButton;
