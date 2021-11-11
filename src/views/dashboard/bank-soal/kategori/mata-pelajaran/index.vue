<template>
  <div>
    <!-- <modal-tambah :isModalTambahActive="isModalTambahActive"></modal-tambah> -->

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <!-- Table Top -->
        <b-row class="d-flex justify-content-end">
          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <!-- <b-button variant="primary" @click="isAddNewUserSidebarActive = true">
                <span class="text-nowrap">Add Kategori Soal</span>
              </b-button>-->
              <b-button class="mr-2" variant="primary" @click="fetchData">
                <span class="text-nowrap">Refresh Data</span>
              </b-button>
              <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.tambah-mata-pelajaran variant="primary">
                <span class="text-nowrap">Tambah Mata Pelajaran</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <!-- modal tambah mata pelajaran-->
      <b-modal id="tambah-mata-pelajaran" cancel-variant="outline-secondary" ok-title="Tambah" cancel-title="Cancel" centered title="Tambah Mata Pelajaran" @show="resetModal" @hidden="resetModal" @ok="submitMapel">
        <b-form>
          <b-form-group>
            <label for="kode">Kode Mata Pelajaran:</label>
            <b-form-input id="kode" type="text" placeholder="Kode Mata Pelajaran" v-model="form.kode" />
          </b-form-group>
          <b-form-group>
            <label for="mata-pelajaran">Mata Pelajaran:</label>
            <b-form-input id="mata-pelajaran" type="text" placeholder="Mata Pelajaran" v-model="form.nama" />
          </b-form-group>
          <b-form-group>
            <label for="mata-pelajaran">Kategori Soal:</label>
            <v-select v-model="form.kategori_soal_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="listKategoriSoalMapped" :reduce="ks => ks.value" />
          </b-form-group>
        </b-form>
      </b-modal>

      <!-- modal edit mata pelajaran-->
      <b-modal id="edit-mata-pelajaran" cancel-variant="outline-secondary" ok-title="Edit" cancel-title="Cancel" centered title="Edit Mata Pelajaran" @ok="updateMapel">
        <b-form>
          <b-form-group>
            <label for="kode">Kode Mata Pelajaran:</label>
            <b-form-input id="kode" type="text" placeholder="Kode Mata Pelajaran" v-model="form.kode" />
          </b-form-group>
          <b-form-group>
            <label for="mata-pelajaran">Mata Pelajaran:</label>
            <b-form-input id="mata-pelajaran" type="text" placeholder="Mata Pelajaran" v-model="form.nama" />
          </b-form-group>
          <b-form-group>
            <label for="mata-pelajaran">Kategori Soal:</label>
            <v-select v-model="form.kategori_soal_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="title" :options="listKategoriSoalMapped" :reduce="ks => ks.value" />
          </b-form-group>
        </b-form>
      </b-modal>

      <!-- modal hapus kategori soal-->
      <b-modal id="hapus-mata-pelajaran" cancel-variant="outline-secondary" ok-title="Hapus" cancel-title="Close" centered title="Hapus Mata Pelajaran" @ok="deleteMapel(form.id)">
        <b-form>
          <b-form-group>
            <p>Apakah anda akan menghapus mata pelajaran ini?</p>
          </b-form-group>
        </b-form>
      </b-modal>

      <b-table :busy="isLoading" ref="refMapelListTable" class="position-relative" :items="mataPelajaran" responsive :fields="tableColumns" primary-key="id" show-empty striped hover empty-text="Tidak ada yang ditemukan">
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle mr-1"></b-spinner>
            <strong>Sedang memuat data...</strong>
          </div>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">
            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>

            <b-dropdown-item v-b-modal.edit-mata-pelajaran @click="getMapel(data.item.id)">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item @click="getMapel(data.item.id)" v-b-modal.hapus-mata-pelajaran>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BModal,
  VBModal,
  BForm,
  BFormGroup,
  BCardText,
  BButton,
  BTable,
  BDropdown,
  BDropdownItem,
  BSpinner,
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onMounted, computed } from "@vue/composition-api";
import Ripple from "vue-ripple-directive";

import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

// import ModalTambah from "./ModalTambah.vue";
import repository from "@repofactory";
const repoMapel = repository.get("mapelRepository");
const repoKategoriSoal = repository.get("kategoriSoalRepository");

