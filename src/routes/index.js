import HomeElement from '@/components/pages/HomeElement/HomeElement.vue';
import SignInPage from '@/components/pages/HomeElement/SignInPage/SignInPage.vue';
import SignUpPage from '@/components/pages/HomeElement/SignUpPage/SignUpPage.vue';
import Dashboard from '@/components/pages/Dashboard/Dashboard.vue';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE, DASHBOARD_ROUTE } from '@/constants/routesNames';

const homeRoute = {
  path: '/',
  components: {
    default: HomeElement,
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

const dashboardRoute = {
  path: '/dashboard',
  name: DASHBOARD_ROUTE,
  components: {
    default: Dashboard,
  },
};

export default [homeRoute, dashboardRoute];
