<template>
  <div>
    <form
      enctype="multipart/form-data"
      class="form"
      novalidate
      @submit.prevent="validateRecipe"
    >
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Pridėkite savo receptą</div>
          <div style="margin-top: 20px;">
            <ul>
              <li>Nuotraukos rekomenduojama rezoliucija: 1920x1080</li>
              <li>Produktai turi būti pasirenkami iš duoto sąrašo</li>
            </ul>
          </div>
        </md-card-header>
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
                :md-options="productsNames"
                :md-open-on-focus="false"
                :md-dense="true"
                v-model="v.product.$model"
                :class="getValidationClassForColections(v.product)"
              >
                <label>Produktas</label>
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
                  accept="image/*"
                />
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
import { mapGetters } from "vuex";
import axios from "axios";
import Vue from "vue";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  props: ["foodMenuId"],
  data: () => ({
    showDialog: false,
    products: undefined,
    productsNames: [],
    form: {
      name: "",
      cookingTime: 0,
      portions: 0,
      description: "",
      image: null,
      ingredient: [{ product: null, quantity: 0 }],
    },
    recipeData: {
      pavadinimas: "",
      gaminimoLaikas: 0,
      porcijuSkaicius: 0,
      aprasymas: "",
      nuotrauka: null,
      vartotojasId: null,
      ingridientai: [],
    },
    foodMenuData: {
      receptasId: undefined,
      valgiarastisId: undefined,
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
    getProductIdByName(name, products) {
      const product = products.find((item) => item.pavadinimas == name);
      return product?.id;
    },
    addIngredient() {
      this.form.ingredient.push({ product: "", quantity: 0 });
    },
    onFileSelected(event) {
      this.form.image = event.target.files[0];
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
      const fd = new FormData();
      fd.append("image", this.form.image, this.form.image.name);

      await axios.post("Receptas/upload", fd).then((res) => {
        this.recipeData.nuotrauka = res.data;
      });

      this.recipeData.pavadinimas = this.form.name;
      this.recipeData.gaminimoLaikas = this.form.cookingTime;
      this.recipeData.porcijuSkaicius = this.form.portions;
      this.recipeData.aprasymas = this.form.description;
      this.recipeData.vartotojasId = this.userId;

      this.foodMenuData.valgiarastisId = this.foodMenuId;

      this.form.ingredient.forEach((item) => {
        var id = this.getProductIdByName(item.product, this.products);
        this.recipeData.ingridientai.push({
          kiekis: item.quantity,
          produktasId: id,
        });
      });

      await axios
        .post("receptas", this.recipeData)
        .then((response) => {
          this.foodMenuData.receptasId = response.data.recipe.id;
        })
        .catch(() => {
          Vue.swal(
            "Klaida",
            "Serverio klaida, susisiekite su administracija",
            "error"
          );
        });

      await axios.post("valgiarastisreceptas", this.foodMenuData).then(() => {
        Vue.swal(
          "",
          "Receptas sėkmingai sukurtas ir pridėtas prie valgiaraščio",
          "success"
        );
        this.$emit("closeDialog");
      });

      this.sending = false;
      this.clearForm();
    },
    validateRecipe() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.createNewRecipe();
      }
    },
  },
  computed: {
    ...mapGetters({
      userId: "auth/userId",
    }),
  },
  mounted() {
    axios.get("https://localhost:44397/api/Produktas").then((response) => {
      this.products = response.data;
      response.data.forEach((item) => {
        this.productsNames.push(item.pavadinimas);
      });
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
ul li {
  list-style-type: circle;
  display: list-item;
  list-style-position: inside;
}
</style>
