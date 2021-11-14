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
                <span class="text-nowrap">Add Kategori Tryout</span>
              </b-button>-->
              <b-button class="mr-2" variant="primary" @click="fetchData">
                <feather-icon icon="RefreshCcwIcon" class="mr-50" />
                <span class="text-nowrap">Refresh</span>
              </b-button>

              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                v-b-modal.tambah-kategori-Tryout
                variant="primary"
              >
                <feather-icon icon="PlusCircleIcon" class="mr-50" />
                <span class="text-nowrap">Tambah</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <!-- modal tambah kategori Tryout-->
      <b-modal
        id="tambah-kategori-Tryout"
        cancel-variant="outline-secondary"
        ok-title="Tambah"
        cancel-title="Cancel"
        centered
        title="Tambah Kategori Tryout"
        @show="resetModal"
        @hidden="resetModal"
        @ok="submitkategoryTryout"
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
              placeholder="Kategori Tryout"
            />
          </b-form-group>
        </b-form>
      </b-modal>

      <!-- modal edit kategori Tryout-->
      <b-modal
        id="edit-kategori-Tryout"
        cancel-variant="outline-secondary"
        ok-title="Edit"
        cancel-title="Close"
        centered
        title="Edit Kategori Tryout"
        @ok="updatekategoryTryout"
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
              placeholder="Kategori Tryout"
            />
          </b-form-group>
        </b-form>
      </b-modal>

      <!-- modal hapus kategori Tryout-->
      <b-modal
        id="hapus-kategori-Tryout"
        cancel-variant="outline-secondary"
        ok-title="Hapus"
        cancel-title="Close"
        centered
        title="Hapus Kategori Tryout"
        @ok="deletekategoryTryout(form.id)"
      >
        <b-form>
          <b-form-group>
            <p>Apakah anda akan menghapus kategori ini?</p>
          </b-form-group>
        </b-form>
      </b-modal>

      <b-table
        :busy="isLoading"
        ref="refkategoryTryoutListTable"
        class="position-relative"
        :items="kategoryTryout"
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

            <b-dropdown-item @click="getKategori(data.item.id)" v-b-modal.edit-kategori-Tryout>
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item @click="getKategori(data.item.id)" v-b-modal.hapus-kategori-Tryout>
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
const repoKategoriTryout = repository.get('kategoriTryoutRepository')

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
    const kategoryTryout = ref([])
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

      const index = kategoryTryout.value.findIndex((kat => kat.id == id))
      const currentKategori = kategoryTryout.value[index]

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
      await repoKategoriTryout.get().then(function (response) {
        isLoading.value = false

        kategoryTryout.value = response.data.data
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

    const submitkategoryTryout = async () => {
      isSubmitting.value = true

      await repoKategoriTryout.create({
        kode: form.value.kode,
        nama: form.value.nama,
      }).then((response) => {
        kategoryTryout.value.push(response.data.data)

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

    const updatekategoryTryout = async () => {
      isSubmitting.value = true

      await repoKategoriTryout.update({
        kode: form.value.kode,
        nama: form.value.nama
      }, form.value.id).then((response) => {
        const currentKategori = kategoryTryout.value[form.value.index]
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

    const deletekategoryTryout = async (id) => {
      isSubmitting.value = true

      await repoKategoriTryout.delete(id).then((response) => {
        const index = kategoryTryout.value.findIndex((kategori) => kategori.id == id)
        kategoryTryout.value.splice(index, 1)
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
      isError, isLoading, isSubmitting, kategoryTryout,
      tableColumns,
      form,

      // methods
      getKategori,
      fetchData,
      resetModal,
      submitkategoryTryout,
      updatekategoryTryout,
      deletekategoryTryout

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
