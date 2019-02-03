<template>
  <div>
    <div :class="[$style['items-wrapper']]">
      <div :class="[$style['items-row']]">
        <div :class="[$style['irems-col']]">
          <TodoDashboardItem/>
        </div>

        <div :class="[$style['irems-col']]">
          <ShoppingListDashboardItem/>
        </div>
      </div>
    </div>

    <RouterView/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import { getFamily } from '@/store/currentFamily/actions';

import TodoDashboardItem from '@/components/molecules/DashboardItem/TodoDashboardItem.vue';
import ShoppingListDashboardItem from '@/components/molecules/DashboardItem/ShoppingListDashboardItem.vue';

export default {
  components: {
    TodoDashboardItem,
    ShoppingListDashboardItem,
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
