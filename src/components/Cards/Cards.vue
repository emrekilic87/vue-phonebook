<template>
  <div class="card-area flex flex-col justify-center">
    <a class="font-bold text-2xl text-sky-400" href="/" v-if="listName == 'FAV'"
      >Back</a
    >
    <h2 class="font-bold text-center text-xl mt-4 mb-4">{{ listName }} LIST</h2>

    <div v-if="datas.length > 0 && listName == 'CONTACT'">
      <label for="search" class="font-bold">Search:</label>
      <input
        id="search"
        class="input mt-2 mb-4"
        type="text"
        v-model="searchQuery"
        placeholder="Search by name"
      />
    </div>

    <button
      v-if="datas.length > 0 && listName == 'CONTACT'"
      type="button"
      class="btn btn-red w-full mt-2 mb-4"
      @click="deleteAll"
    >
      Delete All
    </button>

    <CardItem
      v-for="item in filteredDatas"
      :key="item.id"
      :searchQuery="searchQuery"
      :item="item"
      :listName="listName"
    />

    <div v-if="filteredDatas.length == 0" class="text-center">Empty</div>
  </div>
</template>

<script>
import CardItem from "./CardItem.vue";

export default {
  name: "CardsComp",

  components: {
    CardItem,
  },

  props: {
    datas: Array,
    listName: String,
  },

  data() {
    return {
      searchQuery: "",
    };
  },

  computed: {
    filteredDatas() {
      if (this.searchQuery) {
        return this.datas.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.first_name.toLowerCase().includes(v));
        });
      } else {
        return this.datas;
      }
    },
  },

  methods: {
    deleteAll: function () {
      localStorage.clear();
      this.$store.commit("deleteAllData");
    },
  },
};
</script>

<style scoped lang="scss"></style>
