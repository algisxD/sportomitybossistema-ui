<template>
  <div style="margin-bottom: 50px;">
    <PageTitle v-bind:title="title" />
    <div class="row offset-md-1 col-lg-10">
      <b-button
        type="button"
        v-if="authenticated"
        class="btn btn-secondary button"
        v-b-modal.modal-tall
      >
        Pridėti receptą
      </b-button>
    </div>
    <AddRecipe v-bind:showModal="showModal" />
    <div class="row offset-md-1 col-lg-10">
      <div
        class="col-lg-4 zoom "
        v-for="(recipe, index) in recipes"
        :key="index"
      >
        <md-card md-with-hover class="cards shadow-border">
          <md-card-media>
            <img
              id="img"
              :src="require('../assets/uploads/' + recipe.nuotrauka)"
              alt="Patiekalai"
            />
          </md-card-media>

          <md-card-header>
            <div class="md-title">{{ recipe.pavadinimas }}</div>
            <div class="md-subhead">Sukūrė: {{ recipe.vartotojas.vardas }}</div>
          </md-card-header>

          <md-card-expand>
            <md-card-actions>
              <div>
                <router-link
                  v-on:click="sendSelectedRecipeInfo(recipe)"
                  :to="{
                    path: '/recipes/' + recipe.id,
                    params: { recipeInfo: recipe },
                  }"
                  ><md-button>Peržiūrėti</md-button></router-link
                >
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
import axios from "axios";
import AddRecipe from "./RecipePages/AddRecipe";
import { mapGetters } from "vuex";
import { eventBus } from "../main.js";

export default {
  components: {
    PageTitle,
    AddRecipe,
  },
  data() {
    return {
      title: "Receptai",
      recipes: undefined,
      result: "",
      showModal: false,
    };
  },
  methods: {},
  created() {
    eventBus.$on("changeshowModal", (data) => {
      this.showModal = data;
    });
  },
  mounted() {
    axios.get("/receptas").then((response) => {
      this.recipes = response.data;
      console.log(response.data);
    });
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
};
</script>

<style lang="scss" scoped>
.md-card-header {
  background-color: #508991;
}
.md-card.md-theme-default .md-card-expand .md-card-actions {
  background-color: #508991;
}
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
.button {
  width: 100%;
  height: 100px;
  margin-top: 20px;
  appearance: none;
  outline: none;
  border: none;

  display: inline-block;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;

  &:hover {
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
  }
}
.button-space {
  height: 500px;
  width: 100%;
  z-index: -1;
}
.shadow-border {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
}
</style>
