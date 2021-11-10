<template>
  <div>
    <!-- Tambah To Soal -->
    <b-modal id="tambah-user" size="lg" title="Tambah Pengguna" cancel-title="Close" ok-title="Simpan" cancel-variant="outline-secondary" @show="resetModal" @hidden="resetModal" @ok="submitUser">
      <validation-observer ref="registerForm" #default="{}">
        <b-form class="mt-2">
          <b-row>
            <!-- username -->
            <b-col lg="6">
              <b-form-group label="Nama Lengkap" label-for="vi-first-name">
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="UserIcon" />
                  </b-input-group-prepend>
                  <b-form-input id="vi-first-name" v-model="form.name" placeholder="Nama Lengkap" />
                </b-input-group>
              </b-form-group>
            </b-col>

            <!-- email -->
            <b-col lg="6">
              <b-form-group label="Email" label-for="register-email" class="w-100">
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="MailIcon" />
                  </b-input-group-prepend>
                  <b-form-input id="login-email" v-model="form.email" name="login-email" placeholder="john@example.com" />
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col lg="6">
              <b-form-group>
                <label for="basic-password1">Password</label>
                <b-input-group class="input-group-merge">
                  <b-form-input id="basic-password1" :type="passwordFieldType" placeholder="Masukkan password" v-model="form.password" />
                  <b-input-group-append is-text>
                    <feather-icon :icon="passwordToggleIcon" class="cursor-pointer" @click="togglePasswordVisibility" />
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col lg="6" hidden>
              <b-form-group>
                <label for="basic-password1">Password Confirmation</label>
                <b-input-group class="input-group-merge">
                  <b-form-input id="basic-password1" :type="passwordFieldType" placeholder="Masukkan password confirmation" v-model="form.password_confirmation" />
                  <b-input-group-append is-text>
                    <feather-icon :icon="passwordToggleIcon" class="cursor-pointer" @click="togglePasswordVisibility" />
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Show</label>
            <!-- <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block mx-50" /> -->
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <!-- <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Search..." /> -->

              <b-button variant="primary" v-b-modal.tambah-user>
                <span class="text-nowrap">Tambah Pengguna</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table ref="refUserListTable" :busy="isLoading" class="position-relative" responsive :items="listUser" :fields="tableColumns" primary-key="id" show-empty empty-text="No matching records found">
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle mr-1"></b-spinner>
            <strong>Sedang memuat data...</strong>
          </div>
        </template>

        <!-- Column: User -->
        <template #cell(nama)="data">
          <b-media vertical-align="center">
            <template #aside>
              <!-- <b-avatar size="32" :src="data.item.avatar" :text="avatarText(data.item.fullName)" :variant="`light-${resolveUserRoleVariant(data.item.role)}`" :to="{ name: 'apps-users-view', params: { id: data.item.id } }" /> -->
            </template>
            <b-link :to="{ name: 'apps-users-view', params: { id: data.item.id } }" class="font-weight-bold d-block text-nowrap">{{ data.item.fullName }}</b-link>
            <small class="text-muted">@{{ data.item.username }}</small>
          </b-media>
        </template>

        <!-- Column: Role -->
        <template #cell(role)="data">
          <div class="text-nowrap">
            <feather-icon :icon="resolveUserRoleIcon(data.item.role)" size="18" class="mr-50" :class="`text-${resolveUserRoleVariant(data.item.role)}`" />
            <span class="align-text-top text-capitalize">{{ data.item.role }}</span>
          </div>
        </template>

        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge pill :variant="`light-${resolveUserStatusVariant(data.item.status)}`" class="text-capitalize">{{ data.item.status }}</b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">
            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>
            <b-dropdown-item :to="{ name: 'apps-users-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'apps-users-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <!-- <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span> -->
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
            <!-- <b-pagination v-model="currentPage" :total-rows="totalUsers" :per-page="perPage" first-number last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>-->
          </b-col>
        </b-row>
      </div>
    </b-card>

    <!-- <b-modal id="formTambahUser" ok-title="Simpan" centered size="lg" title="Large Modal" cancel-variant="outline-secondary" @show="resetModal" @hidden="resetModal" @ok="storeUser"></b-modal> -->
  </div>
</template>

<script setup>
import {
  BFormGroup,
  BFormCheckbox,
  BForm,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BFormTextarea,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BSpinner,
  BDropdownItem,
  BPagination,
  BFormRadio,
  BFormDatepicker,
  VBModal,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store";
import { ref, onMounted, computed } from "@vue/composition-api";
import { avatarText } from "@core/utils/filter";

import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import repository from "@repofactory";
const user = repository.get("userRepository");

export default {
  components: {
    BFormGroup,
    BFormCheckbox,
    BForm,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BFormTextarea,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BSpinner,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BFormRadio,
    BFormDatepicker,
    VBModal,

    vSelect,

    //validations
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    "b-modal": VBModal,
  },
  mixins: [togglePasswordVisibility],

  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },

  setup() {
    const isLoading = ref(true);
    const isSubmitting = ref(false);
    const isError = ref(false);
    const toast = useToast();

    const listUser = ref([]);

    // let passwordFieldType = ref("password");

    //form input
    const form = ref({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      province_id: null,
      city_id: null,
      district_id: null,
      alamat: null,
      no_wa: null,
      sekolah_asal: null,
      tanggal_lahir: null,
      jenis_kelamin: null,
    });

    const resetModal = () => {
      form.value = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        province_id: null,
        city_id: null,
        district_id: null,
        alamat: null,
        no_wa: null,
        sekolah_asal: null,
        tanggal_lahir: null,
        jenis_kelamin: null,
      };
    };

    const showToast = (title, text, variant, icon = "BellIcon") => {
      toast({
        component: ToastificationContent,
        props: {
          title,
          icon,
          text,
          variant,
        },
      });
    };

    const fetchUser = async () => {
      isLoading.value = true;
      await user
        .get()
        .then((response) => {
          isLoading.value = false;
          listUser.value = response.data.data.data;
        })
        .catch((error) => {
          isLoading.value = false;
          isError.value = true;
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
    };

    onMounted(async () => {
      fetchUser();
    });

    //submit User
    const submitUser = async () => {
      isSubmitting.value = true;

      await user
        .create({
          name: form.value.name,
          email: form.value.email,
          password: form.value.password,
          password_confirmation: form.value.password,
          province_id: null,
          city_id: null,
          district_id: null,
          alamat: null,
          no_wa: null,
          sekolah_asal: null,
          tanggal_lahir: null,
          jenis_kelamin: null,
        })
        .then((response) => {
          fetchUser();
          showToast("Notifikasi", response.data.message, "primary");

          isSubmitting.value = false;
          resetModal();
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
          isSubmitting.value = false;
          resetModal();
        });
    };

    const tableColumns = [
      { key: "id", label: "ID", sortable: true },
      {
        key: "name",
        label: "Nama",
      },
      {
        key: "email",
        label: "Email",
      },
      {
        key: "no_wa",
        label: "Whatsapp",
      },
      {
        key: "jenis_kelamin",
        label: "Gender",
      },
      { key: "actions" },
    ];

    return {
      tableColumns,
      listUser,
      form,
      isLoading,
      isError,
      isSubmitting,
      resetModal,
      submitUser,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
