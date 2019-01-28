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
import { currentUser } from '@/store/currentUser/getters';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';

import WithoutFamilyPage from './WithoutFamilyPage/WithoutFamilyPage';

export default {
  components: {
    TitleElement,
    WithoutFamilyPage,
  },
  created() {
    this.getCurrentUser();
  },
  methods: {
    ...mapActions({ getCurrentUser }),
  },
  computed: {
    ...mapGetters({ currentUser }),
  },
};
</script>

<style lang="scss" module src="./Dashboard.scss" />
