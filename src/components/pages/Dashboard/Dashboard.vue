<template>
  <div>
    <ToastElement />

    <div
      v-if="isFetchingCurrentUser"
      :class="[$style['loader-wrapper']]"
    >
      <LoaderElement />
    </div>

    <template v-else>
      <AppSidebar />

      <div :class="[$style['dashboard-wrapper']]">
        <FamilyHeader v-if="currentUser.hasFamily" />

        <RouterView />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { getCurrentUser } from '@/store/currentUser/actions';
import { currentUser, isFetchingCurrentUser } from '@/store/currentUser/getters';
import { WITHOUT_FAMILY_ROUTE } from '@/constants/routesNames';

import LoaderElement from '@/components/atoms/LoaderElement/LoaderElement.vue';
import ToastElement from '@/components/atoms/ToastElement/ToastElement.vue';
import FamilyHeader from '@/components/molecules/FamilyHeader/FamilyHeader.vue';
import AppSidebar from '@/components/organisms/AppSidebar/AppSidebar.vue';

export default {
  components: {
    AppSidebar,
    LoaderElement,
    FamilyHeader,
    ToastElement,
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
