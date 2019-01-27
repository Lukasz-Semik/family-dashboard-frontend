import axios from 'axios';

import {
  API_SIGN_IN,
  API_CHECK_IS_SIGNED_IN,
  API_SIGN_UP,
  API_CONFIRM_ACCOUNT,
} from '@/constants/api';

const baseURL =
  process.env.PROCESS_ENV === 'production'
    ? 'https://family-dashboard-be.herokuapp.com'
    : 'http://localhost:8080';

export const api = axios.create({
  responseType: 'json',
  baseURL,
});

export const apiSignIn = (email, password) =>
  api
    .post(API_SIGN_IN, {
      email,
      password,
    })
    .catch(err => err.response);

export const apiCheckIsSignedIn = token =>
  api
    .get(API_CHECK_IS_SIGNED_IN, {
      headers: {
        authorization: token,
      },
    })
    .catch(err => err.response);

export const apiSignUp = payload => api.post(API_SIGN_UP, payload).catch(err => err.response);

export const apiConfirmAccount = token =>
  api.post(API_CONFIRM_ACCOUNT, { confirmationAccountToken: token }).catch(err => err.response);
