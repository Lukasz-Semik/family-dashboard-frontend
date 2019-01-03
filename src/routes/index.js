import Home from '@/components/Home/Home.vue';
import SignInPage from '@/components/pages/SignInPage/SignInPage.vue';
import SignUpPage from '@/components/pages/SignUpPage/SignUpPage.vue';
import { HOME_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '@/constants/routesNames';

const homeRoute = {
  name: HOME_ROUTE,
  path: '/',
  components: {
    default: Home,
  },
  children: [
    {
      path: '',
      component: SignInPage,
      name: SIGN_IN_ROUTE,
    },
    {
      path: 'sign-up',
      component: SignUpPage,
      name: SIGN_UP_ROUTE,
    },
  ],
};

export default [homeRoute];
