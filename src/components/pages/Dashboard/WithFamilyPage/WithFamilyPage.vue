<template>
  <div :class="[$style['dashboard-wrapper']]">
    <FamilyHeader/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import { getFamily } from '@/store/currentFamily/actions';

import FamilyHeader from '@/components/molecules/FamilyHeader/FamilyHeader.vue';

export default {
  components: {
    FamilyHeader,
  },
  created() {
    this.getFamily();
  },
  methods: {
    ...mapActions({ getFamily }),
  },
};
</script>

<style lang="scss" module src="./WithFamilyPage.scss" />
