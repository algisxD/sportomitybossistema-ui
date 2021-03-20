<template>
  <div>
    <form class="form" novalidate @submit.prevent="validateFoodMenu">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Pridėkite receptą prie savo valgiaraščio</div>
          <div style="margin-top: 20px;"></div>
        </md-card-header>
        <md-card-content style="margin-right: 0px">
          <div class="md-layout md-gutter quantity-product">
            <div class="md-layout-item md-small-size-100">
              <md-autocomplete
                :md-options="foodMenusNames"
                :md-open-on-focus="false"
                :md-dense="true"
                v-model="form.name"
                :class="getValidationClass('name')"
              >
                <label>Valgiaraštis</label>
                <template slot="md-autocomplete-empty" slot-scope="{ term }">
                  Tokio valgiaraščio "{{ term }}" nėra
                </template>
                <span class="md-error" v-if="!$v.form.name.required"
                  >Valgiaraščio pavadinimas yra privalomas</span
                >
              </md-autocomplete>
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
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import axios from "axios";
import Vue from "vue";

export default {
  name: "FormValidation",
  props: ["recipeId"],
  mixins: [validationMixin],
  data: () => ({
    showDialog: false,
    foodMenus: undefined,
    foodMenusNames: [],
    form: {
      name: undefined,
    },
    foodMenuRecipe: {
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
    },
  },
  methods: {
    getFoodMenuIdByName(name, foodMenus) {
      const foodMenu = foodMenus.find((item) => item.pavadinimas == name);
      return foodMenu?.id;
    },
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
    async createNewFoodMenu() {
      this.sending = true;

      this.foodMenuRecipe.receptasId = this.recipeId;
      this.foodMenuRecipe.valgiarastisId = this.getFoodMenuIdByName(
        this.form.name,
        this.foodMenus
      );

      await axios
        .post("ValgiarastisReceptas", this.foodMenuRecipe)
        .then(() => {
          Vue.swal(
            "",
            "Receptas sėkmingai pridėtas prie valgiaraščio",
            "success"
          );
          this.$emit("closeDialog");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Vue.swal("Klaida", "Netinkami valgiaraščio duomenys", "error");
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
    validateFoodMenu() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.createNewFoodMenu();
      }
    },
  },
  computed: {
    ...mapGetters({
      userId: "auth/userId",
    }),
  },
  mounted() {
    axios.get("valgiarastis/user/" + this.userId).then((response) => {
      this.foodMenus = response.data;
      response.data.forEach((item) => {
        this.foodMenusNames.push(item.pavadinimas);
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
