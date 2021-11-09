<template>
  <div>
    <!-- Tambah To Soal -->
    <b-modal
      id="tambah-paket-soal"
      size="md"
      centered
      title="Tambah Paket"
      cancel-title="Close"
      ok-title="Simpan"
      cancel-variant="outline-secondary"
      @show="resetModal"
      @hidden="resetModal"
      @ok="submitPaket"
    >
      <b-form>
        <b-form-group label="Kategori Mata Pelajaran" label-for="mapel">
          <v-select
            id="mapel"
            v-model="form.mapel_soal_id"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="listMapelMapped"
            :reduce="mapel => mapel.value"
          />
        </b-form-group>
        <b-form-group label="Nama Paket" label-for="namaPaket">
          <b-form-input v-model="form.nama" id="namaPaket" placeholder="Masukkaan nama paket" />
        </b-form-group>

        <b-form-group label="File excel" label-for="fileExcel">
          <b-form-file
            id="fielExcel"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            accept=".xls, .xlsx"
            @change="handleFileUpload"
          />
        </b-form-group>
      </b-form>
    </b-modal>

    <!-- Edit To Soal -->
    <b-modal
      id="edit-paket-soal"
      size="md"
      centered
      title="Edit Paket"
      cancel-title="Close"
      ok-title="Ubah"
      cancel-variant="outline-secondary"
      @ok="editPaket"
    >
      <b-form>
        <b-form-group label="Kategori Mata Pelajaran" label-for="mapel">
          <v-select
            id="mapel"
            v-model="form.mapel_soal_id"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="listMapelMapped"
            :reduce="mapel => mapel.value"
          />
        </b-form-group>
        <b-form-group label="Nama Paket" label-for="namaPaket">
          <b-form-input v-model="form.nama" id="namaPaket" placeholder="Masukkaan nama paket" />
        </b-form-group>
      </b-form>
    </b-modal>

    <!-- Delete Try Out -->
    <b-modal
      id="hapus-paket-soal"
      cancel-variant="outline-secondary"
      ok-title="Hapus"
      cancel-title="Close"
      centered
      title="Hapus Soal"
      @ok="deletePaket(form.id)"
    >
      <b-form>
        <b-form-group>
          <p>Apakah anda akan menghapus Soal ini?</p>
        </b-form-group>
      </b-form>
    </b-modal>

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <!-- Table Top -->
        <div class="d-flex align-items-center justify-content-end">
          <!-- <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Search..." /> -->
          <b-button class="mr-1" variant="primary" @click="fetchPaket">
            <feather-icon icon="RefreshCcwIcon" class="mr-50" />
            <span class="text-nowrap">Refresh Data</span>
          </b-button>

          <b-button class="mr-1" variant="primary" v-b-modal.tambah-paket-soal>
            <feather-icon icon="PlusCircleIcon" class="mr-50" />
            <span class="text-nowrap">Tambah Soal</span>
          </b-button>
        </div>
      </div>

      <b-table
        :busy="isLoading"
        ref="refSoalListTable"
        class="position-relative"
        :items="listPaket"
        responsive
        :fields="tableColumns"
        primary-key="id"
        show-empty
        striped
        hover
        empty-text="Tidak ada data ditemukan"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle mr-1"></b-spinner>
            <strong>Sedang memuat data...</strong>
          </div>
        </template>

        <template #cell(pertanyaan)="data">
          <div v-html="data.item.pertanyaan"></div>
        </template>

        <template #cell(actions)="data">
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">
            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>

            <b-dropdown-item @click="getPaket(data.item.id)" v-b-modal.edit-paket-soal>
              <feather-icon icon="EyeIcon" />
              <span class="align-middle ml-50">Lihat Soal</span>
            </b-dropdown-item>

            <b-dropdown-item @click="getPaket(data.item.id)" v-b-modal.edit-paket-soal>
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item @click="getPaket(data.item.id)" v-b-modal.hapus-paket-soal>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <!-- <span
              class="text-muted"
            >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>-->
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <!-- <b-pagination
              v-model="currentPage"
              :total-rows="totalUsers"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
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
  </div>
</template>

<script>
import {
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
  BDropdownItem,
  BPagination,
  BForm,
  BFormGroup,
  BCardText,
  BSpinner,
  BInputGroup, BInputGroupPrepend, BInputGroupAppend, BFormFile,
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onMounted, computed } from "@vue/composition-api";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'

import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'


import repository from "@repofactory"
const repoPaket = repository.get('paketMapelRepository')
const repoMapel = repository.get('mapelRepository')


