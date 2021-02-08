<template>
  <div>
    <form class="form" novalidate @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label>Patiekalo pavadinimas</label>
                <md-input
                  name="name"
                  id="name"
                  v-model="form.name"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.name.required"
                  >Patiekalo pavadinimas yra privalomas</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cookingTime')">
                <label>Gaminimo laikas (min)</label>
                <md-input
                  type="number"
                  name="cookingTime"
                  id="cookingTime"
                  v-model="form.cookingTime"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.cookingTime.required"
                  >Gaminimo laikas yra privalomas</span
                >
                <span class="md-error" v-else-if="!$v.form.cookingTime.between"
                  >Gaminimo turi būti tarp 1-1440 min</span
                >
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('portions')">
                <label>Porcijų skaičius</label>
                <md-input
                  type="number"
                  name="portions"
                  id="portions"
                  v-model="form.portions"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.portions.required"
                  >Pocijų skaičius yra privalomas</span
                >
                <span class="md-error" v-else-if="!$v.form.portions.between"
                  >Porcijų skaičius turi būti tarp 1-100</span
                >
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
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
                <span class="md-error" v-else-if="!$v.form.portions.maxLength"
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
            >Skelbti</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, between, maxLength } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: "",
      cookingTime: 0,
      portions: 0,
      description: "",
    },
    sending: false,
  }),
  validations: {
    form: {
      name: {
        required,
      },
      cookingTime: {
        required,
        between: between(1, 1440),
      },
      portions: {
        required,
        between: between(1, 100),
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
    async createNewRecipe() {
      this.sending = true;
      this.registerData.email = this.form.email;
      this.registerData.password = this.form.password;
      this.registerData.user.vardas = this.form.name;
      this.registerData.user.pavarde = this.form.surname;
      this.registerData.user.svoris = this.form.weight;
      this.registerData.user.ugis = this.form.height;

      this.sending = false;
      this.clearForm();
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.createNewRecipe();
      }
    },
  },
  mounted() {
    axios.get("https://localhost:44397/api/Produktas").then((response) => {
      this.products = response.data;
      console.warn(response.data);
    });
  },
};
</script>

<style scoped></style>
