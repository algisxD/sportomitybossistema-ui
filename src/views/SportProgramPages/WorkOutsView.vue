<template>
  <div>
    <PageTitle v-bind:title="title" />

    <div class="row">
      <div
        class="col-lg-11 cardBackground"
        style="float: left; margin: 1%; margin-left: 3%"
      >
        <h3>Treniruotės pavadinimas: {{ workOut.pavadinimas }}</h3>
        <h4>Treniruotės tipas: {{ workOut.treniruotesTipas }}</h4>
        <b-button
          class="table-button"
          pill
          variant="danger"
          @click="showCreateDialog = true"
          >Pridėti pratimą</b-button
        >
        <md-dialog :md-active.sync="showCreateDialog">
          <md-dialog-content class="md-scrollbar"
            ><AddExerciseForm v-on:closeDialog="showCreateDialog = false"
          /></md-dialog-content>
        </md-dialog>
        <WorkOutTable v-bind:exercises="workOut.daromiPratimai" />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../components/PageTitle";
import WorkOutTable from "../../components/WorkOut/WorkOutTable";
import AddExerciseForm from "../../components/ExercisePage/AddExerciseForm";
import axios from "axios";

export default {
  components: {
    PageTitle,
    WorkOutTable,
    AddExerciseForm,
  },
  data: function() {
    return {
      showCreateDialog: false,
      workOut: undefined,
      title: "Treniruotė",
      id: this.$route.params.id,
    };
  },
  methods: {},
  created() {
    axios.get("treniruote/" + this.id).then((response) => {
      this.workOut = response.data;
    });
  },
};
</script>

<style scoped>
.table-button {
  height: 30px;
  width: 100px;
  margin-bottom: 30px;
}
</style>
