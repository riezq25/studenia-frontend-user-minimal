<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <!-- <b-link class="brand-logo mb-3">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">Studenia</h2>
      </b-link>-->
      <!-- /Brand logo -->

      <!-- Left Text-->
      <b-col lg="7" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img fluid :src="imgUrl" alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="5" class="auth-bg px-2 p-lg-2">
        <div class="text-center my-2 my-lg-1">
          <vuexy-logo width="80" />
        </div>
        <b-col sm="10" md="6" lg="12" class="px-xl-2 mx-auto pt-1 pt-lg-2">
          <b-card-title class="mb-1 font-weight-bold" title-tag="h3">Selamat Datang di Studenia! 👋</b-card-title>
          <b-card-text class="mb-2">Silahkan Login ke Akun kamu</b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <!-- email -->
              <b-form-group label="Email" label-for="login-email">
                <validation-provider #default="{ errors }" name="Email" vid="email" rules="required|email">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="MailIcon" />
                    </b-input-group-prepend>
                    <b-form-input id="login-email" v-model="userEmail" :state="errors.length > 0 ? false : null" name="login-email" placeholder="john@example.com" />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <!-- <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <b-link :to="{ name: 'auth-forgot-password' }">
                    <small>Lupa Password?</small>
                  </b-link>
                </div>-->
                <validation-provider #default="{ errors }" name="Password" vid="password" rules="required">
                  <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="LockIcon" />
                    </b-input-group-prepend>
                    <b-form-input id="login-password" v-model="password" :state="errors.length > 0 ? false : null" class="form-control-merge" :type="passwordFieldType" name="login-password" placeholder="Password" />
                    <b-input-group-append is-text>
                      <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility" />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox id="remember-me" v-model="status" name="checkbox-1">Remember Me</b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block @click="validationForm" :disabled="isSubmiting">
                <div v-if="isSubmiting">
                  <b-spinner small />
                  <span class="sr-only">Loading...</span>
                </div>

                <div v-else>
                  <span>Sign in</span>
                </div>
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>Belum punya Akun?</span>
            <b-link :to="{ name: 'register' }">
              <span>&nbsp;Buat Akun</span>
            </b-link>
          </b-card-text>

          <!-- <div class="divider my-2">
            <div class="divider-text">or</div>
          </div>

          <div>
            <b-button type="submit" block v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary">Masuk dengan Google</b-button>
          </div>-->
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroupPrepend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
  VBTooltip,
  BSpinner,
} from "bootstrap-vue";
import useJwt from "@/auth/jwt/useJwt";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import Ripple from "vue-ripple-directive";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import repository from "@repofactory";
import router from "@/router";

const authRepo = repository.get("auth");

export default {
  directives: {
    "b-tooltip": VBTooltip,
    Ripple,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroupPrepend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
    BSpinner,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      isSubmiting: false,
      status: "",
      password: "",
      userEmail: "",
      sideImg: require("@/assets/images/pages/login-v2.svg"),

      // validation rules
      required,
      email,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    showToast(title, text, variant, icon) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title,
          text,
          variant,
          icon,
        },
      });
    },
    validationForm() {
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          this.isSubmiting = true;
          authRepo
            .login({
              email: this.userEmail,
              password: this.password,
            })
            .then((response) => {
              store.state.auth.isLogin = true;
              store.state.auth.token = response.data.access_token;
              store.state.auth.user = response.data.user;
              store.state.auth.permissions = response.data.user.permissions;
              localStorage.setItem("token", response.data.access_token);
              router.push("/");
              this.isSubmiting = false;

              // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
            })
            .catch((error) => {
              if (error.response) {
                this.showToast(
                  "Error",
                  error.response.data.message,
                  "danger",
                  "AlertTriangleIcon"
                );
              } else if (error.request) {
                this.showToast(
                  "Error",
                  "Tidak bisa request data ke server",
                  "danger",
                  "AlertTriangleIcon"
                );
              }

              // else {
              //   console.log(error);
              //   this.showToast(
              //     "Error",
              //     error.message,
              //     "danger",
              //     "AlertTriangleIcon"
              //   );
              // }
              else {
                this.showToast(
                  "Error",
                  "Email/password kamu salah",
                  "danger",
                  "AlertTriangleIcon"
                );
              }
              this.isSubmiting = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
