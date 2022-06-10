import {
  FC, useCallback, useState,
} from 'react';

import { useCookies } from 'react-cookie';

import { motion } from 'framer-motion';

import ContactModal from 'containers/contact/modal';

import Button from 'components/button';
import Modal from 'components/modal';

interface CookiesProps {}

export const Cookies: FC<CookiesProps> = () => {
  const [open, setOpen] = useState(false);

  const [cookies, setCookie] = useCookies(['cookies-accepted']);
  const cookiesAccepted = cookies['cookies-accepted'];

  // Callbacks
  const onClickConfigure = useCallback(() => {
    setOpen(true);
  }, []);

  const onClickConfirm = useCallback(() => {
    setCookie('cookies-accepted', 'true', { path: '/' });
  }, [setCookie]);

  if (cookiesAccepted) {
    return null;
  }

  return (
    <>
      <motion.div
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
        className="fixed z-20 flex items-center justify-center group left-4 bottom-4 md:left-6 md:bottom-6 lg:left-8 lg:bottom-8"
      >
        <div className="flex flex-col sm:flex-row items-center bg-white px-3 py-2.5 space-y-2 sm:space-y-0 sm:space-x-3 border border-dark/10 rounded-3xl sm:rounded-4xl">
          <div className="flex items-center space-x-2">
            <div
              className="w-5 h-5"
              style={{
                backgroundImage: 'url(/images/cookies/cookie.png)',
              }}
            />
            <p className="text-sm">
              ¡Tenemos galletitas!
            </p>
          </div>

          <div className="flex space-x-2">
            <Button
              type="button"
              theme="primary-alt"
              size="s"
              onClick={onClickConfigure}
            >
              Configurar
            </Button>
            <Button
              type="button"
              theme="primary"
              size="s"
              onClick={onClickConfirm}
            >
              Ok
            </Button>
          </div>
        </div>

      </motion.div>

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

export default Cookies;
