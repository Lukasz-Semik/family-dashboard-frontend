<template>
  <SubPageWrapper>
    <RouterView/>
  </SubPageWrapper>
</template>

<script>
import SubPageWrapper from '@/components/atoms/Wrappers/SubPageWrapper/SubPageWrapper.vue';

export default {
  components: {
    SubPageWrapper,
  },
};
</script>