export default {
  components: {
    BInputGroup, BInputGroupPrepend, BInputGroupAppend,
    BSpinner,
    BForm,
    BFormGroup,
    BCard,
    BCardText,
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
    BDropdownItem,
    BPagination, BCardActions, BFormFile,

    vSelect,
    AppCollapse,
    AppCollapseItem,
  },
  setup() {
    const listPaket = ref([])
    const listMapel = ref([])
    const toast = useToast()

    const isLoading = ref(true)
    const isSubmitting = ref(false)
    const isError = ref(false)

    const form = ref({
      id: null,
      nama: "",
      mapel_soal_id: null,
      index: null,
      excel: null
    })

    const tableColumns = [
      { key: "id", label: "ID", sortable: true },
      { key: "nama", label: "Nama Paket", sortable: true, formatter: (value, key, item) => value.toUpperCase() },
      {
        key: "mapel_soal_id", label: "Mata Pelajaran", sortable: true, formatter: (value, key, item) => listMapel.value.find((val) => val.id == value).nama.toUpperCase(),
      },
      {
        key: "soals_count", label: "Butir Soal", sortable: true,
      },
      { key: "actions" },
    ];

    const showToast = (title, text, variant, icon = 'BellIcon') => {
      toast({
        component: ToastificationContent,
        props: {
          title,
          icon,
          text,
          variant,
        },
      })
    }

    const resetModal = () => {
      form.value = {
        id: null,
        nama: "",
        mapel_soal_id: null,
        index: null,
        excel: null
      }
    }

    const fetchPaket = async () => {
      isLoading.value = true
      fetchMapel()
      await repoPaket.get().then(function (response) {
        isLoading.value = false
        listPaket.value = response.data.data
      })
        .catch(function (error) {
          if (error.response) {
            showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
          } else if (error.request) {
            showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
          } else {
            showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
          }
          isLoading.value = false
          isError.value = true
        });
    }

    const listMapelMapped = computed(() => {
      return listMapel.value.map((val) => {
        return {
          title: val.nama.toUpperCase(),
          value: parseInt(val.id),
        }
      })
    })

    const getPaket = (id) => {

      const index = listPaket.value.findIndex((paket => paket.id == id))
      const currPaket = listPaket.value[index]
      form.value = {
        id: currPaket.id,
        nama: currPaket.nama,
        mapel_soal_id: currPaket.mapel_soal_id,
        index: index,
        excel: null
      }
    }

    const fetchMapel = async () => {
      isLoading.value = true
      await repoMapel.get().then(function (response) {
        listMapel.value = response.data.data
      })
        .catch(function (error) {
          if (error.response) {
            showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
          } else if (error.request) {
            showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
          } else {
            showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
          }
        });
    }

    const submitPaket = async () => {
      isSubmitting.value = true

      let formData = new FormData();
      formData.append('excel', form.value.excel);
      formData.append('nama', form.value.nama);
      formData.append('mapel_soal_id', form.value.mapel_soal_id);

      console.log(formData)


      await repoPaket.create(formData).then((response) => {
        listPaket.value.push(response.data.data)

        showToast('Notifikasi', response.data.message, 'primary')

        isSubmitting.value = false
        resetModal()
      }).catch((error) => {
        if (error.response) {
          showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
        } else if (error.request) {
          showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
        } else {
          showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
        }
        isSubmitting.value = false
        resetModal()
      })
    }

    const editPaket = async () => {
      isSubmitting.value = true

      await repoPaket.update({
        mapel_soal_id: form.value.mapel_soal_id,
        nama: form.value.nama
      }, form.value.id).then((response) => {
        const currPaket = listPaket.value[form.value.index]
        currPaket.nama = response.data.data.nama
        currPaket.mapel_soal_id = response.data.data.mapel_soal_id
        currPaket.soals_count = response.data.data.soals_count
        currPaket.created_at = response.data.data.created_at
        currPaket.updated_at = response.data.data.updated_at
        showToast('Notifikasi', response.data.message, 'primary')

        isSubmitting.value = false
        resetModal()
      }).catch((error) => {
        if (error.response) {
          showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
        } else if (error.request) {
          showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
        } else {
          showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
        }
        isSubmitting.value = false
        resetModal()
      })
    }

    const deletePaket = async (id) => {
      isSubmitting.value = true

      await repoPaket.delete(id).then((response) => {
        listPaket.value.splice(form.value.index, 1)

        showToast('Notifikasi', response.data.message, 'primary')
        resetModal()

        isSubmitting.value = false
      }).catch((error) => {
        if (error.response) {
          showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
        } else if (error.request) {
          showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
        } else {
          showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
        }
        isSubmitting.value = false
        resetModal()

      })
    }

    const handleFileUpload = (event) => {
      form.value.excel = event.target.files[0];
    };

    onMounted(async () => {
      fetchPaket()
    })


    return {
      isError, isLoading, isSubmitting, listPaket,
      tableColumns,
      fetchPaket,
      form,
      resetModal,
      submitPaket,
      editPaket,
      listMapelMapped,
      deletePaket,
      handleFileUpload,
      getPaket

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
