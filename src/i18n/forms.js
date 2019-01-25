export default {
  shared: {
    submit: 'Submit',
  },
  errors: {
    required: 'Required',
    minLength: 'Has to be longer than {msg}',
    maxLength: 'Cannot be longer than {msg}',
    wrongEmailFormat: 'Wrong format of e-mail',
  },
  userSign: {
    email: {
      label: 'E-mail',
      placeholder: 'E.g. john@gmail.com',
    },
    password: {
      label: 'Password',
      placeholder: 'Your secret password',
    },
    firstName: {
      label: 'First name',
      placeholder: 'E.g. Harry',
    },
    lastName: {
      label: 'Last name',
      placeholder: 'E.g. Potter',
    },
    birthDate: {
      label: 'Birth date',
      placeholder: 'E.g. 01.01.1990',
    },
    gender: {
      label: 'Gender',
      placeholder: 'E.g. Male',
      options: {
        male: 'Male',
        female: 'Female',
        other: 'Other',
      },
    },
  },
};
