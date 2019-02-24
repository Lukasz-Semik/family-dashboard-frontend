const API = '/api';

// USER API
const API_USER = `${API}/user`;
export const API_SIGN_IN = `${API_USER}/sign-in`;
export const API_CHECK_IS_SIGNED_IN = `${API_USER}/is-authorized`;
export const API_SIGN_UP = `${API_USER}/sign-up`;
export const API_CONFIRM_ACCOUNT = `${API_USER}/confirm`;
export const API_CONFIRM_INVITED = `${API_USER}/confirm-invited`;
export const API_GET_CURRENT_USER = `${API_USER}/current`;
export const API_INVITE_EXISTING_USER = `${API_USER}/add-to-family`;
export const API_INVITE_NEW_USER = `${API_USER}/invite`;

// FAMILY API
const API_FAMILY = `${API}/family`;
export const API_CREATE_FAMILY = `${API_FAMILY}/create`;
export const API_GET_FAMILY = `${API_FAMILY}/current`;

// TODOS API
export const API_TODOS = `${API}/todos`;
export const API_TODO = id => `${API_TODOS}/${id}`;

// SHOPPING LISTS API
export const API_SHOPPING_LISTS = `${API}/shopping-lists`;
export const API_SHOPPING_LIST = id => `${API_SHOPPING_LISTS}/${id}`;
