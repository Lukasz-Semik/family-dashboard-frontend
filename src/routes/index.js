import {
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  DASHBOARD_ROUTE,
  WITHOUT_FAMILY_ROUTE,
  CONFIRM_ROUTE,
  CONFIRM_BEING_ADDED_ROUTE,
  CONFIRM_INVITATION_ROUTE,
  ACCOUNT_SETTINGS_ROUTE,
  TODOS_ROUTE,
  TODO_ROUTE,
  FAMILY_SETTINGS_ROUTE,
  SHOPPING_LISTS_ROUTE,
  SHOPPING_LIST_ROUTE,
} from '@/constants/routesNames';

import HomeElement from '@/components/pages/HomeElement/HomeElement.vue';
import SignInPage from '@/components/pages/HomeElement/SignInPage/SignInPage.vue';
import SignUpPage from '@/components/pages/HomeElement/SignUpPage/SignUpPage.vue';
import ConfirmCreatedAccountPage from '@/components/pages/ConfirmCreatedAccountPage/ConfirmCreatedAccountPage.vue';
import ConfirmBeingAddedPage from '@/components/pages/ConfirmBeingAddedPage/ConfirmBeingAddedPage.vue';
import ConfirmInvitationPage from '@/components/pages/ConfirmInvitationPage/ConfirmInvitationPage.vue';
import Dashboard from '@/components/pages/Dashboard/Dashboard.vue';
import WithFamilyPage from '@/components/pages/Dashboard/WithFamilyPage/WithFamilyPage.vue';
import WithoutFamilyPage from '@/components/pages/Dashboard/WithoutFamilyPage/WithoutFamilyPage.vue';
import AccountSettingsPage from '@/components/pages/Dashboard/SubPages/AccountSettingsPage/AccountSettingsPage.vue';
import FamilySettingsPage from '@/components/pages/Dashboard/FamilySettingsPage/FamilySettingsPage.vue';
import Todos from '@/components/pages/Dashboard/Todos/Todos.vue';
import TodosPage from '@/components/pages/Dashboard/Todos/TodosPage/TodosPage.vue';
import TodoPage from '@/components/pages/Dashboard/Todos/TodoPage/TodoPage.vue';
import ShoppingLists from '@/components/pages/Dashboard/ShoppingLists/ShoppingLists.vue';
import ShoppingListsPage from '@/components/pages/Dashboard/ShoppingLists/ShoppingListsPage/ShoppingListsPage.vue';
import ShoppingListPage from '@/components/pages/Dashboard/ShoppingLists/ShoppingListPage/ShoppingListPage.vue';

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
  component: Dashboard,
  children: [
    {
      path: '',
      component: WithFamilyPage,
      name: DASHBOARD_ROUTE,
    },
    {
      path: 'without-family',
      component: WithoutFamilyPage,
      name: WITHOUT_FAMILY_ROUTE,
    },
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
      component: Todos,
      children: [
        {
          path: '',
          component: TodosPage,
          name: TODOS_ROUTE,
        },
        {
          path: ':todoId',
          component: TodoPage,
          name: TODO_ROUTE,
        },
      ],
    },
    {
      path: 'shopping-lists',
      component: ShoppingLists,
      children: [
        {
          path: '',
          component: ShoppingListsPage,
          name: SHOPPING_LISTS_ROUTE,
        },
        {
          path: ':shoppingListId',
          component: ShoppingListPage,
          name: SHOPPING_LIST_ROUTE,
        },
      ],
    },
  ],
};

const confirmRoute = {
  path: '/confirm',
  name: CONFIRM_ROUTE,
  component: ConfirmCreatedAccountPage,
};

const confirmBeingAddedRoute = {
  path: '/confirm-being-added',
  name: CONFIRM_BEING_ADDED_ROUTE,
  component: ConfirmBeingAddedPage,
};

const confirmInvitationRoute = {
  path: '/confirm-invitation',
  name: CONFIRM_INVITATION_ROUTE,
  component: ConfirmInvitationPage,
};

export default [
  homeRoute,
  dashboardRoute,
  confirmRoute,
  confirmBeingAddedRoute,
  confirmInvitationRoute,
];
