<template>
  <div>
    <PageTitle v-bind:title="title" />

    <div class="row">
      <div
        class="col-lg-5 cardBackground"
        style="float: left; margin: 1%; margin-left: 3%"
      >
        <h3>Jūsų valgiaraščiai</h3>
        <b-button @click="showCreateFoodMenuDialog = true" pill variant="danger"
          >Sukurti naują valgiaraštį</b-button
        >
        <md-dialog :md-active.sync="showCreateFoodMenuDialog">
          <md-dialog-content class="md-scrollbar"
            ><AddFoodMenuForm
              v-on:closeDialog="showCreateFoodMenuDialog = false"
          /></md-dialog-content>
        </md-dialog>
        <div v-if="foodMenus">
          <table class="table table-hover table-dark table-margins">
            <thead>
              <tr>
                <th scope="col">Pavadinimas</th>
                <th scope="col">Sukūrimo data</th>
                <th scope="col">Receptų skaičius</th>
                <th scope="col">Savaitės diena</th>
                <th scope="col">Veiksmai</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(foodMenu, index) in foodMenus" :key="index">
                <td>{{ foodMenu.pavadinimas }}</td>
                <td>{{ foodMenu.sukurimoData.substring(0, 10) }}</td>
                <td>{{ foodMenu.valgiarastisReceptas.length }}</td>
                <td>{{ foodMenu.savaitesDiena }}</td>
                <td>
                  <b-button-group>
                    <b-button
                      @click="displaySelectedFoodMenu(foodMenu.id)"
                      variant="outline-light"
                      >Pasirinkti</b-button
                    >
                    <b-button
                      v-if="!foodMenu.arAktyvus"
                      variant="outline-light"
                      @click="changefoodMenustatus(foodMenu.id, foodMenu)"
                      >Aktyvuoti</b-button
                    >
                    <b-button
                      v-else
                      variant="outline-light"
                      @click="changefoodMenustatus(foodMenu.id, foodMenu)"
                      >Deaktyvuoti</b-button
                    >
                    <b-button
                      @click="deleteFoodMenu(foodMenu.id)"
                      variant="outline-light"
                      >Ištrinti</b-button
                    >
                    <b-button
                      @click="
                        (showEditFoodMenuDialog = true),
                          (selectedFoodMenuForUpdate = foodMenu)
                      "
                      variant="outline-light"
                      >Redaguoti</b-button
                    >
                  </b-button-group>
                </td>
              </tr>
            </tbody>
            <md-dialog :md-active.sync="showEditFoodMenuDialog">
              <md-dialog-content class="md-scrollbar"
                ><EditFoodMenuForm
                  v-bind:foodMenu="selectedFoodMenuForUpdate"
                  v-on:closeDialog="showEditFoodMenuDialog = false"
              /></md-dialog-content>
            </md-dialog>
          </table>
        </div>
        <div v-else>

        </div>
        <br />
      </div>

      <div class="col-lg-5 cardBackground" style="float: left; margin: 1%">
        <h3>Jūsų receptai</h3>

        <div v-if="selectedMenu">
          <b-button
            @click="showCreateRecipeDialog = true"
            class="table-button"
            pill
            variant="danger"
            >Sukurti naują receptą</b-button
          >
          <md-dialog :md-active.sync="showCreateRecipeDialog">
            <md-dialog-content class="md-scrollbar"
              ><AddRecipeForm v-on:closeDialog="showCreateRecipeDialog = false"
            /></md-dialog-content>
          </md-dialog>
          <div class="table-margins">
            <UsersRecipeTable v-bind:selectedFoodMenu="selectedFoodMenu" />
          </div>
        </div>
        <div v-else>
          <h4 class="today-is-empty-text">Pasirinkite Valgiaraštį.</h4>
        </div>
      </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";
import axios from "axios";
import { mapGetters } from "vuex";
import Vue from "vue";
import AddFoodMenuForm from "../components/FoodMenuPage/AddFoodMenuForm";
import EditFoodMenuForm from "../components/FoodMenuPage/EditFoodMenuForm";
import AddRecipeForm from "../components/RecipePage/AddRecipeForm";
import UsersRecipeTable from "../components/RecipePage/UsersRecipeTable";
import { eventBus } from "../main.js";

export default {
  components: {
    PageTitle,
    AddFoodMenuForm,
    AddRecipeForm,
    EditFoodMenuForm,
    UsersRecipeTable,
  },
  data: () => ({
    showEditFoodMenuDialog: false,
    showEditRecipeDialog: false,
    showCreateRecipeDialog: false,
    showCreateFoodMenuDialog: false,
    title: "Mitybos planavimas",
    foodMenus: undefined,
    selectedFoodMenu: undefined,
    selectedFoodMenuForUpdate: undefined,
    selectedRecipeForUpdate: undefined,
  }),
  methods: {
    async displaySelectedFoodMenu(id) {
      axios.get("valgiarastis/" + id).then((response) => {
        this.selectedFoodMenu = response.data;
      });
    },
    async changefoodMenustatus(id, data) {
      Vue.delete(data, "valgiarastisReceptas");
      data.arAktyvus = !data.arAktyvus;
      await axios.put("valgiarastis/" + id, data).then(() => {
        Vue.swal(
          "",
          "Sėkmingai pakeistas sporto programos statusas",
          "success"
        );
        eventBus.$emit("updateFoodMenuTable");
      });
    },
    async deleteFoodMenu(id) {
      await axios.delete("valgiarastis/" + id).then(() => {
        Vue.swal("", "Valgiaraštis sėkmingai ištrintas", "success");
        eventBus.$emit("updateFoodMenuTable");
      });
    },
    async deleteRecipe(id) {
      await axios.delete("treniruote/" + id).then(() => {
        Vue.swal("", "Treniruotė sėkmingai ištrinta", "success");
        eventBus.$emit("updateRecipeTable", this.selectedFoodMenu.id);
      });
    },
  },
  created() {
    axios.get("Valgiarastis/user/" + this.userId).then((response) => {
      this.foodMenus = response.data;
    });
    eventBus.$on("updateFoodMenuTable", () => {
      axios.get("valgiarastis/user/" + this.userId).then((response) => {
        this.foodMenus = response.data;
      });
    });
    eventBus.$on("updateRecipeTable", (id) => {
      this.displaySelectedFoodMenu(id);
    });
  },
  computed: {
    ...mapGetters({
      userId: "auth/userId",
    }),
    selectedMenu() {
      return this.selectedFoodMenu;
    },
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
.check-box {
  width: 20px;
  height: 20px;
}
.table-margins {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
