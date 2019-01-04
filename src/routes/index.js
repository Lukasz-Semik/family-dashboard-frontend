import Home from '@/components/pages/HomePage/HomePage.vue';
import SignInPage from '@/components/pages/SignInPage/SignInPage.vue';
import SignUpPage from '@/components/pages/SignUpPage/SignUpPage.vue';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '@/constants/routesNames';

const homeRoute = {
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
