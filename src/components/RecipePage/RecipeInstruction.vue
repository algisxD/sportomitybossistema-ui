<template>
  <div>
    <div class="inside">
      <h3>
        {{ recipe.pavadinimas }}
      </h3>
      <h5>Porcijų skaičius: {{ recipe.porcijuSkaicius }}</h5>
      <h5>
        Gaminimo laikas: {{ recipe.gaminimoLaikas }} min.
        <i :class="'ion-md-clock'" />
      </h5>
      <div class="actions-container">
        <div class="actions-inner-container">
          <b-button
            class="button-container"
            v-if="recipe.receptoAutorius.id == userId"
            variant="light"
            @click="deleteRecipe(recipe.id)"
            >Ištrinti</b-button
          >
          <b-button
            class="button-container"
            variant="light"
            @click="showAddRecipeToMenuDialog = true"
            >Pridėti prie savo valgiaraščio</b-button
          >
          <b-button
            @click="makePrivatePublic"
            v-if="recipe.receptoAutorius.id == userId && !recipe.arViesas"
            variant="light"
            >Paversti receptą viešu</b-button
          >
          <b-button
            @click="makePrivatePublic"
            v-if="recipe.receptoAutorius.id == userId && recipe.arViesas"
            variant="light"
            >Paversti receptą privačiu</b-button
          >
        </div>
      </div>
      <md-dialog :md-active.sync="showAddRecipeToMenuDialog">
        <md-dialog-content class="md-scrollbar"
          ><AddRecipeToFoodMenuForm
            v-bind:recipeId="recipe.id"
            v-on:closeDialog="showAddRecipeToMenuDialog = false"
        /></md-dialog-content>
      </md-dialog>
      <div class="image">
        <img
          :src="require('../../assets/uploads/' + recipe.nuotrauka)"
          alt="Patiekalai"
        />
      </div>
      <div></div>
      <div>
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Ingredientas</th>
              <th scope="col">Kiekis</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ingredient, index) in recipe.ingridientai" :key="index">
              <td>{{ ingredient.produktas.pavadinimas }}</td>
              <td>{{ ingredient.kiekis }} g</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="kazkas">
        <h5>Paruošimas:</h5>
        <p>{{ recipe.aprasymas }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Vue from "vue";
import AddRecipeToFoodMenuForm from "./AddRecipeToFoodMenuForm";
import { eventBus } from "../../main.js";

export default {
  components: {
    AddRecipeToFoodMenuForm,
  },
  data: () => ({
    isPublic: undefined,
    showAddRecipeToMenuDialog: false,
    recipeForUpdate: {
      id: undefined,
      pavadinimas: undefined,
      nuotrauka: undefined,
      aprasymas: undefined,
      gaminimoLaikas: undefined,
      porcijuSkaicius: undefined,
      arViesas: undefined,
      vartotojasId: undefined,
    },
  }),
  props: ["recipe"],
  methods: {
    async deleteRecipe(id) {
      await axios.delete("receptas/" + id).then(() => {
        Vue.swal("", "Receptas sėkmingai ištrintas", "success");
        this.$router.go(-1);
      });
    },
    async makePrivatePublic() {
      this.recipeForUpdate.id = this.recipe.id;
      this.recipeForUpdate.pavadinimas = this.recipe.pavadinimas;
      this.recipeForUpdate.nuotrauka = this.recipe.nuotrauka;
      this.recipeForUpdate.aprasymas = this.recipe.aprasymas;
      this.recipeForUpdate.gaminimoLaikas = this.recipe.gaminimoLaikas;
      this.recipeForUpdate.porcijuSkaicius = this.recipe.porcijuSkaicius;
      this.recipeForUpdate.arViesas = !this.recipe.arViesas;
      this.recipeForUpdate.vartotojasId = this.recipe.receptoAutorius.id;

      await axios
        .put("receptas/" + this.recipeForUpdate.id, this.recipeForUpdate)
        .then(() => {
          Vue.swal("", "Recepto būsena sėkmingai pakeista", "success");
          eventBus.$emit("updateRecipeInstruction", this.recipe.id);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Vue.swal("Klaida", "Netinkami pratimo duomenys", "error");
          } else {
            Vue.swal(
              "Klaida",
              "Serverio klaida, susisiekite su administracija",
              "error"
            );
          }
        });
    },
  },
  computed: {
    ...mapGetters({
      userId: "auth/userId",
    }),
  },
  created() {
    eventBus.$on("updateRecipeInstruction", (id) => {
      axios.get("receptas/" + id).then((response) => {
        this.recipe = response.data;
      });
    });
    this.isPublic = this.recipe.arViesas;
  },
};
</script>

<style scoped>
p {
  font-size: 18px;
  white-space: pre-line;
}
.inside {
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
}
.row {
  margin-left: 1%;
}
.image {
  margin-bottom: 25px;
  margin-top: 25px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  padding-bottom: 2%;
  padding-top: 2%;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 70%;
  width: 70%;
}
.md-dialog {
  z-index: 9;
}
.button-container {
  margin-right: 5px;
  margin-left: 2px;
}
</style>
