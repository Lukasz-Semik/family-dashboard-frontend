import { isEmpty } from 'lodash';

export const getName = (role, item) => {
  if (isEmpty(item) || isEmpty(item[role])) return '';

  const { firstName, lastName } = item[role];

  return `${firstName} ${lastName}`;
};
