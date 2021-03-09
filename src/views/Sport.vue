<template>
  <div>
    <PageTitle v-bind:title="title" />
    <div class="row side-margins">
      <div class="col-lg-4">
        <md-card md-with-hover>
          <md-card-media-cover md-text-scrim>
            <md-card-media md-ratio="16:9">
              <img
                src="../assets/uploads/df223912f193411483124e215652c932.jpg"
                alt="Patiekalai"
              />
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <div class="md-title">Kuno sudėjimų testas</div>
              </md-card-header>

              <md-card-actions>
                <md-button class="md-raised md-primary"
                  >Atlikti testą</md-button
                >
              </md-card-actions>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
      <div class="col-lg-4">
        <md-card md-with-hover>
          <md-card-media-cover md-text-scrim>
            <md-card-media md-ratio="16:9">
              <img
                src="../assets/uploads/9b4542f3cabb4f2e8489a787ae67351c.png"
                alt="Patiekalai"
              />
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <div class="md-title">Sporto planavimas</div>
              </md-card-header>

              <md-card-actions>
                <router-link
                  v-on:click="sendSelectedRecipeInfo(recipe)"
                  :to="{
                    path: '/sportplanning/',
                  }"
                  ><md-button class="md-raised md-primary"
                    >Planuoti</md-button
                  ></router-link
                >
              </md-card-actions>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
      <div class="col-lg-4">
        <md-card md-with-hover>
          <md-card-media-cover md-text-scrim>
            <md-card-media md-ratio="16:9">
              <img
                src="../assets/uploads/dc477ecf0f614b6e96d7d71d4f18b2aa.png"
                alt="Patiekalai"
              />
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <div class="md-title">Sporto specialisto konsultacija</div>
              </md-card-header>

              <md-card-actions>
                <md-button class="md-raised md-primary">Peržiūrėti</md-button>
              </md-card-actions>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
    </div>
    <div class="row side-margins">
      <div class="col-lg-6">
        <md-card md-with-hover>
          <md-card-media-cover md-text-scrim>
            <md-card-media md-ratio="16:9">
              <img
                src="../assets/uploads/fdda97a50f45470f8e146abca5dee2ae.jpg"
                alt="Patiekalai"
              />
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <div class="md-title">
                  Maisto papildų parinkimas sportuojantiems
                </div>
              </md-card-header>

              <md-card-actions>
                <md-button class="md-raised md-primary">Skaityti</md-button>
              </md-card-actions>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
      <div class="col-lg-6">
        <md-card md-with-hover>
          <md-card-media-cover md-text-scrim>
            <md-card-media md-ratio="16:9">
              <img
                src="../assets/uploads/8596471b3b5f4ef3be76dc88257113d3.jpg"
                alt="Patiekalai"
              />
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <div class="md-title">Pradedantiesiems</div>
              </md-card-header>

              <md-card-actions>
                <md-button class="md-raised md-primary">Skaityti</md-button>
              </md-card-actions>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      title: "Sportas",
    };
  },
};
</script>

<style scoped>
.side-margins {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 40px;
  margin-bottom: 20px;
}
</style>
