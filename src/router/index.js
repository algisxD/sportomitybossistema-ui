import Vue from "vue";
import VueRouter from "vue-router";
import KMI from "../views/KMI.vue";
import Home from "../views/Home.vue";
import Recipes from "../views/Recipes.vue";
import Kcal from "../views/Kcal.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/kmi",
    name: "KMI",
    component: KMI,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: Recipes,
  },
  {
    path: "/kcal",
    name: "Kcal",
    component: Kcal,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
