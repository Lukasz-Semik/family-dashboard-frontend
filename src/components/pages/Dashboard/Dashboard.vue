<template>
  <div>
    <LoaderElement v-if="isFetchingCurrentUser"/>
    <template v-if="!isFetchingCurrentUser">
      <AppSidebar/>

      <div v-if="!currentUser.hasFamily" :class="[$style['app-wrapper']]">
        <WithoutFamilyPage/>
      </div>

      <div v-else>WITH FAMILY PLACEHOLDER cDSADSADSAD ASDASDSA DASDASD ASD ASD</div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { getCurrentUser } from '@/store/currentUser/actions';
import { currentUser, isFetchingCurrentUser } from '@/store/currentUser/getters';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import LoaderElement from '@/components/atoms/LoaderElement/LoaderElement';
import AppSidebar from '@/components/organisms/AppSidebar/AppSidebar.vue';

import WithoutFamilyPage from './WithoutFamilyPage/WithoutFamilyPage';

export default {
  components: {
    TitleElement,
    WithoutFamilyPage,
    AppSidebar,
    LoaderElement,
  },
  watch: {
    isFetchingCurrentUser(newVal, oldVal) {
      console.log({ newVal, oldVal });
    },
  },
  created() {
    this.getCurrentUser();
  },
  methods: {
    ...mapActions({ getCurrentUser }),
  },
  computed: {
    ...mapGetters({ currentUser, isFetchingCurrentUser }),
  },
};
</script>

<style lang="scss" module src="./Dashboard.scss" />
