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
      <b-button
        v-if="recipe.receptoAutorius.id == userId"
        variant="light"
        style="margin-right: 5px;"
        @click="deleteRecipe(recipe.id)"
        >Ištrinti</b-button
      >
      <b-button variant="light">Pridėti prie savo valgiaraščio</b-button>
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

export default {
  props: ["recipe"],
  methods: {
    async deleteRecipe(id) {
      await axios.delete("receptas/" + id).then(() => {
        Vue.swal("", "Receptas sėkmingai ištrintas", "success");
        this.$router.go(-1);
      });
    },
  },
  computed: {
    ...mapGetters({
      userId: "auth/userId",
    }),
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
</style>
