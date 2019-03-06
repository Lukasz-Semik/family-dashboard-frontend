<template>
  <div :class="[$style['wrapper']]">
    <TitleElement translation-path="shoppingLists.title" is-black is-big/>

    <ButtonElement
      :translation-path="isCreating ? 'general.back' : 'shoppingLists.create'"
      has-previous-theme
      is-inline
      :is-arrow-hidden="!isCreating"
      @onClick="isCreating=!isCreating"
    />

    <div v-if="canRemoveAll" :class="[$style['remove-all-button-wrapper']]">
      <ButtonElement
        translation-path="shoppingLists.removeAll"
        is-hovered-red
        has-gray-theme
        is-inline
        @onClick="isRemoveAllModalOpen = true"
      />
    </div>

    <ShoppingListForm v-if="isCreating" @finishCreating="isCreating = false"/>

    <ShoppingLists v-else/>

    <ModalElement
      v-if="isRemoveAllModalOpen"
      title-translation-path="shoppingLists.confirmationMessage"
      button-translation-path="general.confirm"
      @onClose="isRemoveAllModalOpen = false"
      @onMainButtonClick="onRemoveAll"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { get } from 'lodash';

import { apiDeleteAllShoppingLists } from '@/api';
import { getShoppingLists } from '@/store/shoppingLists/actions';
import { shoppingLists } from '@/store/shoppingLists/getters';
import { showToast } from '@/store/toast/actions';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import ModalElement from '@/components/atoms/ModalElement/ModalElement.vue';
import ShoppingLists from '@/components/molecules/ShoppingLists/ShoppingLists.vue';
import ShoppingListForm from '@/components/organisms/ShoppingListForm/ShoppingListForm.vue';

export default {
  components: {
    TitleElement,
    ModalElement,
    ButtonElement,
    ShoppingLists,
    ShoppingListForm,
  },
  data() {
    return {
      isCreating: false,
      isRemoveAllModalOpen: false,
    };
  },
  computed: {
    ...mapGetters({ shoppingLists }),
    canRemoveAll() {
      return get(this.shoppingLists, 'length', 0) > 0 && !this.isCreating;
    },
  },
  methods: {
    ...mapActions({ getShoppingLists, showToast }),
    async onRemoveAll() {
      const response = await apiDeleteAllShoppingLists();

      if (response.status === 200) {
        await this.getShoppingLists();
        this.isRemoveAllModalOpen = false;
        this.showToast({ text: 'shoppingLists.allRemoved' });
      }
    },
  },
};
</script>

<style lang="scss" module src="./ShoppingListsPage.scss" />
