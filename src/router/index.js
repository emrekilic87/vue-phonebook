import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Fav from "@/views/Fav.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/fav",
    name: "Fav",
    component: Fav,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
