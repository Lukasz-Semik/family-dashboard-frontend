<template>
  <div :class="[$style['title-wrapper']]">
    <TitleElement translation-path="general.appTitle"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import { getCurrentUser } from '@/store/currentUser/actions';
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';

export default {
  created() {
    this.getCurrentUser();
  },
  components: {
    TitleElement,
  },
  methods: {
    ...mapActions({ getCurrentUser }),
  },
};
</script>

<style lang="scss" module src="./Dashboard.scss" />
