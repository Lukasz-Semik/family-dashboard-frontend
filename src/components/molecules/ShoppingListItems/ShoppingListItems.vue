<template>
  <div>
    <div>
      <TitleElement
        tag="h2"
        translation-path="shoppingLists.activeItems"
        is-black
        is-small
      />
    </div>

    <ul
      v-if="activeItems.length > 0"
      :class="[$style['active-items-list']]"
    >
      <li
        v-for="item in activeItems"
        :key="item.id"
      >
        <Item
          :item="item"
          @clickItem="onItemClick"
        />
      </li>
    </ul>

    <div
      v-else
      :class="$style['has-margin-bottom']"
    >
      <TextElement
        translation-path="shoppingLists.noActiveItems"
        is-bold
        is-green
        is-medium
      />
    </div>

    <div>
      <TitleElement
        tag="h2"
        translation-path="shoppingLists.takenItems"
        is-black
        is-small
      />
    </div>

    <ul v-if="takenItems.length > 0">
      <li
        v-for="item in takenItems"
        :key="item.id"
      >
        <Item
          :item="item"
          @clickItem="onItemClick"
        />
      </li>
    </ul>

    <div v-else>
      <TextElement
        translation-path="shoppingLists.noTakenItems"
        is-bold
        is-green
        is-medium
      />
    </div>
  </div>
</template>

<script>
import { apiGetShoppingList, apiPatchShoppingList } from '@/api';
import { get, isEmpty } from 'lodash';

import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';

import Item from './Item.vue';

export default {
  components: {
    TitleElement,
    TextElement,
    Item,
  },
  data() {
    return {
      currentShopingList: {},
      isShoppinListDone: false,
      isEditing: false,
    };
  },
  computed: {
    activeItems() {
      return this.filterItems(false);
    },
    takenItems() {
      return this.filterItems(true);
    },
    items() {
      return [...this.activeItems, ...this.takenItems];
    },
    currentShopingListId() {
      return this.$route.params.shoppingListId;
    },
  },
  created() {
    this.getShoppingList();
  },
  methods: {
    async onItemClick(payload) {
      const { itemId } = payload;

      const newItems = this.items.map(item => ({
        ...item,
        isDone: item.id === itemId ? !item.isDone : item.isDone,
      }));

      const response = await apiPatchShoppingList(this.currentShopingListId, { items: newItems });

      if (response.status === 200) {
        this.currentShopingList = get(response, 'data.updatedShoppingList', {});
        const { isDone } = this.currentShopingList;
        this.emitUpdateShoppingList(this.isShoppinListDone, isDone);

        this.isShoppinListDone = isDone;
      }
    },
    filterItems(isDone) {
      if (isEmpty(this.currentShopingList)) return [];

      const { items } = this.currentShopingList;

      if (isEmpty(items)) return [];

      return items.filter(item => item.isDone === isDone);
    },
    async getShoppingList() {
      const response = await apiGetShoppingList(this.currentShopingListId);

      if (response.status === 200) {
        this.currentShopingList = get(response, 'data.shoppingList', {});
        const { isDone } = this.currentShopingList;

        this.isShoppinListDone = isDone;
      }
    },
    emitUpdateShoppingList(prevIsDone, nextIsDone) {
      if (prevIsDone !== nextIsDone) {
        this.$emit('updateShoppingList');
      }
    },
  },
};
</script>

<style lang="scss" module src="./ShoppingListItems.scss" />
