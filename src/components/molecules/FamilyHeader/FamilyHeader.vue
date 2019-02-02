<template>
  <div :class="[$style['family-header']]">
    <p :class="[$style['family-header-text']]">
      <span :class="[$style['label']]">{{ $t('dashboard.family') }}:</span>
      <span :class="[$style['value']]">{{ currentFamily.name }}</span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { currentFamily } from '@/store/currentFamily/getters';

export default {
  computed: {
    ...mapGetters({ currentFamily }),
  },
};
</script>

<style lang="scss" module src="./FamilyHeader.scss" />
