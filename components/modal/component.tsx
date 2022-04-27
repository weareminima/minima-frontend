import {
  Children, FC, cloneElement, isValidElement, useRef,
} from 'react';

import cx from 'classnames';

import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import {
  useOverlay, usePreventScroll, useModal, OverlayContainer,
} from '@react-aria/overlays';
import { AnimatePresence, motion } from 'framer-motion';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/close.svg?sprite';

import { CONTENT_CLASSES, OVERLAY_CLASSES } from './constants';
import type { ModalProps } from './types';

export const Modal: FC<ModalProps> = ({
  title,
  open,
  dismissable = true,
  size = 'default',
  children,
  className,
  onDismiss,
}: ModalProps) => {
  const containerRef = useRef();
  const { overlayProps } = useOverlay(
    {
      isKeyboardDismissDisabled: !dismissable,
      isDismissable: dismissable,
      isOpen: open,
      onClose: onDismiss,
    },
    containerRef,
  );
  const { modalProps } = useModal();
  const { dialogProps } = useDialog({ 'aria-label': title }, containerRef);

  usePreventScroll({ isDisabled: !open });

  return (
    <AnimatePresence>
      {open && (
        <OverlayContainer>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.125,
              },
            }}
            className={cx({ [OVERLAY_CLASSES]: true })}
          >
            <FocusScope contain restoreFocus autoFocus>
              <div {...overlayProps} {...dialogProps} {...modalProps} ref={containerRef}>
                <motion.div
                  initial={{
                    opacity: 0,
                    y: '-60%',
                    x: '-50%',
                  }}
                  animate={{
                    opacity: 1,
                    y: '-50%',
                    x: '-50%',
                    transition: {
                      delay: 0.125,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: '-60%',
                    x: '-50%',
                    transition: {
                      delay: 0,
                    },
                  }}
                  className={cx({ [CONTENT_CLASSES[size]]: true, [className]: !!className })}
                  style={{
                    maxHeight: '90%',
                  }}
                >
                  {dismissable && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={onDismiss}
                        className="absolute flex items-center px-4 py-4 text-sm text-gray-300 right-4 -top-4 focus:text-black hover:text-black"
                      >
                        <span className="text-xs">Close</span>
                        <Icon icon={CLOSE_SVG} className="inline-block w-3 h-3 ml-2 text-black stroke-current" />
                      </button>
                    </div>
                  )}

                  {/* Children */}
                  {Children.map(children, (child) => {
                    if (isValidElement(child)) {
                      return cloneElement(child, {
                        onDismiss,
                      });
                    }
                    return null;
                  })}
                </motion.div>
              </div>
            </FocusScope>
          </motion.div>
        </OverlayContainer>
      )}
    </AnimatePresence>
  );
};

export default Modal;
