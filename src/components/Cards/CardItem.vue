<template>
  <div class="border-solid border-2 mb-4 p-2">
    <div class="flex flex-row justify-between gap-4 mt-4 mb-2">
      <button
        v-if="listName == 'CONTACT'"
        type="button"
        class="fav cursor-pointer btn btn-purple w-full"
        @click="addFav(item.id)"
      >
        Add to Fav
      </button>
      <button
        v-if="listName == 'FAV'"
        type="button"
        class="fav cursor-pointer btn btn-red w-full"
        @click="deleteFav(item.id)"
      >
        Delete from Fav
      </button>
    </div>
    <div class="first-name">
      <span class="font-bold">First Name: </span><br />
      <input
        id="first_name"
        class="input"
        type="text"
        v-model="first_name"
        :placeholder="item.first_name"
        :disabled="listName == 'FAV'"
      />
    </div>
    <div class="last-name">
      <span class="font-bold">Last Name: </span>
      <input
        id="last_name"
        class="input"
        type="text"
        v-model="last_name"
        :placeholder="item.last_name"
        :disabled="listName == 'FAV'"
      />
    </div>
    <div class="phone-number">
      <span class="font-bold">Phone Number: </span>
      <input
        id="phone_number"
        class="input"
        type="number"
        v-model="phone_number"
        :placeholder="item.phone_number"
        :disabled="listName == 'FAV'"
      />
    </div>
    <div class="created-at mt-2">
      <span class="font-bold">Created At: </span>
      <span>{{ item.created_at }}</span>
    </div>

    <div
      v-if="listName == 'CONTACT'"
      class="flex flex-row justify-between gap-4 mt-4 mb-2"
    >
      <button
        type="submit"
        class="btn btn-green w-1/2"
        @click.prevent="onUpdate(item.id)"
      >
        Update
      </button>
      <button
        @click.prevent="deleteData(item.id)"
        type="button"
        class="btn btn-red w-1/2"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CardItemComp",

  props: {
    item: Object,
    listName: String,
  },

  data() {
    return {
      first_name: null,
      last_name: null,
      phone_number: null,
      created_at: null,
      args: {},
    };
  },

  methods: {
    ...mapActions(["update"]),

    deleteAll: function () {
      localStorage.clear();
      this.$store.commit("deleteAllData");
    },

    deleteData: function (id) {
      this.$store.dispatch("deleteData", id);
    },

    isFavDataExist: function (favId) {
      return this.$store.state.favDatas.some((item) => item.id === favId);
    },

    addFav: function (favId) {
      if (!this.isFavDataExist(favId)) {
        this.$swal("Added to Fav!!");
      } else {
        this.$swal("Already in Fav!!");
      }
      this.$store.dispatch("addFav", favId);
    },

    deleteFav: function (favId) {
      this.isFavDataExist(favId);
      if (this.isFavDataExist(favId)) this.$swal("Deleted from Fav!!");
      this.$store.dispatch("deleteFavData", favId);
    },

    onUpdate(id) {
      const newDate = new Date();
      this.created_at =
        newDate.getFullYear() +
        "-" +
        (newDate.getMonth() + 1) +
        "-" +
        newDate.getDate() +
        " " +
        newDate.getHours() +
        ":" +
        newDate.getMinutes() +
        ":" +
        newDate.getSeconds();
      this.args = {
        first_name: this.first_name,
        last_name: this.last_name,
        phone_number: this.phone_number,
        created_at: this.created_at,
        id: id,
      };
      this.update(this.args);
    },
  },
};
</script>
