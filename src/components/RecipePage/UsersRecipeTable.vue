<template>
  <div>
    <div>
      <table class="table table-hover table-dark table-margins">
        <thead>
          <tr>
            <th scope="col">Pavadinimas</th>
            <th scope="col">Gaminimo laikas</th>
            <th scope="col">Porcijų skaičius</th>
            <th scope="col">Ingredientų skaičius</th>
            <th scope="col">Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(menu, index) in selectedFoodMenu.valgiarastisReceptas"
            :key="index"
          >
            <td>{{ menu.receptas.pavadinimas }}</td>
            <td>{{ menu.receptas.gaminimoLaikas }}</td>
            <td>{{ menu.receptas.porcijuSkaicius }}</td>
            <td>a</td>
            <td>
              <b-button-group>
                <router-link
                  :to="{
                    path: '/recipes/' + menu.receptas.id,
                  }"
                  ><b-button variant="outline-light"
                    >Peržiūrėti</b-button
                  ></router-link
                >
                <b-button
                  @click="deleteRecipe(menu.receptas.id)"
                  variant="outline-light"
                  >Ištrinti</b-button
                >
              </b-button-group>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="today-is-empty-text">Kolkas receptų neturite.</div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Vue from "vue";

import { eventBus } from "../../main.js";

export default {
  props: ["selectedFoodMenu"],
  data: () => ({}),
  methods: {
    async deleteRecipe(id) {
      await axios.delete("receptas/" + id).then(() => {
        Vue.swal("", "Treniruotė sėkmingai ištrinta", "success");
        eventBus.$emit("updateRecipeTable", this.selectedFoodMenu.id);
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
