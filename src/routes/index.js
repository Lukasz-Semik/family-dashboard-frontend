import SignInPage from '@/components/pages/SignInPage/SignInPage.vue';
import SignUpPage from '@/components/pages/SignUpPage/SignUpPage.vue';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '@/constants/routesNames';

const signInRoute = {
  path: '/',
  component: SignInPage,
  name: SIGN_IN_ROUTE,
};

const signUpRoute = {
  path: '/sign-up',
  component: SignUpPage,
  name: SIGN_UP_ROUTE,
};

export default [signInRoute, signUpRoute];
