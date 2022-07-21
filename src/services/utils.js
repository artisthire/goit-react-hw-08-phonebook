import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { contactsApi } from 'redux/contacts/contacts-api';

const toastErrorNotification = {
  show(customText, error) {
    customText += error?.status ? ` Code: ${error.status}.` : '';
    customText += error?.data ? ` Message: ${JSON.stringify(error.data)}.` : '';

    const toastId = toast.error(customText, {
      toastId: `id-${customText.length}-${error?.status ?? 1}`,
    });
    return toastId;
  },
  hide(toastId) {
    toast.dismiss(toastId);
  },
};

const rtkContactsApiErrorLogger = _ => next => action => {
  if (
    isRejectedWithValue(action) &&
    action.type.startsWith(contactsApi.reducerPath)
  ) {
    toastErrorNotification.show('Error server connection.', action.payload);
  }

  return next(action);
};

export { toastErrorNotification, rtkContactsApiErrorLogger };
