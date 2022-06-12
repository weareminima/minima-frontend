import { useMutation } from 'react-query';

import CONTACT from 'services/contact';

export function useSaveContact() {
  const saveContact = ({ data }) => {
    return CONTACT.request({
      method: 'POST',
      data,
    });
  };

  return useMutation(saveContact, {
    onSuccess: (data: any, variables, context) => {
      console.info('Success', data, variables, context);
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.info('Error', error, variables, context);
    },
  });
}
