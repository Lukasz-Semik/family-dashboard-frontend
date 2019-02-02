<template>
  <SemipolarSpinner
    :animation-duration="2000"
    :size="size"
    :color="'#f99529'"
  />
</template>

<script>
import { SemipolarSpinner } from 'epic-spinners';

export default {
  components: {
    SemipolarSpinner,
  },
  props: {
    size: {
      type: Number,
      default: 65,
    },
  },
};
</script>
