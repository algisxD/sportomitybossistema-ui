import Vue from "vue";
import VueRouter from "vue-router";
import KMI from "../views/KMI.vue";
import Home from "../views/Home.vue";
import Recipes from "../views/Recipes.vue";
import Products from "../views/Products.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import RecipesView from "../views/RecipePages/RecipesView.vue";
import WorkOutsView from "../views/SportProgramPages/WorkOutsView.vue";
import SportPlanning from "../views/SportPlanning.vue";
import MyDay from "../views/MyDay.vue";
import FoodPlanning from "../views/FoodPlanning.vue";
import MyRecipes from "../views/MyRecipes.vue";
import FoodMenuView from "../views/FoodMenuPages/FoodMenuView";

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
    path: "/myrecipes",
    name: "MyRecipes",
    component: MyRecipes,
  },
  {
    path: "/recipes/:id",
    name: "RecipesView",
    component: RecipesView,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/diet",
    name: "FoodPlanning",
    component: FoodPlanning,
  },
  {
    path: "/foodmenus/:id",
    name: "FoodMenuView",
    component: FoodMenuView,
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
    path: "/myday",
    name: "MyDay",
    component: MyDay,
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
