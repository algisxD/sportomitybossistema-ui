<template>
  <div>
    <PageTitle v-bind:title="title" />

    <div class="row row-container">
      <div
        class="col-lg-4"
        style="float: left; margin: 1%; margin-left: 3%; margin-right: 0; padding: 0px;"
      >
        <RecipeInstruction class="cardBackground" v-bind:recipe="recipe" />
      </div>

      <transition
        mode="in"
        enter-active-class="animate__animated animate__fadeInDown"
      >
        <productInformation
      /></transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "../../components/PageTitle";
import RecipeInstruction from "../../components/RecipePage/RecipeInstruction";
import productInformation from "../../components/ProductPage/productInformation";
import { eventBus } from "../../main.js";

export default {
  components: {
    PageTitle,
    productInformation,
    RecipeInstruction,
  },
  data: function() {
    return {
      title: undefined,
      id: this.$route.params.id,
      recipe: {},
      dishNutrition: {
        pavadinimas: "",
        kcal: 0,
        vanduo: 0,
        baltymai: 0,
        angliavandeniai: 0,
        riebalai: 0,
        druska: 0,
        rusis: "product",
      },
    };
  },
  methods: {
    displaySelectedDishNutrition(item) {
      eventBus.$emit("displaySelected", item);
    },
    fixCalculateDishNutrition(ingredients) {
      ingredients.forEach((menu) => {
        this.calculateDishNutrition(menu.receptas.ingridientai);
      });
      this.dishNutrition.kcal.toFixed(1);
      this.dishNutrition.vanduo.toFixed(1);
      this.dishNutrition.baltymai.toFixed(1);
      this.dishNutrition.angliavandeniai.toFixed(1);
      this.dishNutrition.riebalai.toFixed(1);
      this.dishNutrition.druska.toFixed(1);
    },
    calculateDishNutrition(ingredients) {
      this.dishNutrition.pavadinimas = this.recipe.pavadinimas;
      ingredients.forEach((element) => {
        var kiek = element.kiekis / 100;
        this.dishNutrition.kcal += element.produktas.kcal * kiek;
        this.dishNutrition.vanduo += parseInt(
          element.produktas.vanduo * kiek
        );
        this.dishNutrition.baltymai += parseInt(
          element.produktas.baltymai * kiek
        );
        this.dishNutrition.angliavandeniai += parseInt(
          element.produktas.angliavandeniai * kiek
        );
        this.dishNutrition.riebalai += parseInt(
          element.produktas.riebalai * kiek
        );
        this.dishNutrition.druska += parseInt(
          element.produktas.druska * kiek
        );
      });
    },
  },
  mounted() {
    axios.get("receptas/" + this.id).then((response) => {
      this.recipe = response.data;
      this.title = response.data.pavadinimas;
      this.calculateDishNutrition(response.data.ingridientai);
      this.displaySelectedDishNutrition(this.dishNutrition);
    });
  },
};
</script>

<style scoped>
.row-container {
  margin-bottom: 30px;
}
</style>
