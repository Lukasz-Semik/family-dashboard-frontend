<template>
  <h1>Dashboard placeholder</h1>
</template>

<script>
import { mapGetters } from 'vuex';

import { SIGN_IN_ROUTE } from '@/constants/routesNames';
import { getIsLoggedIn } from '@/store/currentUser/names';

export default {
  created() {
    if (!this.isLoggedIn) this.$router.push({ name: SIGN_IN_ROUTE });
  },
  computed: mapGetters({
    isLoggedIn: getIsLoggedIn,
  }),
};
</script>
