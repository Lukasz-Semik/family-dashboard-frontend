import Home from '@/components/pages/Home/Home.vue';
import SignInPage from '@/components/pages/Home/SignInPage/SignInPage.vue';
import SignUpPage from '@/components/pages/Home/SignUpPage/SignUpPage.vue';
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
