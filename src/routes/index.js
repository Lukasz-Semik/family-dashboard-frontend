import Home from '@/components/pages/Home/Home.vue';
import SignInPage from '@/components/pages/Home/SignInPage/SignInPage.vue';
import SignUpPage from '@/components/pages/Home/SignUpPage/SignUpPage.vue';
import Dashboard from '@/components/pages/Dashboard/Dashboard.vue';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE, DASHBOARD_ROUTER } from '@/constants/routesNames';

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

const dashboardRoute = {
  path: '/dashboard',
  components: {
    default: Dashboard,
  },
};

export default [homeRoute, dashboardRoute];
