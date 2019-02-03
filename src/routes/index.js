import {
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  DASHBOARD_ROUTE,
  CONFIRM_ROUTE,
  ACCOUNT_SETTINGS_ROUTE,
  TODOS_ROUTE,
  FAMILY_SETTINGS_ROUTE,
  SHOPPING_LISTS_ROUTE,
} from '@/constants/routesNames';

import HomeElement from '@/components/pages/HomeElement/HomeElement.vue';
import SignInPage from '@/components/pages/HomeElement/SignInPage/SignInPage.vue';
import SignUpPage from '@/components/pages/HomeElement/SignUpPage/SignUpPage.vue';
import ConfirmPage from '@/components/pages/ConfirmPage/ConfirmPage.vue';
import Dashboard from '@/components/pages/Dashboard/Dashboard.vue';
import AccountSettingsPage from '@/components/pages/Dashboard/SubPages/AccountSettingsPage/AccountSettingsPage.vue';
import FamilySettingsPage from '@/components/pages/Dashboard/SubPages/FamilySettingsPage/FamilySettingsPage.vue';
import TodosPage from '@/components/pages/Dashboard/SubPages/TodosPage/TodosPage.vue';
import ShoppingListsPage from '@/components/pages/Dashboard/SubPages/ShoppingListsPage/ShoppingListsPage.vue';

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
  children: [
    {
      path: 'account-settings',
      component: AccountSettingsPage,
      name: ACCOUNT_SETTINGS_ROUTE,
    },
    {
      path: 'family-settings',
      component: FamilySettingsPage,
      name: FAMILY_SETTINGS_ROUTE,
    },
    {
      path: 'todos',
      component: TodosPage,
      name: TODOS_ROUTE,
    },
    {
      path: 'shopping-lists',
      component: ShoppingListsPage,
      name: SHOPPING_LISTS_ROUTE,
    },
  ],
};

const confirmRoute = {
  path: '/confirm',
  name: CONFIRM_ROUTE,
  component: ConfirmPage,
};

export default [homeRoute, dashboardRoute, confirmRoute];
