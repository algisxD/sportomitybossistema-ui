<template>
  <div>
    <PageTitle v-bind:title="title" />

    <div class="row">
      <div
        class="col-lg-5 cardBackground"
        style="float: left; margin: 1%; margin-left: 3%"
      >
        <h3>Jūsų sporto programos</h3>
        <b-button pill variant="danger">Sukurti naują sporto programą</b-button>
        <div>
          <table class="table table-hover table-dark table-margins">
            <thead>
              <tr>
                <th scope="col">Pavadinimas</th>
                <th scope="col">Sukūrimo data</th>
                <th scope="col">Treniruočių skaičius</th>
                <th scope="col">Veiksmai</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sportProgram, index) in sportPrograms" :key="index">
                <td>{{ sportProgram.pavadinimas }}</td>
                <td>{{ sportProgram.sukurimoData.substring(0, 10) }}</td>
                <td>{{ sportProgram.treniruotes.length }}</td>
                <td>
                  <b-button-group>
                    <b-button
                      @click="displaySelectedSportProgram(sportProgram)"
                      variant="outline-light"
                      >Pasirinkti</b-button
                    >
                    <b-button
                      v-if="!sportProgram.arAktyvi"
                      variant="outline-light"
                      @click="
                        changeSportProgramStatus(sportProgram.id, sportProgram)
                      "
                      >Aktyvuoti</b-button
                    >
                    <b-button
                      v-else
                      variant="outline-light"
                      @click="
                        changeSportProgramStatus(sportProgram.id, sportProgram)
                      "
                      >Deaktyvuoti</b-button
                    >
                    <b-button variant="outline-light"
                      >Pridėti treniruotę</b-button
                    >
                  </b-button-group>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
      </div>

      <div class="col-lg-5 cardBackground" style="float: left; margin: 1%">
        <h3>Jūsų treniruotės</h3>

        <div v-if="selectedProgram">
          <b-button class="table-button" pill variant="danger"
            >Sukurti naują treniruotę</b-button
          >
          <table class="table table-hover table-dark table-margins">
            <thead>
              <tr>
                <th scope="col">Pavadinimas</th>
                <th scope="col">Savaitės diena</th>
                <th scope="col">Treniruotės tipas</th>
                <th scope="col">Pratimų skaičius</th>
                <th scope="col">Veiksmai</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(workout, index) in selectedProgram.treniruotes"
                :key="index"
              >
                <td>{{ workout.pavadinimas }}</td>
                <td>{{ workout.savaitesDiena }}</td>
                <td>{{ workout.treniruotesTipas }}</td>
                <td>{{ workout.daromiPratimai.length }}</td>
                <td>
                  <router-link
                    :to="{
                      path: '/workouts/' + workout.id,
                    }"
                    ><b-button variant="outline-light"
                      >Peržiūrėti</b-button
                    ></router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else><h4 class="text-red-700">Pasirinkite programa.</h4></div>
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

export default {
  components: {
    PageTitle,
  },
  data: () => ({
    title: "Sporto planavimas",
    sportPrograms: undefined,
    selectedSportProgram: undefined,
  }),
  methods: {
    displaySelectedSportProgram(item) {
      this.selectedSportProgram = item;
    },
    changeSportProgramStatus(id, data) {
      Vue.delete(data, "treniruotes");
      data.arAktyvi = !data.arAktyvi;
      axios.put("SportoPrograma/" + id, data).then(() => {
        Vue.swal(
          "Sekmė!",
          "Sėkmingai pakeistas sporto programos statusas",
          "success"
        );
        this.$router.go();
      });
    },
  },
  mounted() {
    axios.get("SportoPrograma/user/" + this.userId).then((response) => {
      this.sportPrograms = response.data;
      console.warn(response.data);
    });
  },
  computed: {
    ...mapGetters({
      userId: "auth/userId",
    }),
    selectedProgram() {
      return this.selectedSportProgram;
    },
  },
};
</script>

<style scoped>
.check-box {
  width: 20px;
  height: 20px;
}
.table-margins {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
