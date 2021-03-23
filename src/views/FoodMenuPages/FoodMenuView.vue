<template>
  <div>
    <PageTitle v-bind:title="title" />

    <div class="row row-container">
      <div class="col-lg-5" style="float: left; margin-left: 3%;">
        <div class="cardBackground">
          <div class="inside">
            <h3>Jūsų valgiaraščio receptai</h3>
            <br />
            <div v-if="foodMenu">
              <div class="table-margins">
                <UsersRecipeTable v-bind:selectedFoodMenu="foodMenu" />
              </div>
              <br />
            </div>
            <div v-else>
              <h4 class="today-is-empty-text">Pasirinkite Valgiaraštį.</h4>
            </div>
          </div>
        </div>
      </div>

      <transition
        mode="in"
        enter-active-class="animate__animated animate__fadeInDown"
      >
        <FoodMenuInformation />
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "../../components/PageTitle";
import { eventBus } from "../../main.js";
import UsersRecipeTable from "../../components/RecipePage/UsersRecipeTable";
import FoodMenuInformation from "../../components/FoodMenuPage/FoodMenuInformation";

export default {
  components: {
    PageTitle,
    UsersRecipeTable,
    FoodMenuInformation,
  },
  data: function() {
    return {
      title: undefined,
      id: this.$route.params.id,
      foodMenu: undefined,
      foodMenuNutrition: {
        pavadinimas: "",
        kcal: 0,
        vanduo: 0,
        baltymai: 0,
        angliavandeniai: 0,
        riebalai: 0,
        druska: 0,
      },
    };
  },
  methods: {
    displaySelectedFoodMenuNutrition(item) {
      eventBus.$emit("displaySelected", item);
    },
    calculateFoodMenuNutrition(foodMenus) {
      foodMenus.forEach((menu) => {
        this.calculateDishNutrition(menu.receptas.ingridientai);
      });
      this.foodMenuNutrition.kcal.toFixed(1);
      this.foodMenuNutrition.vanduo.toFixed(1);
      this.foodMenuNutrition.baltymai.toFixed(1);
      this.foodMenuNutrition.angliavandeniai.toFixed(1);
      this.foodMenuNutrition.riebalai.toFixed(1);
      this.foodMenuNutrition.druska.toFixed(1);
    },
    calculateDishNutrition(ingredients) {
      console.log(ingredients);
      this.foodMenuNutrition.pavadinimas = this.foodMenu.pavadinimas;
      ingredients.forEach((element) => {
        var kiek = element.kiekis / 100;
        this.foodMenuNutrition.kcal += element.produktas.kcal * kiek;
        this.foodMenuNutrition.vanduo += parseInt(
          element.produktas.vanduo * kiek
        );
        this.foodMenuNutrition.baltymai += parseInt(
          element.produktas.baltymai * kiek
        );
        this.foodMenuNutrition.angliavandeniai += parseInt(
          element.produktas.angliavandeniai * kiek
        );
        this.foodMenuNutrition.riebalai += parseInt(
          element.produktas.riebalai * kiek
        );
        this.foodMenuNutrition.druska += parseInt(
          element.produktas.druska * kiek
        );
      });
    },
  },
  mounted() {
    axios.get("valgiarastis/" + this.id).then((response) => {
      this.foodMenu = response.data;
      this.title = response.data.pavadinimas;
      this.calculateFoodMenuNutrition(response.data.valgiarastisReceptas);
      this.displaySelectedFoodMenuNutrition(this.foodMenuNutrition);
    });
  },
};
</script>

<style scoped>
.row-container {
  margin-bottom: 30px;
}
.inside {
  margin: 20px;
}
</style>
