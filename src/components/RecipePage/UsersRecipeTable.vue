<template>
  <div>
    <div v-if="selectedFoodMenu.valgiarastisReceptas.length > 0">
      <table class="table table-hover table-dark table-margins">
        <thead>
          <tr>
            <th scope="col">Pavadinimas</th>
            <th scope="col">Gaminimo laikas</th>
            <th scope="col">Porcijų skaičius</th>
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
                  @click="deleteRecipeFromFoodMenu(menu.id)"
                  variant="outline-light"
                  >Ištrinti iš valgiaraščio</b-button
                >
              </b-button-group>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="today-is-empty-text">Kolkas receptų neturite.</div>
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
    async deleteRecipeFromFoodMenu(id) {
      await axios.delete("ValgiarastisReceptas/" + id).then(() => {
        Vue.swal("", "Receptas sėkmingai ištrintas iš valgiaraščio", "success");
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

<style scoped>
.today-is-empty-text {
  font-family: "Ranchers", cursive;
  color: hsla(200, 0%, 0%, 0.7);
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
  font-size: 50px;
}
</style>
