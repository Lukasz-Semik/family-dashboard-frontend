<template>
  <div>
    <LoaderElement v-if="isFetchingCurrentUser" />
    <template v-if="!isFetchingCurrentUser">
      <AppSidebar />

      <div
        v-if="!currentUser.hasFamily"
        :class="[$style['app-wrapper']]"
      >
        <WithoutFamilyPage />
      </div>

      <div v-else>
        WITH FAMILY PLACEHOLDER cDSADSADSAD ASDASDSA DASDASD ASD ASD
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { getCurrentUser } from '@/store/currentUser/actions';
import { currentUser, isFetchingCurrentUser } from '@/store/currentUser/getters';

import LoaderElement from '@/components/atoms/LoaderElement/LoaderElement.vue';
import AppSidebar from '@/components/organisms/AppSidebar/AppSidebar.vue';

import WithoutFamilyPage from './WithoutFamilyPage/WithoutFamilyPage.vue';

export default {
  components: {
    WithoutFamilyPage,
    AppSidebar,
    LoaderElement,
  },
  computed: {
    ...mapGetters({ currentUser, isFetchingCurrentUser }),
  },
  created() {
    this.getCurrentUser();
  },
  methods: {
    ...mapActions({ getCurrentUser }),
  },
};
</script>

<style lang="scss" module src="./Dashboard.scss" />
