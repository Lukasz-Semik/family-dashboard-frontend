const Vue = require('vue');
const proxy = require('identity-obj-proxy');

Object.defineProperty(Vue.prototype, '$style', {
  enumerable: false,
  writable: false,
  value: proxy,
});
