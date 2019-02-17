export const emailPasswordFields = [
  {
    name: 'email',
    type: 'email',
    fieldType: 'input',
    labelTranslationPath: 'forms.userSign.email.label',
    placeholderTranslationPath: 'forms.userSign.email.placeholder',
    isEmailRequired: true,
  },
  {
    name: 'password',
    type: 'password',
    fieldType: 'input',
    labelTranslationPath: 'forms.userSign.password.label',
    placeholderTranslationPath: 'forms.userSign.password.placeholder',
    minLengthRequired: 6,
    maxLengthRequired: 30,
  },
];

export const userNamesFields = [
  {
    name: 'firstName',
    type: 'text',
    fieldType: 'input',
    labelTranslationPath: 'forms.userSign.firstName.label',
    placeholderTranslationPath: 'forms.userSign.firstName.placeholder',
  },
  {
    name: 'lastName',
    type: 'text',
    fieldType: 'input',
    labelTranslationPath: 'forms.userSign.lastName.label',
    placeholderTranslationPath: 'forms.userSign.lastName.placeholder',
  },
];

export const genderOptions = [
  {
    value: 'male',
    label: 'forms.userSign.gender.options.male',
  },
  {
    value: 'female',
    label: 'forms.userSign.gender.options.female',
  },
  {
    value: 'other',
    label: 'forms.userSign.gender.options.other',
  },
];

export const userDetailsFields = [
  {
    name: 'birthDate',
    type: 'text',
    fieldType: 'datePicker',
    labelTranslationPath: 'forms.userSign.birthDate.label',
    placeholderTranslationPath: 'forms.userSign.birthDate.placeholder',
  },
  {
    name: 'gender',
    type: 'text',
    fieldType: 'dropdown',
    labelTranslationPath: 'forms.userSign.gender.label',
    placeholderTranslationPath: 'forms.userSign.gender.placeholder',
    options: genderOptions,
  },
];
