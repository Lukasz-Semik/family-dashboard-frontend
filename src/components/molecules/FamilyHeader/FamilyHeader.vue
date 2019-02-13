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
import { mapGetters, mapActions } from 'vuex';
import { get, isEmpty } from 'lodash';

import { currentFamily } from '@/store/currentFamily/getters';
import { getFamily } from '@/store/currentFamily/actions';

export default {
  computed: {
    ...mapGetters({ currentFamily }),
    usersCounter() {
      return get(this.currentFamily, 'users.length', 0);
    },
  },
  created() {
    if (isEmpty(this.currentFamily)) this.getFamily();
  },
  methods: {
    ...mapActions({ getFamily }),
  },
};
</script>

<style lang="scss" module src="./FamilyHeader.scss" />
