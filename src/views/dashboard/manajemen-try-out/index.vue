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
        size="lg"
        title="Tambah Paket Tryout"
        @show="resetModal"
        @hidden="resetModal"
        @ok="(e) => handleOk(e, 'store')"
      >
        <b-form>
          <b-overlay :show="isSubmitting" rounded="sm">
            <b-card-actions title="Informasi Paket" action-collapse>
              <b-form-group>
                <label for="nama">Nama</label>
                <b-form-input
                  for="nama"
                  v-model.trim="form.nama"
                  type="text"
                  placeholder="Nama paket tryout"
                />
              </b-form-group>

              <!-- <b-row>
                <b-col sm="12" md="6">
                  <b-form-group>
                    <label for="kategori">Kategori</label>
                    <v-select
                      id="kategori"
                      v-model="form.kategori_tryout_id"
                      :reduce="kategori => kategori.id"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="title"
                      :options="listKategoriTryout"
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6">
                  <b-form-group>
                    <label for="jenis">Jenis</label>
                    <v-select
                      id="jenis"
                      v-model="form.jenis"
                      :reduce="jenis => jenis.value"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      label="title"
                      :options="listJenisTryout"
                    />
                  </b-form-group>
                </b-col>
              </b-row>-->

              <b-row>
                <b-col sm="12" md="9">
                  <b-form-group>
                    <label for="harga">Harga</label>
                    <b-form-input
                      id="harga"
                      v-model.number="form.harga"
                      type="number"
                      placeholder="Harga"
                      min="0"
                      step="1000"
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="3">
                  <b-form-group>
                    <label for="show">Tampilkan</label>
                    <b-form-checkbox
                      id="show"
                      :checked="form.show"
                      v-model="form.show"
                      class="custom-control-primary"
                      name="check-button"
                      switch
                    />
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="12" md="6">
                  <b-form-group>
                    <label for="tanggal-ujian">Tanggal Ujian</label>
                    <flat-pickr
                      id="tanggal-ujian"
                      v-model="form.tanggal_ujian"
                      class="form-control"
                      :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                    />
                  </b-form-group>
                </b-col>
                <b-col sm="12" md="6">
                  <b-form-group>
                    <label for="tanggal-penilaian">Tanggal Penilaian</label>
                    <flat-pickr
                      id="tanggal-penilaian"
                      v-model="form.tanggal_penilaian"
                      class="form-control"
                      :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card-actions>

            <b-card-actions title="List Paket Mapel" action-collapse>
              <div class="d-flex align-items-center justify-content-end mb-1">
                <b-button variant="outline-primary" @click="tambahPaketMapel">
                  <feather-icon icon="PlusCircleIcon" class="mr-50" />
                  <span class="text-nowrap">Tambah Paket Mapel</span>
                </b-button>
              </div>

              <draggable tag="ul" :list="form.paket_mapels" class="list-group" handle=".handle">
                <li
                  class="list-group-item d-flex align-items-center"
                  v-for="(element, idx) in form.paket_mapels"
                  :key="idx"
                >
                  <feather-icon icon="MenuIcon" class="mr-1 handle button" />

                  <div class="w-100">
                    <b-row class="w-100">
                      <b-col>
                        <b-form-group label="Paket Mapel" label-for="paket-mapel">
                          <v-select
                            id="paket-mapel"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            label="title"
                            :options="listPaketMapel"
                            v-model="element.paket_mapel"
                            @option:selected="setSelectedPaketMapel(idx)"
                          >
                            <template #option="{ title, jumlah }">
                              <div class="d-flex justify-content-between pr-2">
                                <span>{{ title }}</span>
                                <span>{{ jumlah }}</span>
                              </div>
                            </template>
                          </v-select>
                        </b-form-group>
                      </b-col>
                      <b-col cols="3">
                        <b-form-group label="Durasi" label-for="durasi">
                          <b-form-input
                            id="durasi"
                            type="number"
                            min="0"
                            step="0.1"
                            v-model.number="element.durasi"
                          />
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row class="w-100">
                      <b-col>
                        <b-form-group label="Kategori/ Mapel" label-for="kategori-mapel">
                          <b-form-input
                            id="kategori-mapel"
                            disabled
                            v-model="element.kategori_mapel"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col cols="3">
                        <b-form-group label="Jumlah Soal" label-for="jumlah-soal">
                          <b-form-input id="jumlah-soal" disabled v-model="element.jumlah" />
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </div>

                  <!-- <input type="text" class="form-control" v-model="element.text" /> -->
                  <feather-icon icon="XIcon" class="ml-1" @click="removePaketMapel(idx)" />
                </li>
              </draggable>
            </b-card-actions>
          </b-overlay>
        </b-form>
      </b-modal>

      <!-- modal edit kategori Tryout-->
      <!-- <b-modal
        id="edit-kategori-Tryout"
        cancel-variant="outline-secondary"
        ok-title="Edit"
        cancel-title="Close"
        centered
        title="Edit Kategori Tryout"
        @ok="updatekategoryTryout"
      >
        <b-form>
          <b-card-actions title="Informasi Paket" action-collapse>
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
              <label for="show">Nama Kategori</label>
              <b-form-input
                v-model="form.nama"
                id="show"
                type="text"
                placeholder="Kategori Tryout"
              />
            </b-form-group>
          </b-card-actions>

          <b-card-actions title="List Paket Mapel" action-collapse></b-card-actions>
        </b-form>
      </b-modal>-->

      <!-- modal hapus kategori Tryout-->
      <!-- <b-modal
        id="hapus-paket-tryout"
        cancel-variant="outline-secondary"
        ok-title="Hapus"
        cancel-title="Close"
        centered
        title="Hapus"
        @show="resetModal"
        @hidden="resetModal"
        @ok="deletePaketTryout(listPaketTryout[currentPaketIndex].id)"
      >
        <b-form>
          <b-overlay :show="isSubmitting" rounded="sm">
            <b-form-group>
              <p>Apakah anda yakin ingin menghapus?</p>
            </b-form-group>
          </b-overlay>
        </b-form>
      </b-modal>-->

      <!-- modal lihat paket Tryout-->
      <b-modal
        id="lihat-kategori-Tryout"
        cancel-variant="outline-secondary"
        cancel-title="Cancel"
        centered
        size="lg"
        title="Lihat Kategori Tryout"
      >
        <b-form>
          <ul class="list-group">
            <li
              class="list-group-item d-flex align-items-center"
              v-for="(element, idx) in form.paket_mapels"
              :key="idx"
            >
              <div class="w-100">
                <b-row class="w-100">
                  <b-col>
                    <b-form-group label="Paket Mapel" label-for="paket-mapel">
                      <b-form-input
                        id="paket-mapel"
                        type="text"
                        v-model.number="element.nama"
                        disabled
                      />
                    </b-form-group>
                  </b-col>
                  <b-col cols="2">
                    <b-form-group label="Durasi" label-for="durasi">
                      <b-form-input
                        id="durasi"
                        type="number"
                        v-model.number="element.pivot.durasi"
                        disabled
                      />
                    </b-form-group>
                  </b-col>
                  <b-col cols="1" class="col align-self-center">
                    <b-button variant="outline-primary" class="btn-icon rounded-circle" :to="{name: 'manajemen-paket-detail', params:{id:element.id}}">
                      <feather-icon icon="EyeIcon" />
                    </b-button>
                  </b-col>
                </b-row>
                <!-- <b-row class="w-100">
                  <b-col>
                    <b-form-group label="Kategori/ Mapel" label-for="kategori-mapel">
                      <b-form-input id="kategori-mapel" disabled v-model="element.kategori_mapel" />
                    </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <b-form-group label="Jumlah Soal" label-for="jumlah-soal">
                      <b-form-input id="jumlah-soal" disabled v-model="element.jumlah" />
                    </b-form-group>
                  </b-col>
                </b-row>-->
              </div>
            </li>
          </ul>
        </b-form>
      </b-modal>

      <b-table
        :busy="isLoading"
        class="position-relative"
        :items="listPaketTryout"
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

            <b-dropdown-item @click="show(data.item.id)" v-b-modal.lihat-kategori-Tryout>
              <feather-icon icon="EyeIcon" />
              <span class="align-middle ml-50">Lihat Paket</span>
            </b-dropdown-item>

            <!-- <b-dropdown-item @click="setRowIndex(data.item)" v-b-modal.edit-kategori-Tryout>
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item @click="setRowIndex(data.item)" v-b-modal.hapus-paket-tryout>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>-->
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
  BListGroupItem,
  BDropdown,
  BDropdownItem,
  BSpinner, BFormCheckbox, BOverlay
} from "bootstrap-vue";
// import store from "@/store";
import { ref, onMounted, } from "@vue/composition-api";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import flatPickr from 'vue-flatpickr-component'
import Ripple from "vue-ripple-directive";

