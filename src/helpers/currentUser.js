import { get, isEmpty } from 'lodash';

import { apiSignIn, apiCheckIsSignedIn } from '@/api';
import { setLocalStorageItem, getLocalStorageItem } from '@/utils/localStorage';

export const checkIsSignedIn = async () => {
  const token = getLocalStorageItem('_token');

  if (isEmpty(token)) return false;

  try {
    const response = await apiCheckIsSignedIn();

    if (get(response, 'status') === 200 && get(response, 'data.isAuthorized')) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

export const signIn = async (email, password) => {
  try {
    const response = await apiSignIn(email, password);

    const isAuthorized = get(response, 'status') === 200;

    if (isAuthorized) {
      setLocalStorageItem('_token', get(response.data, 'token'));
    }

    return {
      isAuthorized,
    };
  } catch (error) {
    return {
      isAuthorized: false,
      error,
    };
  }
};
