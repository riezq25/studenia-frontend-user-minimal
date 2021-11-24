<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo mb-3">
        <vuexy-logo width="80" />

        <!-- <h2 class="brand-text text-primary ml-1">Studenia</h2> -->
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="5" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img fluid :src="imgUrl" alt="Register V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col lg="7" class="d-flex align-items-center auth-bg px-1 p-lg-5 pt-3 pt-lg-0">
        <b-col sm="12" md="12" lg="12" class="px-xl-2 mx-auto py-5 py-lg-0 mt-5 mt-lg-0">
          <b-card-title class="mb-1">Adventure starts here 🚀</b-card-title>
          <b-card-text class="mb-2">Silahkan Daftar Akun terlebih dahulu</b-card-text>

          <!-- form -->
          <validation-observer ref="registerForm">
            <b-form class="mt-2" @submit.prevent>
              <b-row>
                <!-- nama -->
                <b-col md="6">
                  <b-form-group label="Nama" label-for="nama">
                    <b-input-group class="input-group-merge">
                      <b-input-group-prepend is-text>
                        <feather-icon icon="UserIcon" />
                      </b-input-group-prepend>
                      <b-form-input id="nama" placeholder="Nama" v-model.trim="name" />
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <!-- email -->
                <b-col md="6">
                  <b-form-group label="Email" label-for="email" class="w-100">
                    <b-input-group class="input-group-merge">
                      <b-input-group-prepend is-text>
                        <feather-icon icon="MailIcon" />
                      </b-input-group-prepend>
                      <b-form-input id="email" v-model.trim="email" placeholder="john@example.com" />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <!-- whatsapp -->
                <b-col md="6">
                  <b-form-group label="Whatsapp" label-for="whatsapp">
                    <b-input-group class="input-group-merge">
                      <b-input-group-prepend is-text>+62</b-input-group-prepend>
                      <b-form-input
                        type="number"
                        id="whatsapp"
                        placeholder="Whatsapp"
                        v-model.number="no_wa"
                      />
                    </b-input-group>
                    <small class="text-danger">* tanpa 0 di depannya</small>
                  </b-form-group>
                </b-col>

                <!-- sekolah -->
                <b-col md="6">
                  <b-form-group label="Asal Sekolah" label-for="asal_sekolah" class="w-100">
                    <b-input-group class="input-group-merge">
                      <b-input-group-prepend is-text>
                        <feather-icon icon="HomeIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="asal_sekolah"
                        v-model.trim="asal_sekolah"
                        placeholder="SMA/MA"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <!-- tanggal lahir -->
                <b-col md="6">
                  <b-form-group label="Tanggal Lahir" label-for="tanggal_lahir">
                    <b-form-datepicker
                      id="tanggal_lahir"
                      v-model="tanggal_lahir"
                      class="mb-1"
                      placeholder="Tanggal Lahir"
                    />
                  </b-form-group>
                </b-col>

                <!-- jenis kelamin -->
                <b-col md="6">
                  <b-form-group label="Jenis Kelamin">
                    <div class="d-flex justify-content-start">
                      <b-form-radio
                        v-model="jenis_kelamin"
                        name="some-radios"
                        value="LAKI-LAKI"
                      >Laki Laki</b-form-radio>
                      <b-form-radio
                        v-model="jenis_kelamin"
                        name="some-radios"
                        value="PEREMPUAN"
                        class="ml-2"
                      >Perempuan</b-form-radio>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <!-- provinsi -->
                <b-col md="6">
                  <b-form-group label="Provinsi">
                    <b-form-group>
                      <v-select
                        v-model="provinsi"
                        placeholder="--Provinsi--"
                        :options="optionProvinsi"
                        :reduce="name => name.id"
                        label="name"
                      />
                    </b-form-group>
                  </b-form-group>
                </b-col>

                <!-- kab/kota -->
                <b-col md="6">
                  <b-form-group label="Kab/Kota">
                    <v-select
                      v-if="provinsi"
                      v-model="kab_kota"
                      placeholder="--Kab/Kota--"
                      :options="optionKabKota"
                      :reduce="name => name.id"
                      label="name"
                    />
                    <v-select v-else disabled placeholder="Pilih provinsi dulu" />
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <!-- kecamatan -->
                <b-col md="6">
                  <b-form-group label="Kecamatan">
                    <v-select
                      v-if="kab_kota"
                      v-model="kecamatan"
                      placeholder="--Kecamatan--"
                      :options="optionKecamatan"
                      :reduce="name => name.id"
                      label="name"
                    />
                    <v-select v-else disabled placeholder="Pilih Kab/Kota dulu" />
                  </b-form-group>
                </b-col>

                <!-- alamat -->
                <b-col md="6">
                  <b-form-group label="Alamat" label-for="alamat" class="w-100">
                    <b-form-textarea
                      v-model.trim="alamat"
                      id="alamat"
                      placeholder="Tuliskan Alamat anda"
                      rows="3"
                    />
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <!-- password -->
                <b-col md="6">
                  <b-form-group label-for="register-password" label="Password" class="w-100">
                    <b-input-group class="input-group-merge">
                      <b-input-group-prepend is-text>
                        <feather-icon icon="LockIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="register-password"
                        v-model="password"
                        class="form-control-merge"
                        :type="passwordFieldType"
                        name="register-password"
                        placeholder="············"
                      />
                      <b-input-group-append is-text>
                        <feather-icon
                          :icon="passwordToggleIcon"
                          class="cursor-pointer"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-append>
                    </b-input-group>

                    <small class="text-danger">* panjang password minimal 7 karakter</small>
                  </b-form-group>
                </b-col>

                <!-- password confirmation -->
                <b-col md="6">
                  <b-form-group
                    label-for="register-password-confirmation"
                    label="Password Confirmation"
                    class="w-100"
                  >
                    <b-input-group class="input-group-merge">
                      <b-input-group-prepend is-text>
                        <feather-icon icon="LockIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="register-password-confirmation"
                        v-model="password_confirmation"
                        class="form-control-merge"
                        :type="passwordFieldType"
                        name="register-password"
                        placeholder="············"
                      />
                      <b-input-group-append is-text>
                        <feather-icon
                          :icon="passwordToggleIcon"
                          class="cursor-pointer"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-button
                variant="primary"
                block
                :disabled="!cekForm"
                @click="register"
                type="submit"
                class="mt-2"
              >{{ isSubmitting ? 'Silahkan lengkapi data' : 'Daftar' }}</b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>Sudah mempunyai akun?</span>
            <b-link :to="{ name: 'login' }">
              <span>&nbsp;Silahkan Login</span>
            </b-link>
          </p>

          <!-- divider -->
          <!-- <div class="divider my-2">
            <div class="divider-text">or</div>
          </div>

          <div>
            <b-button type="submit" block v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary">Daftar dengan Google</b-button>
          </div>-->
        </b-col>
      </b-col>
      <!-- /Register-->
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
  BButton,
  BForm,
  BFormTextarea,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BImg,
  BCardTitle,
  BCardText,
  BFormDatepicker,
  BFormRadio,
} from "bootstrap-vue";
import vSelect from "vue-select";
// import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import Ripple from "vue-ripple-directive";
import store from "@/store/index";
import router from "@/router";

