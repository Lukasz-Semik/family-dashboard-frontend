<template>
  <div :class="[$style['dashboard-wrapper']]">
    <FamilyHeader/>

    <div :class="[$style['items-wrapper']]">
      <div :class="[$style['items-row']]">
        <div :class="[$style['irems-col']]">
          <DashboardItem/>
        </div>

        <div :class="[$style['irems-col']]">
          <DashboardItem/>
        </div>
      </div>
    </div>

    <RouterView/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import { getFamily } from '@/store/currentFamily/actions';

import FamilyHeader from '@/components/molecules/FamilyHeader/FamilyHeader.vue';
import DashboardItem from '@/components/molecules/DashboardItem/DashboardItem.vue';

export default {
  components: {
    FamilyHeader,
    DashboardItem,
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
