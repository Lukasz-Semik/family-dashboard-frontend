<template>
  <div>
    <HomeCardWrapper>
      <Card>
        <Title :translationPath="titleTranslationPath" isOrange isSmall isUppercased isCentered></Title>
      </Card>
    </HomeCardWrapper>

    <HomeCardWrapper>
      <Card isHoverable>
        <slot></slot>
      </Card>
    </HomeCardWrapper>
  </div>
</template>

<script>
import HomeCardWrapper from '@/components/atoms/Wrappers/HomeCardWrapper/HomeCardWrapper.vue';
import Card from '@/components/atoms/Card/Card.vue';
import Title from '@/components/atoms/Title/Title.vue';

export default {
  components: {
    HomeCardWrapper,
    Card,
    Title,
  },
  props: {
    titleTranslationPath: {
      type: String,
      required: true,
    },
  },
};
</script>