import repository from "@repofactory";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

const authRepo = repository.get("auth");
const apiProvinsi = repository.get("ProvinsiRepository");
const apiKota = repository.get("KotaRepository");
const apiKecamatan = repository.get("KecamatanRepository");

export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BFormTextarea,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BFormDatepicker,
    BFormRadio,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    vSelect,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      name: "",
      email: "",
      no_wa: "",
      asal_sekolah: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      provinsi: "",
      kab_kota: "",
      kecamatan: "",
      alamat: "",
      password: "",
      password_confirmation: "",
      isSubmitting: false,
      sideImg: require("@/assets/images/pages/register-v2.svg"),
      optionProvinsi: [],
      optionKabKota: [],
      optionKecamatan: [],
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
    cekForm() {
      return (this.name != '' && this.email != '' && this.no_wa != null && this.password != '' && this.password_confirmation != '' && this.provinsi != '' && this.kab_kota != '' && this.kecamatan != '' && this.tanggal_lahir != '' && this.jenis_kelamin != '')
    }
  },
  mounted() {
    this.getProvinsi();
  },
  watch: {
    provinsi(newValue, oldValue) {
      if (newValue) {
        this.kab_kota = "";
      }
      this.getKabKota();
    },

    kab_kota(newValue, oldValue) {
      if (newValue) {
        this.kecamatan = "";
      }
      this.getKecamatan();
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
    getProvinsi: async function () {
      await apiProvinsi
        .get()
        .then((response) => {
          this.optionProvinsi = response.data;
        })
        .catch((error) => {
          console.log("error bos");
        });
    },

    getKabKota: async function () {
      await apiKota
        .get(this.provinsi)
        .then((response) => {
          this.optionKabKota = response.data.cities;
        })
        .catch((error) => {
          console.log("error kota/ provinsi");
        });
    },

    getKecamatan: async function () {
      await apiKecamatan
        .get(this.kab_kota)
        .then((response) => {
          this.optionKecamatan = response.data.districts;
        })
        .catch((error) => {
          console.log("error kecamatan");
        });
    },

    register() {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          //   if (
          //     (this.name,
          //     this.email,
          //     this.no_wa,
          //     this.asal_sekolah,
          //     this.tanggal_lahir,
          //     this.jenis_kelamin,
          //     this.provinsi,
          //     this.kab_kota,
          //     this.kecamatan,
          //     this.alamat,
          //     this.password,
          //     this.password_confirmation)
          //   ) {

          //   }
          this.isSubmitting = false;
          //   console.log("name: ", this.name);
          //   console.log("email: ", this.email);
          //   console.log("no_wa: ", this.no_wa);
          //   console.log("asal_sekolah: ", this.asal_sekolah);
          //   console.log("tanggal_lahir: ", this.tanggal_lahir);
          //   console.log("jenis_kelamin: ", this.jenis_kelamin);
          //   console.log("provinsi: ", this.provinsi);
          //   console.log("kab_kota: ", this.kab_kota);
          //   console.log("kecamatan: ", this.kecamatan);
          //   console.log("alamat: ", this.alamat);
          //   console.log("password: ", this.password);
          //   console.log("password_confirmation: ", this.password_confirmation);
          authRepo
            .signup({
              name: this.name,
              email: this.email,
              password: this.password,
              password_confirmation: this.password_confirmation,
              province_id: this.provinsi,
              city_id: this.kab_kota,
              district_id: this.kecamatan,
              alamat: this.alamat,
              no_wa: this.no_wa,
              sekolah_asal: this.asal_sekolah,
              tanggal_lahir: this.tanggal_lahir,
              jenis_kelamin: this.jenis_kelamin,
            })
            .then((response) => {
              //   store.state.auth.isLogin = true;
              //   store.state.auth.user = response.data.user;
              //   store.state.auth.permissions = response.data.user.permissions;
              //   localStorage.setItem("token", response.data.access_token);
              // console.log(response);
              // console.log("name: ", this.name);
              // console.log("email: ", this.email);
              // console.log("no_wa: ", this.no_wa);
              // console.log("asal_sekolah: ", this.asal_sekolah);
              // console.log("tanggal_lahir: ", this.tanggal_lahir);
              // console.log("jenis_kelamin: ", this.jenis_kelamin);
              // console.log("provinsi: ", this.provinsi);
              // console.log("kab_kota: ", this.kab_kota);
              // console.log("kecamatan: ", this.kecamatan);
              // console.log("alamat: ", this.alamat);
              // console.log("password: ", this.password);
              // console.log(
              //   "password_confirmation: ",
              //   this.password_confirmation
              // );
              this.isSubmiting = false;
              this.showToast(
                "Sukses",
                response.data.message,
                "success",
                "BellIcon"
              );
              setTimeout(() => {
                router.push("/login");
              }, 1000);

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
              } else {
                this.showToast(
                  "Error",
                  error.message,
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
/* eslint-disable global-require */
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