import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import draggable from 'vuedraggable'
import vSelect from 'vue-select'
import { useRouter } from "@core/utils/utils";

import repository from "@repofactory"
const repoKategoriTryout = repository.get('kategoriTryoutRepository')
const repoPaketMapel = repository.get("paketMapelRepository");
const repoPaketTryout = repository.get("paketTryoutRepository");

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
    BModal, BFormCheckbox,
    VBModal,
    BForm,
    BFormGroup,
    BCardText, BDropdown, flatPickr,
    BDropdownItem,
    ToastificationContent,
    BCardActions, draggable, BListGroupItem, vSelect, BOverlay

  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  setup() {
    const toast = useToast()
    const { route } = useRouter()

    const isLoading = ref(true)
    const isSubmitting = ref(false)
    const isError = ref(false)
    const kategoryTryout = ref([])
    const listPaketTryout = ref([])
    const currentPaketIndex = ref(null)
    const form = ref({
      id: null,
      nama: '',
      kategori_tryout_id: null,
      jenis: '',
      harga: 0,
      pg: 0,
      show: true,
      tanggal_ujian: '',
      tanggal_penilaian: '',
      is_closed: false,
      paket_mapels: [
      ]
    })


    const listPaketMapel = ref([])
    const listKategoriTryout = ref([])
    const listJenisTryout = ref([
      {
        title: "PREMIUM",
        value: "PREMIUM"
      }, {
        title: "GRATIS",
        value: "GRATIS"
      },
    ])

    const tableColumns = [
      {
        key: 'id',
        label: 'ID',
        sortable: true
      },
      // {
      //   key: 'kode',
      //   label: 'Kode Kategori',
      //   formatter: (value, key, item) => {
      //     return value.toUpperCase()
      //   },
      //   sortable: true
      // },
      {
        key: 'nama',
        label: 'Nama Paket',
        formatter: (value, key, item) => {
          return value.toUpperCase()
        },
        sortable: true
      },
      {
        key: 'tanggal_ujian',
        label: 'Tanggal Ujian',
        sortable: true
      },
      {
        key: 'tanggal_penilaian',
        label: 'Tanggal Penilaian',
        sortable: true
      },

      {
        key: 'actions'
      }
    ];

    onMounted(async () => {
      fetchData()
    })

    const handleOk = (e, method) => {
      e.preventDefault()
      switch (method) {
        case 'store':
          submitPaketTryout()
          break;

        case 'destroy':
          deletePaketTryout(listPaketTryout.value[currentPaketIndex.value].id)
          break;

        default:
          showToast('Error', `Method ${method} tidak tersedia.`, 'warning', 'AlertTriangleIcon')
          break;
      }

    }

    const setRowIndex = (item) => {
      currentPaketIndex.value = listPaketTryout.value.findIndex((paket => paket.id == item.id))
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
      form.value = {
        id: null,
        nama: '',
        kategori_tryout_id: null,
        jenis: '',
        harga: 0,
        pg: 0,
        show: true,
        tanggal_ujian: '',
        tanggal_penilaian: '',
        is_closed: false,
        paket_mapels: [
        ]
      }
    }

    const tambahPaketMapel = () => {
      form.value.paket_mapels.push({
        paket_mapel: null,
        durasi: 0,
        kategori_mapel: '',
        jumlah: 0,
      })
    }

    const removePaketMapel = (idx) => {
      const current = form.value.paket_mapels
      current.splice(idx, 1);
    }

    const setSelectedPaketMapel = (idx) => {
      const current = form.value.paket_mapels[idx]
      const paket = current.paket_mapel

      current.kategori_mapel = paket.kategori_mapel
      current.jumlah = paket.jumlah
      current.id = paket.id

    }

    const fetchData = async () => {
      isLoading.value = true
      fetchPaketMapel();
      fetchKategoriTryout()

      await repoPaketTryout.get().then(function (response) {
        isLoading.value = false

        listPaketTryout.value = response.data.data.filter((v) => {
          return v.jenis == route.value.meta.tryout.jenis.toUpperCase() && v.kategori_tryout.kode == route.value.meta.tryout.kategori.toUpperCase()
        })
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

    const show = async (id) => {
      await repoPaketTryout.show(id).then(function (response) {
        form.value.paket_mapels = response.data.data.paket_mapels
      })
        .catch(function (error) {
          if (error.response) {
            showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
          } else if (error.request) {
            showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
          } else {
            showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
          }
          isError.value = true
        });
    }

    const fetchPaketMapel = async () => {
      await repoPaketMapel.get().then(function (response) {
        listPaketMapel.value = response.data.data.map((val) => {
          return {
            id: val.id,
            title: val.nama.toUpperCase(),
            jumlah: val.soals_count,
            kategori_mapel: val.mapel_soal.kategori_soal.kode.toUpperCase() + '/' + val.mapel_soal.nama.toUpperCase(),
          }
        })
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

    const fetchKategoriTryout = async () => {
      await repoKategoriTryout.get().then(function (response) {
        listKategoriTryout.value = response.data.data.map((val) => {
          return {
            id: val.id,
            title: val.nama.toUpperCase(),
            kode: val.kode.toUpperCase(),
          }
        })
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

    const submitPaketTryout = async () => {
      isSubmitting.value = true
      form.value.jenis = route.value.meta.tryout.jenis.toUpperCase()
      form.value.kategori_tryout_id = listKategoriTryout.value.find(e => e.kode.toUpperCase() == route.value.meta.tryout.kategori.toUpperCase()).id
      const data = {
        nama: form.value.nama,
        kategori_tryout_id: form.value.kategori_tryout_id,
        jenis: form.value.jenis,
        harga: form.value.harga,
        show: form.value.show,
        tgl_ujian: form.value.tanggal_ujian,
        tgl_penilaian: form.value.tanggal_penilaian,
        paket_mapels: form.value.paket_mapels,
      }

      await repoPaketTryout.create(form.value).then((response) => {
        listPaketTryout.value.push(response.data.data)

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
      })
    }

    const updatekategoryTryout = async () => {
      isSubmitting.value = true

      await repoKategoriTryout.update({
        kode: form.value.kode,
        nama: form.value.nama
      }, form.value.id).then((response) => {
        const currentKategori = kategoryTryout.value[currentPaketIndex.value]
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

    const deletePaketTryout = async (id) => {
      isSubmitting.value = true

      await repoPaketTryout.delete(id).then((response) => {
        listPaketTryout.value.splice(currentPaketIndex.value, 1)
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

    fetchData()

    return {
      isError, isLoading, isSubmitting, kategoryTryout,
      tableColumns,
      form,
      listPaketMapel, listKategoriTryout, listJenisTryout, listPaketTryout, currentPaketIndex,
      // methods
      setRowIndex,
      fetchData,
      resetModal,
      submitPaketTryout,
      updatekategoryTryout,
      deletePaketTryout,
      tambahPaketMapel,
      setSelectedPaketMapel, removePaketMapel, handleOk, show

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
