import {
  FC, useRef,
} from 'react';

import ContactForm from 'containers/contact/form';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/close.svg?sprite';
import CONTACT_ISOTYPE_2_SVG from 'svgs/contact-isotype-2.svg?sprite';

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: FC<ContactModalProps> = ({
  onClose,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col justify-between flex-grow overflow-x-hidden overflow-y-auto scroll-smooth md:rounded-4xl"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 pr-5 bg-white border-b border-dark/10">
        <h2 className="flex items-center space-x-4 text-base">
          <Icon icon={CONTACT_ISOTYPE_2_SVG} className="w-8 h-8" />
          <span>Mínima</span>
        </h2>

        <button
          type="button"
          className="flex items-center justify-center w-6 h-6 transition-colors border rounded-full border-dark/10 hover:border-dark"
          onClick={onClose}
        >
          <Icon icon={CLOSE_SVG} className="w-2 h-2 stroke-dark" />
        </button>
      </header>

      <ContactForm
        scrollRef={scrollRef}
      />
    </div>
  );
};

export default ContactModal;
