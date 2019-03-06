import axios from 'axios';
import { get } from 'lodash';

import {
  API_SIGN_IN,
  API_CHECK_IS_SIGNED_IN,
  API_SIGN_UP,
  API_CONFIRM_ACCOUNT,
  API_CONFIRM_INVITED,
  API_GET_CURRENT_USER,
  API_INVITE_EXISTING_USER,
  API_INVITE_NEW_USER,
  API_CREATE_FAMILY,
  API_GET_FAMILY,
  API_TODOS,
  API_TODO,
  API_SHOPPING_LISTS,
  API_SHOPPING_LIST,
} from '@/constants/api';
import { getLocalStorageItem } from '@/utils/localStorage';
import { goToUrl } from '@/utils/general';

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
    const requestUrl = get(error, 'request.responseURL');

    if (get(error, 'response.status') === 401 && !requestUrl.includes('is-authorized')) {
      goToUrl('');
    }

    return Promise.reject(error);
  }
);

// USER API
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

export const apiAddExistingUser = email =>
  api.patch(API_INVITE_EXISTING_USER, { email }).catch(err => err.response);

export const apiInviteNewUser = payload =>
  api.post(API_INVITE_NEW_USER, payload).catch(err => err.response);

export const apiConfirmInvited = (token, password) =>
  api.post(API_CONFIRM_INVITED, { invitationToken: token, password }).catch(err => err.response);

export const apiGetCurrentUser = () => api.get(API_GET_CURRENT_USER).catch(err => err.response);

// FAMILY API
export const apiCreateFamily = familyName =>
  api
    .post(API_CREATE_FAMILY, {
      familyName,
    })
    .catch(err => err.response);

export const apiGetFamily = () => api.get(API_GET_FAMILY).catch(err => err.response);

// TODOS API
export const apiGetTodos = () => api.get(API_TODOS).catch(err => err.response);

export const apiCreateTodo = payload => api.post(API_TODOS, payload).catch(err => err.response);

export const apiDeleteAllTodos = () => api.delete(API_TODOS).catch(err => err.response);

export const apiPatchTodo = (id, params) =>
  api.patch(API_TODO(id), params).catch(err => err.response);

export const apiDeleteTodo = id => api.delete(API_TODO(id)).catch(err => err.response);

// SHOPPING LISTS API
export const apiGetShoppingLists = () => api.get(API_SHOPPING_LISTS).catch(err => err.reposne);

export const apiDeleteAllShoppingLists = () =>
  api.delete(API_SHOPPING_LISTS).catch(err => err.reposne);

export const apiGetShoppingList = id => api.get(API_SHOPPING_LIST(id)).catch(err => err.response);

export const apiCreteShoppingList = payload =>
  api.post(API_SHOPPING_LISTS, payload).catch(err => err.response);

export const apiPatchShoppingList = (id, payload) =>
  api.patch(API_SHOPPING_LIST(id), payload).catch(err => err.response);

export const apiDeleteShoppingList = id =>
  api.delete(API_SHOPPING_LIST(id)).catch(err => err.response);
