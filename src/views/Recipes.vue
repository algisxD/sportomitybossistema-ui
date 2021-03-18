<template>
  <div style="margin-bottom: 50px;">
    <PageTitle v-bind:title="title" />
    <div class="row offset-md-1 col-lg-10">
      <b-button
        type="button"
        v-if="authenticated"
        class="btn btn-secondary button"
        @click="showDialog = true"
      >
        Pridėti receptą
      </b-button>
      <div class="filter-container shadow-border">
        <md-field class="filter-input-container ">
          <label>Filtravimas</label>
          <md-input v-model="filterText"></md-input>
        </md-field>
      </div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-content class="md-scrollbar"
          ><AddRecipeForm v-on:closeDialog="showDialog = false"
        /></md-dialog-content>
      </md-dialog>
    </div>
    <div class="row offset-md-1 col-lg-10">
      <div
        class="col-lg-4"
        v-for="(recipe, index) in limitedRecipes"
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
            <div class="md-subhead">
              Sukūrė: {{ recipe.receptoAutorius.vardas }}
            </div>
          </md-card-header>

          <md-card-expand>
            <md-card-actions>
              <div>
                <router-link
                  :to="{
                    path: '/recipes/' + recipe.id,
                  }"
                  ><md-button>Peržiūrėti</md-button></router-link
                >
              </div>
            </md-card-actions>
          </md-card-expand>
        </md-card>
      </div>
    </div>
    <div class="container">
      <div class="center">
        <button
          v-on:click="displayMoreRecipes"
          type="button"
          class="btn btn-primary showMoreButton center-element"
        >
          <i :class="'ion-ios-arrow-down'" /> Rodyti daugiau
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AddRecipeForm from "../components/RecipePage/AddRecipeForm";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: {
    PageTitle,
    AddRecipeForm,
  },
  data() {
    return {
      showDialog: false,
      recipesToDisplayNumber: 9,
      title: "Receptai",
      recipes: [],
      result: "",
      filterText: undefined,
    };
  },
  methods: {
    displayMoreRecipes() {
      this.recipesToDisplayNumber += 9;
    },
  },
  mounted() {
    axios.get("/receptas/public").then((response) => {
      this.recipes = response.data;
      console.log(response.data);
    });
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
    limitedRecipes() {
      return this.recipes.slice(0, this.recipesToDisplayNumber);
    },
    filterRecipes() {
      return this.recipes.filter((item) => {
        return (
          item.pavadinimas
            .toLowerCase()
            .indexOf(this.filterText.toLowerCase()) > -1
        );
      });
    },
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
  width: 640px;
  height: 360px;
}
.showMoreButton {
  width: 200px;
  height: 70px;
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
.container {
  height: 200px;
  position: relative;
}
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.md-dialog {
  z-index: 9;
}
.filter-container {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: #dcebeb;
  border-radius: 25px;
}
.filter-input-container {
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
