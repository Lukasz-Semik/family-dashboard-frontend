import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';

import messages from './i18n';
import routes from './routes';
import App from './App.vue';

Vue.use(VueI18n);
Vue.use(VueRouter);

const i18n = new VueI18n({
  locale: 'en',
  messages,
});

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  el: '#app',
  render: h => h(App),
  i18n,
  router,
});
