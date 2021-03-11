import Vue from "vue";
import VueRouter from "vue-router";
import KMI from "../views/KMI.vue";
import Home from "../views/Home.vue";
import Recipes from "../views/Recipes.vue";
import Kcal from "../views/Kcal.vue";
import Products from "../views/Products.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Sport from "../views/Sport.vue";
import RecipesView from "../views/RecipePages/RecipesView.vue";
import WorkOutsView from "../views/SportProgramPages/WorkOutsView.vue";
import SportPlanning from "../views/SportPlanning.vue";
import Calendar from "../views/Calendar.vue";

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
    path: "/recipes/:id",
    name: "RecipesView",
    component: RecipesView,
  },
  {
    path: "/sport",
    name: "Sport",
    component: Sport,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/kcal",
    name: "Kcal",
    component: Kcal,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/sportplanning",
    name: "SportPlanning",
    component: SportPlanning,
  },
  {
    path: "/workouts/:id",
    name: "WorkOutsView",
    component: WorkOutsView,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
