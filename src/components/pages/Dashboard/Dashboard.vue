<template>
  <h1>Dashboard placeholder</h1>
</template>

<script>
import { mapGetters } from 'vuex';

import { SIGN_IN_ROUTE } from '@/constants/routesNames';
import { getIsSignedIn } from '@/store/currentUser/getters';

export default {
  created() {
    if (!this.isLoggedIn) this.$router.push({ name: SIGN_IN_ROUTE });
  },
  computed: mapGetters({
    isLoggedIn: getIsSignedIn,
  }),
};
</script>
