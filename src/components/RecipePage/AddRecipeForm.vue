<template>
  <div>
    <form
      enctype="multipart/form-data"
      class="form"
      novalidate
      @submit.prevent="validateUser"
    >
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-content style="margin-right: 0px">
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
                  >Gaminimo laikas turi būti tarp 1-1440 min</span
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
          <div
            v-for="(v, index) in $v.form.ingredient.$each.$iter"
            :key="index"
            class="md-layout md-gutter quantity-product"
          >
            <div class="md-layout-item md-small-size-100">
              <md-autocomplete
                :md-options="products"
                :md-open-on-focus="false"
                :md-dense="true"
                v-model="v.product.$model"
                :class="getValidationClassForColections(v.product)"
              >
                <label>Produktas</label>

                <template
                  slot="md-autocomplete-item"
                  slot-scope="{ item, term }"
                >
                  <md-highlight-text :md-term="term">{{
                    item.pavadinimas
                  }}</md-highlight-text>
                </template>
                <template slot="md-autocomplete-empty" slot-scope="{ term }">
                  Tokio produkto "{{ term }}" nėra
                </template>
                <span class="md-error" v-if="!v.product.required"
                  >Produkto pavadinimas yra privalomas</span
                >
              </md-autocomplete>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClassForColections(v.quantity)">
                <label>Kiekis</label>
                <md-input
                  type="number"
                  name="quantity"
                  id="quantity"
                  v-model="v.quantity.$model"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!v.quantity.required"
                  >Produkto kiekis yra privalomas</span
                >
                <span class="md-error" v-if="!v.quantity.between"
                  >Produkto kiekis turi būti tarp 1-5000 g</span
                >
              </md-field>
            </div>
          </div>
          <div id="wrapper">
            <button
              type="button"
              class="btn btn-primary"
              @click="addIngredient"
            >
              <i class="ion-md-add"></i>
            </button>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('image')">
                <label>Nuotrauka</label>
                <md-file
                  name="image"
                  id="image"
                  @change="onFileSelected"
                  v-model="form.image"
                  accept="image/*"
                />
                <span class="md-error" v-if="!$v.form.image.required"
                  >Nuotrauka yra privaloma</span
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
    showDialog: false,
    products: undefined,
    productsNames: null,
    form: {
      name: "",
      cookingTime: 0,
      portions: 0,
      description: "",
      image: null,
      ingredient: [{ product: null, quantity: 0 }],
    },
    recipeData: {
      name: "",
      cookingTime: 0,
      portions: 0,
      description: "",
      image: null,
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
      ingredient: {
        $each: {
          product: {
            required,
          },
          quantity: {
            required,
            between: between(1, 5000),
          },
        },
      },

      image: {
        required,
      },
    },
  },
  methods: {
    addIngredient() {
      this.form.ingredient.push({ product: "", quantity: 0 });
    },
    onFileSelected(event) {
      console.log(event)
      this.image = event.target.files[0];
    },
    increaseProductCount() {
      this.productsInputFieldCount += 1;
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    getValidationClassForColections(validationObject) {
      if (validationObject) {
        return {
          "md-invalid": validationObject.$invalid && validationObject.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
    },
    async createNewRecipe() {
      this.sending = true;

      console.log(this.form);

      this.recipeData.name = this.form.name;
      this.recipeData.cookingTime = this.form.cookingTime;
      this.recipeData.portions = this.form.portions;
      this.recipeData.description = this.form.description;
      this.recipeData.image = this.form.image;

      await axios.post("users/register", this.recipeData);

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
      this.productsNames = response.data.pavadinimas;
    });
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
</style>
