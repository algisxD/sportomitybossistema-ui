<template>
  <div>
    <PageTitle v-bind:title="title" />

    <div class="row">
      <div
        class="col-lg-5 cardBackground"
        style="float: left; margin: 1%; margin-left: 3%"
      >
        <h3>Jūsų sporto programos</h3>
        <b-button
          @click="showCreateSportProgramDialog = true"
          pill
          variant="danger"
          >Sukurti naują sporto programą</b-button
        >
        <md-dialog :md-active.sync="showCreateSportProgramDialog">
          <md-dialog-content class="md-scrollbar"
            ><AddSportProgramForm
              v-on:closeDialog="showCreateSportProgramDialog = false"
          /></md-dialog-content>
        </md-dialog>
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
                      @click="displaySelectedSportProgram(sportProgram.id)"
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
                    <b-button
                      @click="deleteSportProgram(sportProgram.id)"
                      variant="outline-light"
                      >Ištrinti</b-button
                    >
                    <b-button
                      @click="
                        (showEditSportProgramDialog = true),
                          (selectedSportProgramForUpdate = sportProgram)
                      "
                      variant="outline-light"
                      >Redaguoti</b-button
                    >
                  </b-button-group>
                </td>
              </tr>
            </tbody>
            <md-dialog :md-active.sync="showEditSportProgramDialog">
              <md-dialog-content class="md-scrollbar"
                ><EditSportProgramForm
                  v-bind:sportProgram="selectedSportProgramForUpdate"
                  v-on:closeDialog="showEditSportProgramDialog = false"
              /></md-dialog-content>
            </md-dialog>
          </table>
        </div>
        <br />
      </div>

      <div class="col-lg-5 cardBackground" style="float: left; margin: 1%">
        <h3>Jūsų treniruotės</h3>

        <div v-if="selectedProgram">
          <b-button
            @click="showCreateWorkOutDialog = true"
            class="table-button"
            pill
            variant="danger"
            >Sukurti naują treniruotę</b-button
          >
          <md-dialog :md-active.sync="showCreateWorkOutDialog">
            <md-dialog-content class="md-scrollbar"
              ><AddWorkOutForm
                v-bind:sportProgramId="selectedSportProgram.id"
                v-on:closeDialog="showCreateWorkOutDialog = false"
            /></md-dialog-content>
          </md-dialog>
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
                  <b-button-group>
                    <router-link
                      :to="{
                        path: '/workouts/' + workout.id,
                      }"
                      ><b-button variant="outline-light"
                        >Peržiūrėti</b-button
                      ></router-link
                    >
                    <b-button
                      @click="deleteWorkOut(workout.id)"
                      variant="outline-light"
                      >Ištrinti</b-button
                    >
                    <b-button
                      @click="
                        (showEditWorkOutDialog = true),
                          (selectedWorkOutForUpdate = workout)
                      "
                      variant="outline-light"
                      >Redaguoti</b-button
                    >
                  </b-button-group>
                </td>
              </tr>
            </tbody>
            <md-dialog :md-active.sync="showEditWorkOutDialog">
              <md-dialog-content class="md-scrollbar"
                ><EditWorkOutForm
                  v-bind:workOut="selectedWorkOutForUpdate"
                  v-on:closeDialog="showEditWorkOutDialog = false"
              /></md-dialog-content>
            </md-dialog>
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
import AddSportProgramForm from "../components/SportProgramPage/AddSportProgramForm";
import EditSportProgramForm from "../components/SportProgramPage/EditSportProgramForm";
import EditWorkOutForm from "../components/WorkOut/EditWorkOutForm";
import AddWorkOutForm from "../components/WorkOut/AddWorkOutForm";
import { eventBus } from "../main.js";

export default {
  components: {
    PageTitle,
    AddSportProgramForm,
    AddWorkOutForm,
    EditSportProgramForm,
    EditWorkOutForm,
  },
  data: () => ({
    showEditSportProgramDialog: false,
    showEditWorkOutDialog: false,
    showCreateWorkOutDialog: false,
    showCreateSportProgramDialog: false,
    title: "Sporto planavimas",
    sportPrograms: undefined,
    selectedSportProgram: undefined,
    selectedSportProgramForUpdate: undefined,
    selectedWorkOutForUpdate: undefined,
  }),
  methods: {
    async displaySelectedSportProgram(id) {
      axios.get("sportoprograma/" + id).then((response) => {
        this.selectedSportProgram = response.data;
      });
    },
    async changeSportProgramStatus(id, data) {
      Vue.delete(data, "treniruotes");
      data.arAktyvi = !data.arAktyvi;
      await axios.put("SportoPrograma/" + id, data).then(() => {
        Vue.swal(
          "",
          "Sėkmingai pakeistas sporto programos statusas",
          "success"
        );
        eventBus.$emit("updateSportProgramTable");
      });
    },
    async deleteSportProgram(id) {
      await axios.delete("sportoPrograma/" + id).then(() => {
        Vue.swal("", "Sporto programa sėkmingai ištrinta", "success");
        eventBus.$emit("updateSportProgramTable");
      });
    },
    async deleteWorkOut(id) {
      await axios.delete("treniruote/" + id).then(() => {
        Vue.swal("", "Treniruotė sėkmingai ištrinta", "success");
        eventBus.$emit("updateWorkOutTable", this.selectedSportProgram.id);
      });
    },
  },
  created() {
    axios.get("SportoPrograma/user/" + this.userId).then((response) => {
      this.sportPrograms = response.data;
    });
    eventBus.$on("updateSportProgramTable", () => {
      axios.get("SportoPrograma/user/" + this.userId).then((response) => {
        this.sportPrograms = response.data;
      });
    });
    eventBus.$on("updateWorkOutTable", (id) => {
      this.displaySelectedSportProgram(id);
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
