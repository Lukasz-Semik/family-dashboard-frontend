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

export const checkIsFormValid = (values, fieldsToValidate) => {
  let isFormValid = true;

  fieldsToValidate.forEach(key => {
    if (values[key]) {
      isFormValid = false;
    }
  });

  return isFormValid;
};
