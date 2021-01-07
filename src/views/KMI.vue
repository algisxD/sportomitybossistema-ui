<template>
  <div id="content">
    <PageTitle v-bind:title="title" />

    <div class="row">
      <div
        class="col-lg-5 border-2 border-opacity-100 border-black"
        style="float: left; margin: 1%; margin-left: 3%"
      >
        <h1 class="text-blue-500" style="font-size: 20px">KMI skaičiuoklė</h1>
        <form @submit="checkForm">
          <div class="row" v-if="!isCalculated" style="height: 400px">
            <div class="col">
              <fieldset>
                <legend>Įveskite savo duomenis:</legend>
                <div class="form-group">
                  <div>
                    <label>Lytis:</label>
                    <div class="input-group mb-3">
                      <select
                        class="border-2"
                        style="width: 400px; height: 38px"
                        required
                      >
                        <option>Vyras</option>
                        <option>Moteris</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label>Ūgis:</label>
                    <div
                      class="input-group mb-3"
                      style="width: 400px; height: 38px"
                    >
                      <input
                        type="number"
                        v-model="height"
                        class="form-control"
                        required
                      />
                      <div class="input-group-append">
                        <span class="input-group-text">cm</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label>Svoris:</label>
                    <div
                      class="input-group mb-3"
                      style="width: 400px; height: 38px"
                    >
                      <input
                        type="number"
                        v-model="weight"
                        class="form-control"
                        required
                      />
                      <div class="input-group-append">
                        <span class="input-group-text">kg</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      v-on:click="countBMI(height, weight)"
                      type="submit"
                      class="btn btn-primary"
                      :disabled="!isComplete"
                      style="margin-top: 50px"
                    >
                      Skaičiuoti
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col">
              <errorListKMI v-bind:errors="errors" />
            </div>
          </div>
          <div v-else class="kmi">
            <valueKMI v-bind:BMI="BMI" />
          </div>
        </form>

        <br />
      </div>

      <div
        class="col-lg-5 border-2 border-opacity-100 border-black"
        style="float: left; margin: 1%"
      >
        <div>
          <infoKMI />
        </div>
      </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import infoKMI from "../components/calculatorKMI/InfoKMI";
import errorListKMI from "../components/calculatorKMI/errorListKMI";
import valueKMI from "../components/calculatorKMI/valueKMI";
import PageTitle from "../components/PageTitle";

export default {
  components: {
    infoKMI,
    valueKMI,
    errorListKMI,
    PageTitle,
  },
  data() {
    return {
      errors: [],
      isCalculated: false,
      height: this.height,
      weight: this.weight,
      BMI: 0,
      title: "KMI skaičiuoklė",
    };
  },
  methods: {
    countBMI(height, weight) {
      this.deleteErrors();
      if (this.checkForm()) {
        height = height / 100;
        this.isCalculated = true;
        this.BMI = Number((weight / (height * height)).toFixed(1));
      }
    },
    updateIsCalculated() {
      this.isCalculated = false;
      if (this.errors.length > 0) this.errors.length = 0;
    },
    checkForm() {
      this.deleteErrors();
      if (
        this.height > 130 &&
        this.height < 240 &&
        this.weight > 40 &&
        this.weight < 250
      )
        return true;

      if (this.height > 240 || this.height < 130) {
        this.errors.push("Ūgis turi būti 130-240 cm intervale.");
      }

      if (this.weight > 250 || this.weight < 30) {
        this.errors.push("Svoris turi būti 30-250 kg intervale.");
      }

      return false;
    },
    deleteErrors() {
      this.errors.length = 0;
    },
  },
  computed: {
    isComplete() {
      return this.height && this.weight;
    },
  },
  created() {
    eventBus.$on("changeIsCalculated", (data) => {
      this.isCalculated = data;
      this.deleteErrors();
    });
  },
};
</script>

<style scoped>
.kmi {
  height: 400px;
}
.row {
  height: 75px;
}
h1:after {
  content: " ";
  display: block;
  border: 1px solid black;
}
form {
  height: 400px;
  width: 800px;
  outline-color: #333;
  margin-left: 0;
  padding: 0;
}
</style>
