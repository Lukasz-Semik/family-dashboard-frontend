<template>
  <div>
    <div :class="[$style['title-wrapper']]">
      <Title translationPath="general.appTitle"></Title>
    </div>

    <router-view></router-view>
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

<style lang="scss" module src="./Home.scss" />
