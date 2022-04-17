<template>
  <div class="form-area border-2 flex justify-center p-2 mt-2 mb-2">
    <form class="form w-full" @submit.prevent="onSubmit">
      <h2 class="text-xl font-bold mt-2 mb-2 text-center">New Contact</h2>
      <p class="mb-2">
        <label for="first_name">First Name:</label><br />
        <input id="first_name" class="input" type="text" v-model="first_name" />
      </p>

      <p class="mb-2">
        <label for="last_name">Last Name:</label><br />
        <input id="last_name" class="input" type="text" v-model="last_name" />
      </p>

      <p class="mb-2">
        <label for="phone_number">Phone Number:</label><br />
        <input
          id="phone_number"
          class="input"
          type="number"
          v-model="phone_number"
        />
      </p>

      <p class="mb-2">
        <button type="submit" class="btn w-full">Submit</button>
      </p>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FormComp",

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
    ...mapActions(["add"]),

    onSubmit() {
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
        id: 0,
      };

      const isPhoneExist = this.$store.state.datas.some(
        (item) => item.phone_number === this.phone_number
      );

      if (isPhoneExist) {
        return this.$swal(
          "Phone already exist please add another phone number!!"
        );
      }

      this.add(this.args);
      this.clearDatas();
      this.$swal("Added !!");
    },

    clearDatas() {
      this.first_name = null;
      this.last_name = null;
      this.phone_number = null;
      this.created_at = null;
    },
  },
};
</script>

<style scoped lang="scss"></style>
