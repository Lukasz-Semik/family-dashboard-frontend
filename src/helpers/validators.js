import { isEmpty } from 'lodash';

export const validate = (value, { isRequired }) => {
  let isValid = true;
  let errorMsg = '';

  if (isRequired && isEmpty(value)) {
    isValid = false;
    errorMsg = 'forms.errors.required';
  }

  return {
    isValid,
    errorMsg,
  };
};
