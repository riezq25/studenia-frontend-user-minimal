<template>
  <div>
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

              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                v-b-modal.tambah-kategori-soal
                variant="primary"
              >
                <span class="text-nowrap">Tambah Kategori Soal</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <!-- modal tambah kategori soal-->
      <b-modal
        id="tambah-kategori-soal"
        cancel-variant="outline-secondary"
        ok-title="Tambah"
        cancel-title="Cancel"
        centered
        title="Tambah Kategori Soal"
        @show="resetModal"
        @hidden="resetModal"
        @ok="submitKategoriSoal"
      >
        <b-form>
          <b-form-group>
            <label for="kode-kategori">Kode Kategori</label>
            <b-form-input
              v-model="form.kode"
              id="kode-kategori"
              type="text"
              placeholder="Nama singkatan kategori"
            />
          </b-form-group>
          <b-form-group>
            <label for="nama-kategori">Nama Kategori</label>
            <b-form-input
              v-model="form.nama"
              id="nama-kategori"
              type="text"
              placeholder="Kategori Soal"
            />
          </b-form-group>
        </b-form>
      </b-modal>

      <!-- modal edit kategori soal-->
      <b-modal
        id="edit-kategori-soal"
        cancel-variant="outline-secondary"
        ok-title="Edit"
        cancel-title="Close"
        centered
        title="Edit Kategori Soal"
        @ok="updateKategoriSoal"
      >
        <b-form>
          <b-form-group>
            <label for="kode-kategori">Kode Kategori</label>
            <b-form-input
              v-model="form.kode"
              id="kode-kategori"
              type="text"
              placeholder="Nama singkatan kategori"
            />
          </b-form-group>
          <b-form-group>
            <label for="nama-kategori">Nama Kategori</label>
            <b-form-input
              v-model="form.nama"
              id="nama-kategori"
              type="text"
              placeholder="Kategori Soal"
            />
          </b-form-group>
        </b-form>
      </b-modal>

      <!-- modal hapus kategori soal-->
      <b-modal
        id="hapus-kategori-soal"
        cancel-variant="outline-secondary"
        ok-title="Hapus"
        cancel-title="Close"
        centered
        title="Hapus Kategori Soal"
        @ok="deleteKategoriSoal(form.id)"
      >
        <b-form>
          <b-form-group>
            <p>Apakah anda akan menghapus kategori ini?</p>
          </b-form-group>
        </b-form>
      </b-modal>

      <b-table
        :busy="isLoading"
        ref="refKategoriSoalListTable"
        class="position-relative"
        :items="kategoriSoal"
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

        <template #cell(actions)="data">
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">
            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>

            <b-dropdown-item @click="getKategori(data.item.id)" v-b-modal.edit-kategori-soal>
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item @click="getKategori(data.item.id)" v-b-modal.hapus-kategori-soal>
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
  BSpinner
} from "bootstrap-vue";
// import store from "@/store";
import { ref, onMounted } from "@vue/composition-api";

import Ripple from "vue-ripple-directive";

import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import repository from "@repofactory"
const repoKategoriSoal = repository.get('kategoriSoalRepository')

export default {
  components: {
    
    // ModalTambah,
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
    BCardText, BDropdown,
    BDropdownItem,
    ToastificationContent,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  setup() {
    const toast = useToast()

    const isLoading = ref(true)
    const isSubmitting = ref(false)
    const isError = ref(false)
    const kategoriSoal = ref([])
    const form = ref({
      kode: '',
      nama: '',
      id: null,
      index: null
    })
    const tableColumns = [
      {
        key: 'id',
        label: 'ID',
        sortable: true
      }, {
        key: 'kode',
        label: 'Kode Kategori',
        formatter: (value, key, item) => {
          return value.toUpperCase()
        },
        sortable: true
      },
      {
        key: 'nama',
        label: 'Nama Kategori',
        sortable: true
      },
      {
        key: 'actions'
      }
    ];

    onMounted(async () => {
      fetchData()
    })

    const getKategori = (id) => {

      const index = kategoriSoal.value.findIndex((kat => kat.id == id))
      const currentKategori = kategoriSoal.value[index]

      form.value = {
        kode: currentKategori.kode,
        nama: currentKategori.nama,
        id: currentKategori.id,
        index
      }
    }

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
      form.value.kode = ''
      form.value.nama = ''
      form.value.id = null
      form.value.index = null
    }

    const fetchData = async () => {
      isLoading.value = true
      await repoKategoriSoal.get().then(function (response) {
        isLoading.value = false

        kategoriSoal.value = response.data.data
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

    const submitKategoriSoal = async () => {
      isSubmitting.value = true

      await repoKategoriSoal.create({
        kode: form.value.kode,
        nama: form.value.nama,
      }).then((response) => {
        kategoriSoal.value.push(response.data.data)

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

    const updateKategoriSoal = async () => {
      isSubmitting.value = true

      await repoKategoriSoal.update({
        kode: form.value.kode,
        nama: form.value.nama
      }, form.value.id).then((response) => {
        const currentKategori = kategoriSoal.value[form.value.index]
        currentKategori.kode = response.data.data.kode
        currentKategori.nama = response.data.data.nama

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

    const deleteKategoriSoal = async (id) => {
      isSubmitting.value = true

      await repoKategoriSoal.delete(id).then((response) => {
        const index = kategoriSoal.value.findIndex((kategori) => kategori.id == id)
        kategoriSoal.value.splice(index, 1)
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

    return {
      isError, isLoading, isSubmitting, kategoriSoal,
      tableColumns,
      form,

      // methods
      getKategori,
      fetchData,
      resetModal,
      submitKategoriSoal,
      updateKategoriSoal,
      deleteKategoriSoal

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
