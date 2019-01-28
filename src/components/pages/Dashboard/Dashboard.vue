<template>
  <div>
    <div :class="[$style['title-wrapper']]">
      <TitleElement translation-path="general.appTitle"/>
    </div>

    <WithoutFamilyPage/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { getCurrentUser } from '@/store/currentUser/actions';
import { currentUser, isFetchingCurrentUser } from '@/store/currentUser/getters';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';

import WithoutFamilyPage from './WithoutFamilyPage/WithoutFamilyPage';

export default {
  components: {
    TitleElement,
    WithoutFamilyPage,
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
