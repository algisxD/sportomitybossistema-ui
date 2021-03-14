<template>
  <div>
    <form class="form" novalidate @submit.prevent="validateExercise">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Pridėkite pratimą</div>
        </md-card-header>
        <md-card-content style="margin-right: 0px">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label>Pratimo pavadinimas</label>
                <md-input
                  name="name"
                  id="name"
                  v-model="form.name"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.name.required"
                  >Pratimo pavadinimas yra privalomas</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('sets')">
                <label>Serijų skaičius</label>
                <md-input
                  type="number"
                  name="sets"
                  id="sets"
                  v-model="form.sets"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.sets.required"
                  >Serijų skaičius yra privalomas</span
                >
                <span class="md-error" v-else-if="!$v.form.sets.between"
                  >Serijų skaičius turi būti tarp 1-500</span
                >
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('repetitions')">
                <label>Pakartojimų skaičius</label>
                <md-input
                  type="number"
                  name="repetitions"
                  id="repetitions"
                  v-model="form.repetitions"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.repetitions.required"
                  >Pakartojimų skaičius yra privalomas</span
                >
                <span class="md-error" v-else-if="!$v.form.repetitions.between"
                  >Pakartojimų skaičius turi būti tarp 1-1000</span
                >
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter description">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('description')">
                <label>Aprašymas</label>
                <md-textarea
                  name="description"
                  id="description"
                  v-model="form.description"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.description.required"
                  >Aprašymas yra privalomas</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.description.maxLength"
                  >Aprašymas negali būti ilgesnis nei 500 simbolių</span
                >
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary md-raised"
            :disabled="sending"
            >Sukurti</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, between, maxLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import axios from "axios";
import Vue from "vue";
import { eventBus } from "../../main.js";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  props: ["workOutId"],
  data: () => ({
    showDialog: false,
    form: {
      name: undefined,
      sets: undefined,
      repetitions: undefined,
      description: undefined,
    },
    exercise: {
      pavadinimas: undefined,
      aprasymas: undefined,
      serijuSkaicius: undefined,
      pakartojimuSkaicius: undefined,
      treniruoteId: undefined,
    },
    sending: false,
  }),
  validations: {
    form: {
      name: {
        required,
      },
      sets: {
        required,
        between: between(1, 500),
      },
      repetitions: {
        required,
        between: between(1, 1000),
      },
      description: {
        required,
        maxLength: maxLength(500),
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
    },
    async createNewExercise() {
      this.sending = true;

      this.exercise.pavadinimas = this.form.name;
      this.exercise.aprasymas = this.form.description;
      this.exercise.serijuSkaicius = this.form.sets;
      this.exercise.pakartojimuSkaicius = this.form.repetitions;
      this.exercise.treniruoteId = this.workOutId;

      await axios
        .post("pratimas", this.exercise)
        .then(() => {
          Vue.swal("", "Pratimas sėkmingai sukurtas", "success");
          this.$emit("closeDialog");
          eventBus.$emit("updateExerciseTable");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Vue.swal("Klaida", "Netinkami pratimo duomenys", "error");
          } else {
            Vue.swal(
              "Klaida",
              "Serverio klaida, susisiekite su administracija",
              "error"
            );
          }
        });

      this.sending = false;
      this.clearForm();
    },
    validateExercise() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.createNewExercise();
      }
    },
  },
  computed: {
    ...mapGetters({
      userId: "auth/userId",
    }),
  },
};
</script>

<style scoped lang="scss">
.description {
  margin-top: 30px;
  margin-bottom: 20px;
}
.quantity-product {
  margin-bottom: 20px;
}
ul li {
  list-style-type: circle;
  display: list-item;
  list-style-position: inside;
}
</style>
