import moment from 'moment';

// eslint-disable-next-line no-confusing-arrow
export const getFullDeadline = deadline =>
  deadline ? `${moment(deadline).format('DD MMM YYYY')} - ${moment(deadline).fromNow()}` : '-';

export const getDate = date => (date ? moment(date).format('DD MMM YYYY') : '-');
