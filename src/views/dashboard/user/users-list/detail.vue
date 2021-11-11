<template>
    <div>
        <b-overlay
            :show="isLoading"
            spinner-variant="primary"
            spinner-type="grow"
            spinner-large
            rounded="lg"
        >
            <b-card no-body class="mb-0">
                <b-row>
                    <!-- Register-->
                    <b-col cols="12" class="px-5">
                        <b-form class="my-2">
                            <b-row>
                                <!-- username -->
                                <b-col md="6">
                                    <b-form-group label="Username" label-for="vi-first-name">
                                        <b-input-group class="input-group-merge">
                                            <b-input-group-prepend is-text>
                                                <feather-icon icon="UserIcon" />
                                            </b-input-group-prepend>
                                            <b-form-input
                                                id="vi-first-name"
                                                v-model="currentUser.name"
                                                placeholder="Username"
                                                disabled
                                            />
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>

                                <!-- email -->
                                <b-col md="6">
                                    <b-form-group label="Email" label-for="register-email">
                                        <b-input-group class="input-group-merge">
                                            <b-input-group-prepend is-text>
                                                <feather-icon icon="MailIcon" />
                                            </b-input-group-prepend>
                                            <b-form-input
                                                id="login-email"
                                                v-model="currentUser.email"
                                                name="login-email"
                                                disabled
                                                placeholder="john@example.com"
                                            />
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>

                            <b-row>
                                <!-- username -->
                                <b-col md="6">
                                    <b-form-group label="Whatsapp" label-for="vi-first-name">
                                        <b-input-group class="input-group-merge">
                                            <b-input-group-prepend is-text>+62</b-input-group-prepend>
                                            <b-form-input
                                                id="vi-first-name"
                                                placeholder="Whatsapp"
                                                disabled
                                                v-model="currentUser.no_wa"
                                            />
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>

                                <!-- email -->
                                <b-col md="6">
                                    <b-form-group
                                        label="Asal Sekolah"
                                        label-for="register-email"
                                        class="w-100"
                                    >
                                        <b-input-group class="input-group-merge">
                                            <b-input-group-prepend is-text>
                                                <feather-icon icon="HomeIcon" />
                                            </b-input-group-prepend>
                                            <b-form-input
                                                id="login-email"
                                                v-model="currentUser.sekolah_asal"
                                                name="login-email"
                                                disabled
                                                placeholder="SMA/MA"
                                            />
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                            </b-row>

                            <b-row>
                                <!-- username -->
                                <b-col md="6">
                                    <b-form-group label="Tanggal Lahir" label-for="vi-first-name">
                                        <b-form-datepicker
                                            id="example-datepicker"
                                            v-model="currentUser.tanggal_lahir"
                                            disabled
                                            class="mb-1"
                                        />
                                    </b-form-group>
                                </b-col>

                                <!-- email -->
                                <b-col md="6">
                                    <b-form-group label="Jenis Kelamin" label-for="register-email">
                                        <div class="d-flex justify-content-start mt-1">
                                            <b-form-radio
                                                v-model="currentUser.jenis_kelamin"
                                                name="some-radios"
                                                disabled
                                                value="Laki"
                                            >Laki Laki</b-form-radio>
                                            <b-form-radio
                                                v-model="currentUser.jenis_kelamin"
                                                name="some-radios"
                                                value="Perempuan"
                                                disabled
                                                class="ml-2"
                                            >Perempuan</b-form-radio>
                                        </div>
                                    </b-form-group>
                                </b-col>
                            </b-row>

                            <b-row>
                                <!-- username -->
                                <b-col md="6">
                                    <b-form-group label="Provinsi" label-for="vi-first-name">
                                        <v-select
                                            v-model="currentUser.province_id"
                                            label="title"
                                            disabled
                                        />
                                    </b-form-group>
                                </b-col>

                                <!-- email -->
                                <b-col md="6">
                                    <b-form-group
                                        label="Kab/Kota"
                                        label-for="register-email"
                                        class="w-100"
                                    >
                                        <v-select
                                            v-model="currentUser.city_id"
                                            label="title"
                                            disabled
                                        />
                                    </b-form-group>
                                </b-col>
                            </b-row>

                            <b-row>
                                <!-- username -->
                                <b-col md="6">
                                    <b-form-group label="Kecamatan" label-for="vi-first-name">
                                        <v-select v-model="currentUser.district_id" label="title" />
                                    </b-form-group>
                                </b-col>

                                <!-- email -->
                                <b-col md="6">
                                    <b-form-group label="Alamat" label-for="sekolah" class="w-100">
                                        <b-form-textarea
                                            id="textarea-default"
                                            v-model="currentUser.alamat"
                                            placeholder="Tuliskan Alamat anda"
                                            disabled
                                            rows="3"
                                        />
                                    </b-form-group>
                                </b-col>
                            </b-row>

                            <b-row>
                                <!-- username -->
                                <b-col md="6">
                                    <b-form-group
                                        label-for="register-password"
                                        label="Password"
                                        class="w-100"
                                    >
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Password"
                                            vid="password"
                                            rules="required"
                                        >
                                            <b-input-group
                                                class="input-group-merge"
                                                :class="errors.length > 0 ? 'is-invalid' : null"
                                            >
                                                <b-input-group-prepend is-text>
                                                    <feather-icon icon="LockIcon" />
                                                </b-input-group-prepend>
                                                <b-form-input
                                                    id="register-password"
                                                    v-model="password"
                                                    class="form-control-merge"
                                                    :type="passwordFieldType"
                                                    :state="errors.length > 0 ? false : null"
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
                                            <small class="text-danger">{{ errors[0] }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>

                                <!-- email -->
                                <b-col md="6">
                                    <b-form-group
                                        label-for="register-password-confirmation"
                                        label="Password Confirmation"
                                        class="w-100"
                                    >
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Password"
                                            vid="password"
                                            rules="required"
                                        >
                                            <b-input-group
                                                class="input-group-merge"
                                                :class="errors.length > 0 ? 'is-invalid' : null"
                                            >
                                                <b-input-group-prepend is-text>
                                                    <feather-icon icon="LockIcon" />
                                                </b-input-group-prepend>
                                                <b-form-input
                                                    id="register-password-confirmation"
                                                    v-model="password"
                                                    class="form-control-merge"
                                                    :type="passwordFieldType"
                                                    :state="errors.length > 0 ? false : null"
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
                                            <small class="text-danger">{{ errors[0] }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-form>
                    </b-col>
                    <!-- /Register-->
                </b-row>
            </b-card>
        </b-overlay>
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
    BCard,
    BCardTitle,
    BCardText,
    BFormDatepicker,
    BFormRadio,
    BOverlay
} from "bootstrap-vue";
import { ref, onMounted, computed } from "@vue/composition-api";
import vSelect from "vue-select";
import FlatPickr from "vue-flatpickr-component";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import Ripple from "vue-ripple-directive";
import { useRouter } from "@core/utils/utils";
import repository from "@repofactory";
const user = repository.get("userRepository");

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
        BCard,
        BCardText,
        BCardTitle,
        BFormCheckbox,
        BFormGroup,
        BFormInput,
        BInputGroup,
        BInputGroupAppend,
        BInputGroupPrepend,
        BOverlay,
        vSelect,
        // validations
        ValidationProvider,
        ValidationObserver,
        FlatPickr,
        BFormDatepicker,
        BFormRadio,
    },
    directives: {
        Ripple,
    },
    mixins: [togglePasswordVisibility],
    setup() {
        const { route } = useRouter()
        const idUser = route.value.params.id
        const currentUser = ref([])

        const isLoading = ref(false)

        onMounted(async () => {

            isLoading.value = true

            await user
                .show(idUser)
                .then((response) => {
                    isLoading.value = false
                    currentUser.value = response.data.data
                })
                .catch((error) => {
                    if (error.response) {
                        showToast(
                            "Error",
                            error.response.data.message,
                            "danger",
                            "AlertTriangleIcon"
                        );
                    } else if (error.request) {
                        showToast(
                            "Error",
                            "Tidak bisa request data ke server",
                            "danger",
                            "AlertTriangleIcon"
                        );
                    } else {
                        showToast("Error", error.message, "danger", "AlertTriangleIcon");
                    }
                });

        })

        return {
            idUser,
            currentUser,
            isLoading
        }
    },
    computed: {
        passwordToggleIcon() {
            return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
        },
    },
};
/* eslint-disable global-require */
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>