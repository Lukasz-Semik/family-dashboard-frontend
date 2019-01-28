import axios from 'axios';

import {
  API_SIGN_IN,
  API_CHECK_IS_SIGNED_IN,
  API_SIGN_UP,
  API_CONFIRM_ACCOUNT,
  API_GET_CURRENT_USER,
} from '@/constants/api';
import { getLocalStorageItem } from '@/utils/localStorage';

const baseURL =
  process.env.PROCESS_ENV === 'production'
    ? 'https://family-dashboard-be.herokuapp.com'
    : 'http://localhost:8080';

export const api = axios.create({
  responseType: 'json',
  baseURL,
});

api.interceptors.request.use(config => {
  const { headers } = config;

  return {
    ...config,
    headers: {
      ...headers,
      authorization: getLocalStorageItem('_token') || '',
    },
  };
});

api.interceptors.response.use(
  response => response,
  error => {
    // TODO: handle unathorized (401) response
    console.log(error.response);

    return Promise.reject(error);
  }
);

export const apiSignIn = (email, password) =>
  api
    .post(API_SIGN_IN, {
      email,
      password,
    })
    .catch(err => err.response);

export const apiCheckIsSignedIn = () => api.get(API_CHECK_IS_SIGNED_IN).catch(err => err.response);

export const apiSignUp = payload => api.post(API_SIGN_UP, payload).catch(err => err.response);

export const apiConfirmAccount = token =>
  api.post(API_CONFIRM_ACCOUNT, { confirmationAccountToken: token }).catch(err => err.response);

export const apiGetCurrentUser = () => api.get(API_GET_CURRENT_USER).catch(err => err.response);
