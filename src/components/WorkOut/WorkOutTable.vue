<template>
  <div>
    <div v-if="exercises.length >= 1">
      <table class="table table-hover table-dark table-margins">
        <thead>
          <tr>
            <th scope="col">Pavadinimas</th>
            <th scope="col">Serijų skaičius</th>
            <th scope="col">Pakartojimų skaičius</th>
            <th scope="col">Aprašymas</th>
            <th scope="col">Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(exercise, index) in exercises" :key="index">
            <td>{{ exercise.pavadinimas }}</td>
            <td>{{ exercise.serijuSkaicius }}</td>
            <td>{{ exercise.pakartojimuSkaicius }}</td>
            <td style="width: 30%;">{{ exercise.aprasymas }}</td>
            <td>
              <b-button-group>
                <b-button
                  @click="deleteExercise(exercise.id)"
                  variant="outline-light"
                  >Ištrinti</b-button
                >
                <b-button
                  @click="
                    (showEditExerciseDialog = true),
                      (selectedExercise = exercise)
                  "
                  variant="outline-light"
                  >Redaguoti</b-button
                >
              </b-button-group>
            </td>
          </tr>
        </tbody>
        <md-dialog :md-active.sync="showEditExerciseDialog">
          <md-dialog-content class="md-scrollbar"
            ><EditExerciseForm
              v-bind:exercise="selectedExercise"
              v-on:closeDialog="showEditExerciseDialog = false"
          /></md-dialog-content>
        </md-dialog>
      </table>
    </div>
    <div v-else class="today-is-empty-text">
      Kolkas pratimų neturite
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import EditExerciseForm from "../../components/ExercisePage/EditExerciseForm";
import { eventBus } from "../../main.js";

export default {
  components: {
    EditExerciseForm,
  },
  data() {
    return {
      showEditExerciseDialog: false,
      selectedExercise: undefined,
    };
  },
  props: ["exercises"],
  methods: {
    async deleteExercise(id) {
      await axios.delete("pratimas/" + id).then(() => {
        Vue.swal("", "Pratimas sėkmingai ištrintas", "success");
        eventBus.$emit("updateExerciseTable");
      });
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
</style>
