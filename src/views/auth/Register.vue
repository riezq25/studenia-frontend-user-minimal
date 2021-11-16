<template>
  <div>
    <form-wizard color="#7367F0" :title="null" :subtitle="null" shape="square" finish-button-text="Submit" back-button-text="Previous" class="mb-3" @on-complete="formSubmitted">
      <!-- accoint details tab -->
      <tab-content title="Account Details" :before-change="validationForm">
        <validation-observer ref="accountRules">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">Account Details</h5>
              <small class="text-muted">Masukkan Detail akun kamu.</small>
            </b-col>
            <b-col md="6">
              <b-form-group label="Email" label-for="email">
                <validation-provider name="email" rules="required|email">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                      </svg>
                    </b-input-group-prepend>
                    <b-form-input id="vi-first-name" placeholder="Email" v-model="email" />
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Whatsapp" label-for="name">
                <validation-provider name="whatsapp" rules="required">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <div>+62</div>
                    </b-input-group-prepend>
                    <b-form-input id="whatsapp" placeholder="Nomor WA" v-model="no_wa" />
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Password" label-for="password">
                <validation-provider name="Password" vid="Password" rules="required|password">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="LockIcon" />
                    </b-input-group-prepend>
                    <b-form-input id="hi-password" type="password" placeholder="Password" v-model="password" />
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Konfirmasi Password" label-for="c-password">
                <validation-provider name="Password Confirm" rules="required|confirmed:Password">
                  <b-input-group class="input-group-merge">
                    <b-input-group-prepend is-text>
                      <feather-icon icon="LockIcon" />
                    </b-input-group-prepend>
                    <b-form-input id="hi-password" type="password" placeholder="Konfirmasi Password" v-model="password_confirmation" />
                  </b-input-group>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

      <!-- personal details tab -->
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
  BFormInvalidFeedback,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { codeIcon } from "./code";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    BFormInvalidFeedback,
    BFormCheckbox,
    BForm,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      selectedContry: "",
      selectedLanguage: "",
      name: "",
      email: "",
      no_wa: "",
      password: "",
      password_confirmation: "",
      first_name: "",
      last_name: "",
      address: "",
      landMark: "",
      pincode: "",
      twitterUrl: "",
      facebookUrl: "",
      googleUrl: "",
      linkedinUrl: "",
      city: "",
      required,
      email,
      codeIcon,
      countryName: [
        { value: "select_value", text: "Select Value" },
        { value: "Russia", text: "Russia" },
        { value: "Canada", text: "Canada" },
        { value: "China", text: "China" },
        { value: "United States", text: "United States" },
        { value: "Brazil", text: "Brazil" },
        { value: "Australia", text: "Australia" },
        { value: "India", text: "India" },
      ],
      languageName: [
        { value: "nothing_selected", text: "Nothing Selected" },
        { value: "English", text: "English" },
        { value: "Chinese", text: "Mandarin Chinese" },
        { value: "Hindi", text: "Hindi" },
        { value: "Spanish", text: "Spanish" },
        { value: "Arabic", text: "Arabic" },
        { value: "Malay", text: "Malay" },
        { value: "Russian", text: "Russian" },
      ],
    };
  },

  methods: {
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Form Submitted",
          icon: "EditIcon",
          variant: "success",
        },
      });
    },
    validationForm() {
      //   this.$refs.accountRules.validate().then((success) => {
      //     if (success) {
      //       console.log(this.email);
      //     }
      //   });

      this.$refs.accountRules.validate().then((success) => {
        if (success) {
          alert("halo bro");
          console.log(this.email);
        }
      });
    },
    // validationFormInfo() {
    //   return new Promise((resolve, reject) => {
    //     this.$refs.infoRules.validate().then((success) => {
    //       if (success) {
    //         resolve(true);
    //       } else {
    //         reject();
    //       }
    //     });
    //   });
    // },
    // validationFormAddress() {
    //   return new Promise((resolve, reject) => {
    //     this.$refs.addressRules.validate().then((success) => {
    //       if (success) {
    //         resolve(true);
    //       } else {
    //         reject();
    //       }
    //     });
    //   });
    // },
    // validationFormSocial() {
    //   return new Promise((resolve, reject) => {
    //     this.$refs.socialRules.validate().then((success) => {
    //       if (success) {
    //         resolve(true);
    //       } else {
    //         reject();
    //       }
    //     });
    //   });
    // },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-wizard.scss";
</style>
