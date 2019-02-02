import { forEach } from 'lodash';

export const isBrowser = () => typeof window !== 'undefined';

export const goToUrl = (pathName, params = {}) => {
  if (!isBrowser()) return '';

  const url = new URL(`${window.location.origin}${pathName}`);

  forEach(params, (value, key) => url.searchParams.append(key, value));

  window.location.assign(url);
};
