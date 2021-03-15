<template>
  <div id="content">
    <PageTitle v-bind:title="title" />

    <div class="row row-container">
      <div
        class="col-lg-5 cardBackground zoom"
        style="float: left; margin: 1%; margin-left: 3%; margin-left: 3%"
      >
        <h3>Šiandienos sportas</h3>
        <div v-if="workOuts.length > 0">
          <div
            class="workOut-container"
            v-for="(workOut, index) in workOuts"
            :key="index"
          >
            <h4>Treniruotės pavadinimas: {{ workOut.pavadinimas }}</h4>
            <WorkOutTable v-bind:exercises="workOut.daromiPratimai" />
          </div>
        </div>
        <div v-else class="today-is-empty-text">Šiandiena laisva</div>
      </div>

      <div class="col-lg-5 cardBackground zoom" style="float: left; margin: 1%">
        <h3>Šiandienos valgiaraštis</h3>
        <div v-if="workOuts.length > 0"></div>
        <div v-else class="today-is-empty-text">
          Šiandienos valgiaraštis tuščias
        </div>
      </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";
import { mapGetters } from "vuex";
import axios from "axios";
import WorkOutTable from "../components/WorkOut/WorkOutTable";

export default {
  components: {
    PageTitle,
    WorkOutTable,
  },
  data() {
    return {
      workOuts: undefined,
      dayOfTheWeek: undefined,
      isCalculated: false,
      title: "Mano diena",
    };
  },
  methods: {
    updateIsCalculated() {
      this.isCalculated = false;
      if (this.errors.length > 0) this.errors.length = 0;
    },
  },
  created() {
    let today = new Date();
    this.dayOfTheWeek = today.getDay();
    console.log(this.dayOfTheWeek);
  },
  mounted() {
    axios
      .get("treniruote/user/" + this.userId + "/" + this.dayOfTheWeek)
      .then((response) => {
        this.workOuts = response.data;
        console.log(this.workOuts);
      });
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
h3 {
  margin-top: 1%;
  margin-bottom: 30px;
}
h1:after {
  content: " ";
  display: block;
  border: 1px solid black;
}
.workOut-container {
  margin-bottom: 50px;
}
.row-container {
  margin-bottom: 30px;
}
</style>
