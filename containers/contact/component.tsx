import {
  FC,
} from 'react';

import ContactButton from 'containers/contact/button';

interface ContactProps {}

export const Contact: FC<ContactProps> = () => {
  return (
    <ContactButton />
  );
};

export default Contact;
