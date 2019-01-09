<template>
  <h1>Dashboard placeholder</h1>
</template>

<script>
import { mapGetters } from 'vuex';

import { SIGN_IN_ROUTE } from '@/constants/routesNames';
import { isSignedIn } from '@/store/currentUser/getters';

export default {
  computed: mapGetters({
    isSignedIn,
  }),
  created() {
    if (!this.isSignedIn) this.$router.push({ name: SIGN_IN_ROUTE });
  },
};
</script>
