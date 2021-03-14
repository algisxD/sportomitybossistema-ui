<template>
  <div>
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
                @click="showEditExerciseDialog = true"
                variant="outline-light"
                >Redaguoti</b-button
              >
              <md-dialog :md-active.sync="showEditExerciseDialog">
                <md-dialog-content class="md-scrollbar"
                  ><EditExerciseForm
                    v-on:closeDialog="showEditExerciseDialog = false"
                /></md-dialog-content>
              </md-dialog>
            </b-button-group>
          </td>
        </tr>
      </tbody>
    </table>
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

<style scoped></style>
