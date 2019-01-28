<template>
  <div>
    <AppSidebar/>
    <SemipolarSpinner :animation-duration="2000" :size="65" :color="'#f99529'"/>
    <WithoutFamilyPage/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { SemipolarSpinner } from 'epic-spinners';

import { getCurrentUser } from '@/store/currentUser/actions';
import { currentUser, isFetchingCurrentUser } from '@/store/currentUser/getters';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import AppSidebar from '@/components/organisms/AppSidebar/AppSidebar.vue';

import WithoutFamilyPage from './WithoutFamilyPage/WithoutFamilyPage';

export default {
  components: {
    TitleElement,
    WithoutFamilyPage,
    SemipolarSpinner,
    AppSidebar,
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
