import { get, isEmpty } from 'lodash';

import { apiCheckIsSignedIn } from '@/api';
import { getLocalStorageItem } from '@/utils/localStorage';

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
