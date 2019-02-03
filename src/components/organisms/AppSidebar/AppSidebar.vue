<template>
  <div :class="[$style['app-sidebar']]">
    <RouterLink :to="dashboardRoute">
      <div :class="[$style['title-wrapper']]">
        <TitleElement
          translation-path="general.appTitle"
          is-small
          has-centered-text
        />
      </div>
    </RouterLink>

    <div :class="[$style['avatar-wrapper']]">
      <AvatarElement />
    </div>

    <nav
      v-if="hasFamily"
      :class="[$style['sidebar-nav']]"
    >
      <div :class="$style['nav-item']">
        <Link
          :to="todosRoute"
          translation-path="dashboard.nav.todos"
          is-black
        />
      </div>

      <div :class="$style['nav-item']">
        <Link
          :to="shoppingListsRoute"
          translation-path="dashboard.nav.shoppingLists"
          is-black
        />
      </div>

      <div
        v-if="isFamilyHead"
        :class="$style['nav-item']"
      >
        <Link
          :to="familySettingsRoute"
          translation-path="dashboard.nav.familySettings"
          is-black
        />
      </div>

      <div :class="$style['nav-item']">
        <Link
          :to="accountSettingsRoute"
          translation-path="dashboard.nav.accountSettings"
          is-black
        />
      </div>
    </nav>

    <div :class="[$style['sign-out-wrapper']]">
      <ButtonElement
        translation-path="general.signOut"
        @onClick="signOut"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { currentUser } from '@/store/currentUser/getters';
import { goToUrl } from '@/utils/general';
import { removeLocalStorageItem } from '@/utils/localStorage';
import {
  DASHBOARD_ROUTE,
  ACCOUNT_SETTINGS_ROUTE,
  FAMILY_SETTINGS_ROUTE,
  TODOS_ROUTE,
  SHOPPING_LISTS_ROUTE,
} from '@/constants/routesNames';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import AvatarElement from '@/components/atoms/AvatarElement/AvatarElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import Link from '@/components/atoms/Link/Link.vue';

export default {
  components: {
    TitleElement,
    AvatarElement,
    ButtonElement,
    Link,
  },
  data() {
    return {
      dashboardRoute: { name: DASHBOARD_ROUTE },
      accountSettingsRoute: { name: ACCOUNT_SETTINGS_ROUTE },
      familySettingsRoute: { name: FAMILY_SETTINGS_ROUTE },
      todosRoute: { name: TODOS_ROUTE },
      shoppingListsRoute: { name: SHOPPING_LISTS_ROUTE },
    };
  },
  computed: {
    ...mapGetters({ currentUser }),
    userName() {
      const { firstName, lastName } = this.currentUser;

      return `${firstName} ${lastName}`;
    },
    isFamilyHead() {
      return this.currentUser.isFamilyHead;
    },
    hasFamily() {
      return this.currentUser.hasFamily;
    },
  },
  methods: {
    signOut() {
      removeLocalStorageItem('_token');
      goToUrl('');
    },
  },
};
</script>


<style lang="scss" module src="./AppSidebar.scss" />
