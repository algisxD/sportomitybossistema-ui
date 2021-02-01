<template>
  <div>
    <PageTitle v-bind:title="title" />
    <div class="row offset-md-1 col-lg-10">
      <div
        class="col-lg-4 zoom "
        v-for="(recipe, index) in recipes"
        :key="index"
      >
        <md-card class="cards background">
          <md-card-media>
            <img
              id="img"
              :src="require('../assets/uploads/' + recipe.nuotrauka)"
              alt="Patiekalai"
            />
          </md-card-media>

          <md-card-header>
            <div class="md-title">{{ recipe.pavadinimas }}</div>
            <div class="md-subhead">Sukūrė: a</div>
          </md-card-header>

          <md-card-expand>
            <md-card-actions>
              <div>
                <md-button>Peržiūrėti</md-button>
              </div>
            </md-card-actions>
          </md-card-expand>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";
import Vue from "vue";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      title: "Receptai",
      recipes: undefined,
      result: "",
    };
  },
  methods: {
    handleImage(e) {
      const selectedImage = e.target;
      this.createBase64Image(selectedImage);
    },
  },
  mounted() {
    Vue.axios.get("https://localhost:44397/api/receptas").then((response) => {
      this.recipes = response.data;
      console.warn(response.data);
    });
  },
};
</script>

<style scoped>
.cards {
  margin-top: 20px;
}
.maxColumn {
  width: 80%;
  float: center;
}
#img {
  width: 500px;
  height: 300px;
}
.zoom {
  transition: transform 0.2s; /* Animation */
  margin: 0 auto;
}
.zoom:hover {
  -ms-transform: scale(1.05); /* IE 9 */
  -webkit-transform: scale(1.05); /* Safari 3-8 */
  transform: scale(1.05);
}
</style>
