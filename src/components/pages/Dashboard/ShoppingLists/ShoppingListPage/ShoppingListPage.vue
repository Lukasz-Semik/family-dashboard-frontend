<template>
  <div :class="[$style['wrapper']]">
    <TitleElement
      tag="h2"
      :translated-text="currentShoppingList.title"
      :is-crossed="currentShoppingList.isDone"
      is-black
    />

    <ButtonElement
      :translation-path="isEditing ? 'general.back' : 'shoppingLists.edit'"
      has-previous-theme
      is-inline
      :is-arrow-hidden="!isEditing"
      @onClick="isEditing=!isEditing"
    />

    <div :class="[$style['remove-all-button-wrapper']]">
      <ButtonElement
        translation-path="general.remove"
        is-hovered-red
        has-gray-theme
        is-inline
        @onClick="onRemove"
      />
    </div>

    <div v-if="isEditing">
      <ShoppingListForm :current-shopping-list="currentShoppingList" />
    </div>

    <template v-else>
      <div :class="[$style['shopping-list-row']]">
        <div :class="$style['items']">
          <ShoppingListItems
            :shopping-list="currentShoppingList"
            @updateShoppingList="onUpdateShoppingList"
          />
        </div>

        <div>
          <TextElement
            translation-path="general.deadline"
            is-bold
            is-green
          />
          <TextElement
            :translated-text="deadline"
            is-medium
            is-bold
            is-black
          />

          <div>
            <ItemUsersDetails
              :author-name="authorName"
              :created-at="createdAt"
              :updater-name="updaterName"
              :updated-at="updatedAt"
              :executor-name="executorName"
              has-no-margin-top
              is-not-centered
              is-column
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { isEmpty } from 'lodash';

import { apiDeleteShoppingList } from '@/api';
import { SHOPPING_LISTS_ROUTE } from '@/constants/routesNames';
import { shoppingListById } from '@/store/shoppingLists/getters';
import { getShoppingLists } from '@/store/shoppingLists/actions';
import { getFullDeadline, getDate } from '@/helpers/date';
import { getName } from '@/helpers/userNames';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import ItemUsersDetails from '@/components/molecules/ItemUsersDetails/ItemUsersDetails.vue';
import ShoppingListItems from '@/components/molecules/ShoppingListItems/ShoppingListItems.vue';
import ShoppingListForm from '@/components/organisms/ShoppingListForm/ShoppingListForm.vue';

export default {
  components: {
    TitleElement,
    TextElement,
    ButtonElement,
    ItemUsersDetails,
    ShoppingListItems,
    ShoppingListForm,
  },
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    ...mapGetters({ shoppingListById }),
    shoppingListId() {
      return Number(this.$route.params.shoppingListId);
    },
    currentShoppingList() {
      const currentShoppingList = this.shoppingListById(this.shoppingListId);
      return isEmpty(currentShoppingList) ? {} : currentShoppingList;
    },
    deadline() {
      return getFullDeadline(this.currentShoppingList.deadline);
    },
    authorName() {
      return getName('author', this.currentShoppingList);
    },
    createdAt() {
      return getDate(this.currentShoppingList.createdAt);
    },
    updaterName() {
      return getName('updater', this.currentShoppingList);
    },
    updatedAt() {
      return getDate(this.currentShoppingList.updatedAt);
    },
    executorName() {
      return this.currentShoppingList.isDone ? getName('executor', this.currentShoppingList) : '';
    },
  },
  created() {
    this.getShoppingLists();
  },
  methods: {
    ...mapActions({ getShoppingLists }),
    onUpdateShoppingList() {
      this.getShoppingLists();
    },
    async onRemove() {
      const response = await apiDeleteShoppingList(this.currentShoppingList.id);

      if (response.status === 200) {
        this.$router.push({ name: SHOPPING_LISTS_ROUTE });
      }
    },
  },
};
</script>

<style lang="scss" module src="./ShoppingListPage.scss" />
