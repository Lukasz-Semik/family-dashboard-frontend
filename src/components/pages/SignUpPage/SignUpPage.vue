<template>
  <div>
    <div :class="[$style['card-wrapper']]">
      <Card>
        <Title translationPath="general.signUp" isOrange isSmall isUppercased isCentered></Title>
      </Card>
    </div>
  </div>
</template>

<script>
import Title from '@/components/atoms/Title/Title.vue';

export default {
  components: {
    Title,
  },
};
</script>
