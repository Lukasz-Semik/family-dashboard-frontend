module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'import/no-named-as-default-member': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'accumulator'],
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: ['**/*.spec.js'],
      globals: {
        mount: true,
        shallowMount: true,
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        jest: true,
      },
    },
  ],
};
