<template>
  <div>
    <form class="form" novalidate @submit.prevent="validateSportProgram">
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
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary md-raised"
            :disabled="sending"
            >Redaguoti</md-button
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
import { eventBus } from "../../main.js";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  props: ["sportProgram"],
  data: () => ({
    showDialog: false,
    form: {
      name: undefined,
    },
    sportProgramForUpdate: {
      id: undefined,
      pavadinimas: undefined,
      sukurimoData: undefined,
      arAktyvi: undefined,
      vartotojasId: undefined,
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
  created() {
    this.form.name = this.sportProgram.pavadinimas;
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
    async createNewSportProgram() {
      this.sending = true;

      this.sportProgramForUpdate.id = this.sportProgram.id;
      this.sportProgramForUpdate.pavadinimas = this.form.name;
      this.sportProgramForUpdate.sukurimoData = this.sportProgram.sukurimoData;
      this.sportProgramForUpdate.arAktyvi = this.sportProgram.arAktyvi;
      this.sportProgramForUpdate.vartotojasId = this.sportProgram.vartotojasId;

      console.log(this.sportProgramForUpdate);

      await axios
        .put(
          "sportoPrograma/" + this.sportProgramForUpdate.id,
          this.sportProgramForUpdate
        )
        .then(() => {
          Vue.swal("", "Pratimas sėkmingai atnaujintas", "success");
          this.$emit("closeDialog");
          eventBus.$emit("updateSportProgramTable");
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
    validateSportProgram() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.createNewSportProgram();
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
