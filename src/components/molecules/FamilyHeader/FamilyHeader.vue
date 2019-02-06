<template>
  <div :class="[$style['family-header']]">
    <p :class="[$style['family-header-text']]">
      <span :class="[$style['label']]">
        {{ $t('dashboard.family.name') }}:
      </span>
      <span :class="[$style['value']]">
        {{ currentFamily.name }}
      </span>
    </p>

    <p :class="[$style['family-header-text']]">
      <span :class="[$style['label']]">
        {{ $t('dashboard.family.size') }}:
      </span>
      <span :class="[$style['value']]">
        {{ usersCounter }}
      </span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { get } from 'lodash';

import { currentFamily } from '@/store/currentFamily/getters';

export default {
  computed: {
    ...mapGetters({ currentFamily }),
    usersCounter() {
      return get(this.currentFamily, 'users.length', 0);
    },
  },
};
</script>

<style lang="scss" module src="./FamilyHeader.scss" />
