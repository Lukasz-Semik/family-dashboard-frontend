<template>
  <div>
    <div v-if="isFetchingCurrentUser" :class="[$style['loader-wrapper']]">
      <LoaderElement/>
    </div>

    <template v-else>
      <AppSidebar/>

      <div :class="[$style['dashboard-wrapper']]">
        <FamilyHeader v-if="currentUser.hasFamily"/>

        <RouterView/>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { getCurrentUser } from '@/store/currentUser/actions';
import { currentUser, isFetchingCurrentUser } from '@/store/currentUser/getters';
import { WITHOUT_FAMILY_ROUTE } from '@/constants/routesNames';

import FamilyHeader from '@/components/molecules/FamilyHeader/FamilyHeader.vue';
import LoaderElement from '@/components/atoms/LoaderElement/LoaderElement.vue';
import AppSidebar from '@/components/organisms/AppSidebar/AppSidebar.vue';

import WithoutFamilyPage from './WithoutFamilyPage/WithoutFamilyPage.vue';
import WithFamilyPage from './WithFamilyPage/WithFamilyPage.vue';

export default {
  components: {
    WithoutFamilyPage,
    WithFamilyPage,
    AppSidebar,
    LoaderElement,
    FamilyHeader,
  },
  computed: {
    ...mapGetters({ currentUser, isFetchingCurrentUser }),
  },
  async created() {
    const { hasFamily } = await this.getCurrentUser();

    if (!hasFamily) {
      this.$router.push({ name: WITHOUT_FAMILY_ROUTE });
    }
  },
  methods: {
    ...mapActions({ getCurrentUser }),
  },
};
</script>

<style lang="scss" module src="./Dashboard.scss" />
