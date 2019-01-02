import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';

import messages from './i18n';
import routes from './routes';
import App from './App.vue';
import store from './store';

Vue.use(VueRouter);
Vue.use(VueI18n);

const router = new VueRouter({
  mode: 'history',
  routes,
});

const i18n = new VueI18n({
  locale: 'en',
  messages,
});

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
  i18n,
});
