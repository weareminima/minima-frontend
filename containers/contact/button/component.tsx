import {
  FC, useCallback, useState,
} from 'react';

import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from '@floating-ui/react-dom-interactions';
import { AnimatePresence, motion } from 'framer-motion';

import { useScroll } from 'hooks/scroll';

import ContactModal from 'containers/contact/modal';

import Icon from 'components/icon';

import CONTACT_ISOTYPE_SVG from 'svgs/contact-isotype.svg?sprite';
import CONTACT_TEXT_SVG from 'svgs/contact-text.svg?sprite';

interface ContactButtonProps {}

export const ContactButton: FC<ContactButtonProps> = () => {
  const [open, setOpen] = useState(false);

  const { y } = useScroll();

  const { reference, floating, context } = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ]);

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
        {...getReferenceProps({ ref: reference })}
      >
        <motion.div
          className="absolute top-0 left-0 z-10 w-20 h-20"
          initial={{
            rotate: 0,
          }}
          animate={{
            rotate: y > 0 ? y * 0.3 : 0,
          }}
          transition={{
            type: 'tween',
            ease: 'easeOut',
          }}
        >
          <Icon icon={CONTACT_TEXT_SVG} className="w-20 h-20 backface-invisible" />
        </motion.div>

        <div className="absolute z-0 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2 left-1/2" />

        <Icon icon={CONTACT_ISOTYPE_SVG} className="block w-4 h-4 transition-transform scale-100 group-hover:scale-110 backface-invisible" />
      </motion.button>

      {/* Modal */}
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <FloatingOverlay
              lockScroll
              className="z-40"
            >
              <motion.div
                key="contact-modal"
                className="w-full h-full backdrop-blur-sm"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                <FloatingFocusManager
                  context={context}
                >
                  <ContactModal
                    floating={floating}
                    floatingProps={getFloatingProps({ ref: floating })}
                    open={open}
                    onClose={() => setOpen(false)}
                  />
                </FloatingFocusManager>
              </motion.div>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};

export default ContactButton;
