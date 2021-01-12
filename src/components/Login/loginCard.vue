<template>
  <div class="center">
    <form
      novalidate
      class="md-layout cardBackground"
      @submit.prevent="validateUser"
    >
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Registracija</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('email')">
            <label for="email">El. paštas</label>
            <md-input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required"
              >El. paštas yra privalomas</span
            >
            <span class="md-error" v-else-if="!$v.form.email.email"
              >Netinkamas el. paštas</span
            >
          </md-field>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('gender')">
                <label for="gender">Lytis</label>
                <md-select
                  name="gender"
                  id="gender"
                  v-model="form.gender"
                  md-dense
                  :disabled="sending"
                >
                  <md-option></md-option>
                  <md-option value="M">Vyras</md-option>
                  <md-option value="F">Moteris</md-option>
                </md-select>
                <span class="md-error">Lytis yra privaloma</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('age')">
                <label for="age">Amžius</label>
                <md-input
                  type="number"
                  id="age"
                  name="age"
                  autocomplete="age"
                  v-model="form.age"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.age.required"
                  >Amžius yra privalomas</span
                >
                <span class="md-error" v-else-if="!$v.form.age.maxlength"
                  >Netinkamas amžius</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('height')">
                <label for="height">Ūgis</label>
                <md-input
                  type="number"
                  id="height"
                  name="height"
                  autocomplete="height"
                  v-model="form.height"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.height.required"
                  >Ūgis yra privalomas</span
                >
                <span class="md-error" v-else-if="!$v.form.height.maxlength"
                  >Netinkamas ūgis</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('weight')">
                <label for="age">Svoris</label>
                <md-input
                  type="number"
                  id="weight"
                  name="weight"
                  autocomplete="weight"
                  v-model="form.weight"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.weight.required"
                  >Svoris yra privalomas</span
                >
                <span class="md-error" v-else-if="!$v.form.weight.maxlength"
                  >Netinkamas svoris</span
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
            >Registruotis</md-button
          >
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved"
        >Vartotojas {{ lastUser }} užregistruotas sėkmingai!</md-snackbar
      >
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, between, maxLength } from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      gender: null,
      age: null,
      email: null,
      height: null,
      weight: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
  }),
  validations: {
    form: {
      age: {
        required,
        maxLength: maxLength(3),
        between: between(0, 130),
      },
      gender: {
        required,
      },
      email: {
        required,
        email,
      },
      height: {
        required,
        maxLength: maxLength(3),
        between: between(0, 250),
      },
      weight: {
        required,
        maxLength: maxLength(3),
        between: between(0, 300),
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
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.age = null;
      this.form.gender = null;
      this.form.email = null;
      this.form.height = null;
      this.form.weight = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.email}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.center {
  position: absolute;
  width: 50%;
  height: 60%;
  top: 40%;
  left: 30%;
  margin: -150px 0 0 -150px;
}
</style>
