<template>
  <div>
    <div v-if="isFetchingCurrentUser" :class="[$style['loader-wrapper']]">
      <LoaderElement/>
    </div>
    <template v-else>
      <AppSidebar/>

      <div v-if="!currentUser.hasFamily" :class="[$style['app-wrapper']]">
        <WithoutFamilyPage/>
      </div>

      <div v-else>
        <WithFamilyPage/>
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
import WithFamilyPage from './WithFamilyPage/WithFamilyPage.vue';

export default {
  components: {
    WithoutFamilyPage,
    WithFamilyPage,
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
