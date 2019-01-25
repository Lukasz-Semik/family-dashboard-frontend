import { isEmpty, get } from 'lodash';
import isEmail from 'is-email';

export const validate = (
  value,
  // eslint-disable-next-line
  { isRequired, isEmailRequired, minLengthRequired, maxLengthRequired }
) => {
  let isValid = true;
  let errorMsg = '';
  let errorTranslationValues = '';

  if (isRequired && isEmpty(value)) {
    isValid = false;
    errorMsg = 'forms.errors.required';
  }

  if (isValid && isEmailRequired && !isEmail(value)) {
    isValid = false;
    errorMsg = 'forms.errors.wrongEmailFormat';
  }

  if (isValid && minLengthRequired && get(value, 'length', 0) < minLengthRequired) {
    isValid = false;
    errorMsg = 'forms.errors.minLength';
    errorTranslationValues = minLengthRequired;
  }

  if (isValid && minLengthRequired && get(value, 'length', 0) > maxLengthRequired) {
    isValid = false;
    errorMsg = 'forms.errors.maxLength';
    errorTranslationValues = maxLengthRequired;
  }

  return {
    isValid,
    errorMsg,
    errorTranslationValues,
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
