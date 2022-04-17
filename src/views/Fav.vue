<template>
  <div id="fav" class="app w-80 m-auto">
    <Cards :datas="favDatas" :listName="favName" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { constant } from "../constants";
import Cards from "../components/Cards/Cards.vue";

export default {
  name: "FavComp",

  components: {
    Cards,
  },

  data() {
    return {
      favName: constant.favName,
    };
  },

  computed: {
    ...mapState(["favDatas"]),
  },
};
</script>
