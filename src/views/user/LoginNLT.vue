<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="10" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side">
          <!-- <p class="title h2">TẬP ĐOÀN CÔNG NGHỆ NAM LONG</p> -->
          <!-- <p class="title mb-0">
            {{ $t("login.title-register") }}
          </p> -->
        </div>
        <div class="form-side">
          <router-link tag="a" to="/">
            <span class="logo-single" />
          </router-link>
          <h6 class="mb-4">
            <strong>{{ $t("user.login-title") }}</strong>
          </h6>

          <b-form
            @submit.prevent="formSubmit"
            class="av-tooltip tooltip-label-bottom"
          >
            <b-form-group
              :label="$t('user.username')"
              class="has-float-label mb-4"
            >
              <b-form-input
                type="text"
                v-model="$v.form.username.$model"
                :state="!$v.form.username.$error"
              />
              <b-form-invalid-feedback v-if="!$v.form.username.required"
                >Please enter your username address</b-form-invalid-feedback
              >
              <b-form-invalid-feedback v-else-if="!$v.form.username.username"
                >Please enter a valid username address</b-form-invalid-feedback
              >
              <b-form-invalid-feedback v-else-if="!$v.form.username.minLength"
                >Your username must be minimum 4
                characters</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              :label="$t('user.password')"
              class="has-float-label mb-4"
            >
              <b-form-input
                type="password"
                name="password"
                autocomplete="on"
                v-model="$v.form.password.$model"
                :state="!$v.form.password.$error"
              />
              <b-form-invalid-feedback v-if="!$v.form.password.required"
                >Please enter your password</b-form-invalid-feedback
              >
              <b-form-invalid-feedback
                v-else-if="
                  !$v.form.password.minLength || !$v.form.password.maxLength
                "
                >Your password must be between 4 and 16
                characters</b-form-invalid-feedback
              >
            </b-form-group>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="d-inline-block" style="padding-top: 10px">
                  <b-dropdown
                    id="langddm"
                    class="ml-2"
                    variant="light"
                    size="sm"
                    toggle-class="language-button"
                  >
                    <template slot="button-content">
                      <b-img
                        alt="img_language"
                        v-for="(k, index) in localeOptions"
                        v-if="k.id === $i18n.locale"
                        fluid
                        :key="index"
                        :src="k.icon"
                        width="30"
                      />
                      <span class="name">{{ $i18n.locale.toUpperCase() }}</span>
                    </template>
                    <b-dropdown-item
                      v-for="(l, index) in localeOptions"
                      :key="index"
                      @click="changeLocale(l.id, l.direction)"
                    >
                      <b-img fluid :src="l.icon" width="30" />
                      {{ l.name }}
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
                <div>
                  <strong>
                    Bạn chưa có tài khoản?
                    <router-link tag="a" to="#">
                      <span class="text-primary">Đăng ký</span>
                    </router-link>
                  </strong>
                </div>
              </div>
              <b-button
                type="submit"
                variant="primary"
                size="lg"
                :disabled="processing"
                :class="{
                  'btn-multiple-state btn-shadow': true,
                  'show-spinner': processing,
                  'show-success': !processing && loginError === false,
                  'show-fail': !processing && loginError,
                }"
              >
                <span class="spinner d-inline-block">
                  <span class="bounce1"></span>
                  <span class="bounce2"></span>
                  <span class="bounce3"></span>
                </span>
                <span class="icon success">
                  <i class="simple-icon-check"></i>
                </span>
                <span class="icon fail">
                  <i class="simple-icon-exclamation"></i>
                </span>
                <span class="label">{{ $t("user.login-button") }}</span>
              </b-button>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { adminRoot, localeOptions } from "../../constants/config";
import { getDirection, setDirection } from "../../utils";

const {
  required,
  maxLength,
  minLength,
  username,
} = require("vuelidate/lib/validators");

export default {
  data() {
    return {
      localeOptions,
      form: {
        username: "",
        password: "",
      },
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3),
      },
      password: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(3),
      },
    },
  },
  computed: {
    ...mapGetters(["currentUser", "processing", "loginError"]),
  },
  methods: {
    ...mapActions(["login", "setLang"]),
    formSubmit() {
      this.$v.$touch();
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.login({
          UserName: this.form.username,
          UserPassword: this.form.password,
        });
      }
    },
    changeLocale(locale, direction) {
      const currentDirection = getDirection().direction;
      if (direction !== currentDirection) {
        setDirection(direction);
      }
      this.setLang(locale);
    },
  },
  watch: {
    currentUser(val) {
      if (val) {
        setTimeout(() => {
          this.$router.push(adminRoot);
        }, 200);
      }
    },
    loginError(val) {
      if (val != null) {
        this.$notify("error", "Login Error", val, {
          duration: 3000,
          permanent: false,
        });
      }
    },
  },
  created() {
    if (this.currentUser) {
      setTimeout(() => {
        this.$router.push(adminRoot);
      }, 200);
    }
  },
};
</script>
<style scoped>
.title {
  text-align: center;
  display: flex;
  color: #e74c3c !important;
  font-weight: 900;
  background: #000;
  opacity: 0.8;
  padding: 3px;
  padding-top: 5px;
  border-radius: 5px;
}
</style>