export default {
  components: {
    BSpinner,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BModal,
    VBModal,
    BForm,
    BFormGroup,
    BCardText,
    BDropdown,
    BDropdownItem,
    ToastificationContent,
    vSelect,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  setup() {
    const toast = useToast();
    const listKategoriSoal = ref([]);

    const isLoading = ref(true);
    const isSubmitting = ref(true);
    const isError = ref(false);
    const mataPelajaran = ref([]);
    const form = ref({
      kode: "",
      nama: "",
      kategori_soal_id: null,
      id: null,
      index: null,
    });

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

    const listKategoriSoalMapped = computed(() => {
      return listKategoriSoal.value.map((val) => {
        return {
          title: val.nama.toUpperCase(),
          value: parseInt(val.id),
        };
      });
    });
    ;

    const tableColumns = [
      { key: "id", label: "ID", sortable: true },
      {
        key: "kode",
        label: "Kode",
        formatter: (value, key, item) => {
          return value.toUpperCase();
        },
        sortable: true,
      },
      { key: "nama", label: "Nama", sortable: true },
      {
        key: "kategori_soal_id",
        label: "Kategori Soal",
        formatter: (value) => {
          return listKategoriSoal.value.find((val) => val.id == value).nama;
        },
        sortable: true,
      },
      { key: "actions" },
    ];

    onMounted(async () => {
      fetchData();
    });

    const getMapel = (id) => {
      const index = mataPelajaran.value.findIndex((map) => map.id == id);
      const currentMataPelajaran = mataPelajaran.value[index];


      form.value = {
        kode: currentMataPelajaran.kode,
        nama: currentMataPelajaran.nama,
        kategori_soal_id: currentMataPelajaran.kategori_soal_id,
        id: currentMataPelajaran.id,
        index,
      };

    };

    const resetModal = () => {
      form.value.kode = "";
      form.value.nama = "";
      form.value.kategori_soal_id = "";
      form.value.id = null;
      form.value.index = null;
    };

    const fetchData = async () => {
      isLoading.value = true;
      fetchKategoriSoal();
      await repoMapel
        .get()
        .then((response) => {
          isLoading.value = false;
          mataPelajaran.value = response.data.data;
        })
        .catch((error) => {
          if (error.response) {
            showToast(
              "Error",
              error.response.data.message,
              "danger",
              "AlaertTriangleIcon"
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
          isLoading.value = false;
          isError.value = true;
        });
    };

    const fetchKategoriSoal = async () => {
      isLoading.value = true;
      await repoKategoriSoal
        .get()
        .then((response) => {
          isLoading.value = false;
          listKategoriSoal.value = response.data.data;

        })
        .catch((error) => {
          if (error.response) {
            showToast(
              "Error",
              error.response.data.message,
              "danger",
              "AlaertTriangleIcon"
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
          isLoading.value = false;
          isError.value = true;
        });
    };

    const submitMapel = async () => {
      isSubmitting.value = true;

      await repoMapel
        .create({
          kategori_soal_id: form.value.kategori_soal_id,
          kode: form.value.kode,
          nama: form.value.nama,
        })
        .then((response) => {
          showToast("Notifikasi", response.data.message, "primary");
          fetchData();
          isSubmitting.value = true;
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

    const updateMapel = async () => {
      isSubmitting.value = true;

      await repoMapel
        .update(
          {
            kategori_soal_id: form.value.kategori_soal_id,
            kode: form.value.kode,
            nama: form.value.nama,
          },
          form.value.id
        )
        .then((response) => {
          showToast("Notifikasi", response.data.message, "primary");
          fetchData();

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

    const deleteMapel = async (id) => {
      isSubmitting.value = true;

      await repoMapel
        .delete(id)
        .then((response) => {
          fetchData();
          showToast("Notifikasi", response.data.message, "primary");
          resetModal();

          isSubmitting.value = false;
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

    return {
      isError,
      isLoading,
      isSubmitting,
      mataPelajaran,
      tableColumns,
      form,

      //methods
      fetchData,
      resetModal,
      listKategoriSoalMapped,
      submitMapel,
      getMapel,
      updateMapel,
      deleteMapel,
    };
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
