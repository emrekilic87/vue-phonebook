<template>
  <div id="home" class="app w-80 m-auto">
    <a
      class="font-bold text-2xl text-sky-400"
      href="/fav"
      v-if="listName == 'CONTACT'"
      >My Favs</a
    >
    <Form />
    <Cards :datas="datas" :listName="listName" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { constant } from "../constants";
import Form from "../components/Form.vue";
import Cards from "../components/Cards/Cards.vue";

export default {
  name: "HomeComp",
  components: {
    Form,
    Cards,
  },

  data() {
    return {
      listName: constant.contactName,
    };
  },

  computed: {
    ...mapState(["datas"]),
  },
};
</script>
