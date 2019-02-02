const API = '/api';

// USER API
const API_USER = `${API}/user`;
export const API_SIGN_IN = `${API_USER}/sign-in`;
export const API_CHECK_IS_SIGNED_IN = `${API_USER}/is-authorized`;
export const API_SIGN_UP = `${API_USER}/sign-up`;
export const API_CONFIRM_ACCOUNT = `${API_USER}/confirm`;
export const API_GET_CURRENT_USER = `${API_USER}/current`;

// FAMILY API
const API_FAMILY = `${API}/family`;
export const API_CREATE_FAMILY = `${API_FAMILY}/create`;
export const API_GET_FAMILY = `${API_FAMILY}/current`;
