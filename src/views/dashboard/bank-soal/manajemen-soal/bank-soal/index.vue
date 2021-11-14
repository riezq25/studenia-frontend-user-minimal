<template>
  <div>
    <!-- Tambah To Soal -->
    <b-modal
      id="tambah-to-soal"
      size="xl"
      title="Tambah Soal"
      cancel-title="Close"
      ok-title="Simpan"
      cancel-variant="outline-secondary"
      @show="resetModal"
      @hidden="resetModal"
      @ok="submitSoal"
    >
      <b-form>
        <b-card-actions title="Pertanyaan" action-collapse>
          <quill-editor v-model="form.pertanyaan" />
        </b-card-actions>

        <b-card-actions title="Pilihan Jawaban" action-collapse>
          <b-input-group class="mb-1" prepend="A">
            <b-form-textarea rows="1" v-model="form.pilihan.a" />
          </b-input-group>

          <b-input-group class="mb-1" prepend="B">
            <b-form-textarea rows="1" v-model="form.pilihan.b" />
          </b-input-group>

          <b-input-group class="mb-1" prepend="C">
            <b-form-textarea rows="1" v-model="form.pilihan.c" />
          </b-input-group>

          <b-input-group class="mb-1" prepend="D">
            <b-form-textarea rows="1" v-model="form.pilihan.d" />
          </b-input-group>

          <b-input-group prepend="E">
            <b-form-textarea rows="1" v-model="form.pilihan.e" />
          </b-input-group>
        </b-card-actions>

        <b-card-actions title="Kategori dan Kunci Jawaban" action-collapse>
          <b-row>
            <b-col>
              <b-form-group>
                <v-select
                  v-model="form.id_mapel"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="listSoalMapped"
                  :reduce="mapel => mapel.value"
                />
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group>
                <v-select
                  v-model="form.kunci_jawaban"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="pilihanJawaban"
                  :reduce="kj => kj.title"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-card-actions>

        <b-card-actions title="Pembahasan" action-collapse>
          <quill-editor class="mb-2" v-model="form.pembahasan.text" />

          <b-input-group>
            <b-input-group-prepend is-text>
              <feather-icon icon="VideoIcon" />
            </b-input-group-prepend>
            <b-form-input
              placeholder="Masukkan link youtube pembahasan"
              v-model="form.pembahasan.video"
            />
          </b-input-group>
        </b-card-actions>
      </b-form>
    </b-modal>

    <!-- Edit To Soal -->
    <b-modal
      id="edit-to-soal"
      size="xl"
      title="Edit Soal"
      cancel-title="Close"
      ok-title="Simpan"
      cancel-variant="outline-secondary"
      @ok="editSoal"
    >
      <b-form>
        <b-card-actions title="Pertanyaan" action-collapse>
          <quill-editor v-model="form.pertanyaan" />
        </b-card-actions>

        <b-card-actions title="Pilihan Jawaban" action-collapse>
          <b-input-group class="mb-1" prepend="A">
            <b-form-textarea rows="1" v-model="form.pilihan.a" />
          </b-input-group>

          <b-input-group class="mb-1" prepend="B">
            <b-form-textarea rows="1" v-model="form.pilihan.b" />
          </b-input-group>

          <b-input-group class="mb-1" prepend="C">
            <b-form-textarea rows="1" v-model="form.pilihan.c" />
          </b-input-group>

          <b-input-group class="mb-1" prepend="D">
            <b-form-textarea rows="1" v-model="form.pilihan.d" />
          </b-input-group>

          <b-input-group prepend="E">
            <b-form-textarea rows="1" v-model="form.pilihan.e" />
          </b-input-group>
        </b-card-actions>

        <b-card-actions title="Kategori dan Kunci Jawaban" action-collapse>
          <b-row>
            <b-col>
              <b-form-group>
                <v-select
                  v-model="form.id_mapel"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="listSoalMapped"
                  :reduce="mapel => mapel.value"
                />
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group>
                <v-select
                  v-model="form.kunci_jawaban"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="pilihanJawaban"
                  :reduce="kj => kj.title"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-card-actions>

        <b-card-actions title="Pembahasan" action-collapse>
          <quill-editor class="mb-2" v-model="form.pembahasan.text" />

          <b-input-group>
            <b-input-group-prepend is-text>
              <feather-icon icon="VideoIcon" />
            </b-input-group-prepend>
            <b-form-input
              placeholder="Masukkan link youtube pembahasan"
              v-model="form.pembahasan.video"
            />
          </b-input-group>
        </b-card-actions>
      </b-form>
    </b-modal>

    <!-- Delete Try Out -->
    <b-modal
      id="hapus-to-soal"
      cancel-variant="outline-secondary"
      ok-title="Hapus"
      cancel-title="Close"
      centered
      title="Hapus Soal"
      @ok="deleteSoal(form.id_mapel)"
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
          <b-button class="mr-1" variant="primary" @click="fetchSoal">
            <feather-icon icon="RefreshCcwIcon" class="mr-50" />
            <span class="text-nowrap">Refresh Data</span>
          </b-button>

          <b-button class="mr-1" variant="primary" v-b-modal.tambah-to-soal>
            <feather-icon icon="FilePlusIcon" class="mr-50" />
            <span class="text-nowrap">Import Excel</span>
          </b-button>

          <b-button class="mr-1" variant="primary" v-b-modal.tambah-to-soal>
            <feather-icon icon="PlusCircleIcon" class="mr-50" />
            <span class="text-nowrap">Tambah Soal</span>
          </b-button>
        </div>
      </div>

      <b-table
        :busy="isLoading"
        ref="refSoalListTable"
        class="position-relative"
        :items="listSoal"
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
          <!-- <div v-html="data.item.pertanyaan"></div> -->
          <vue-mathjax :safe="false" :formula="data.item.pertanyaan"></vue-mathjax>
        </template>

        <template #cell(actions)="data">
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">
            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>

            <b-dropdown-item @click="getToSoal(data.item.id)" v-b-modal.edit-to-soal>
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item @click="getToSoal(data.item.id)" v-b-modal.hapus-to-soal>
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
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onMounted, computed } from "@vue/composition-api";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import { VueMathjax } from 'vue-mathjax'
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import repository from "@repofactory";
const repoSoal = repository.get("soalRepository");
const repoMapel = repository.get("mapelRepository");

// eslint-disable-next-line
import "quill/dist/quill.core.css";
// eslint-disable-next-line
import "quill/dist/quill.snow.css";
// eslint-disable-next-line
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
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
    BPagination,
    VueMathjax,
    BCardActions,
    vSelect,
    AppCollapse,
    AppCollapseItem,
    quillEditor,
  },
  setup() {
    const listSoal = ref([]);
    const listMapel = ref([]);
    const toast = useToast();

    const isLoading = ref(true);
    const isSubmitting = ref(false);
    const isError = ref(false);

    const form = ref({
      pertanyaan: "",
      pilihan: {
        a: "",
        b: "",
        c: "",
        d: "",
        e: "",
      },
      kunci_jawaban: "",
      id_mapel: null,
      pembahasan: {
        text: "",
        video: "",
      },
      index: null,
    });

    const listSoalMapped = computed(() => {
      return listMapel.value.map((val) => {
        return {
          title: val.nama.toUpperCase(),
          value: parseInt(val.id),
        };
      });
    });

    const content = ref("");
    const selected = ref("");

    const option = [
      { title: "Square" },
      { title: "Rectangle" },
      { title: "Rombo" },
      { title: "Romboid" },
    ];

    const tableColumns = [
      { key: "id", label: "ID", sortable: true },
      { key: "pertanyaan", label: "Pertanyaan", sortable: true },
      {
        key: "mapel_soal_id",
        label: "Mata Pelajaran",
        sortable: true,
        formatter: (value, key, item) => {
          const format = listMapel.value.find((val) => val.id == value)

          return format.nama.toUpperCase()
        },
      },
      { key: "actions" },
    ];

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

    const pilihanJawaban = [
      { title: "A" },
      { title: "B" },
      { title: "C" },
      { title: "D" },
      { title: "E" },
    ];

    const resetModal = () => {
      form.value = {
        pertanyaan: "",
        pilihan: {
          a: "",
          b: "",
          c: "",
          d: "",
          e: "",
        },
        kunci_jawaban: "",
        id_mapel: null,
        pembahasan: {
          text: "",
          video: "",
        },
        index: null,
      };
    };

    const getToSoal = (id) => {
      const index = listSoal.value.findIndex((kat) => kat.id == id);
      const currentToSoal = listSoal.value[index];
      form.value = {
        pertanyaan: currentToSoal.pertanyaan,
        pilihan: {
          a: currentToSoal.pil_a,
          b: currentToSoal.pil_b,
          c: currentToSoal.pil_c,
          d: currentToSoal.pil_d,
          e: currentToSoal.pil_e,
        },
        kunci_jawaban: currentToSoal.kunci_jawaban,
        id_mapel: currentToSoal.id,
        pembahasan: {
          text: currentToSoal.pembahasan_text,
          video: currentToSoal.pembahasan_video,
        },
        index: index,
      };

      console.log("form", form.value);
    };

    const fetchSoal = async () => {
      isLoading.value = true;
      fetchMapel();
      await repoSoal
        .get()
        .then(function (response) {
          isLoading.value = false;
          listSoal.value = response.data.data;
        })
        .catch(function (error) {
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
          isLoading.value = false;
          isError.value = true;
        });
    };

    const fetchMapel = async () => {
      isLoading.value = true;
      await repoMapel
        .get()
        .then(function (response) {
          listMapel.value = response.data.data;
        })
        .catch(function (error) {
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

    const submitSoal = async () => {
      isSubmitting.value = true;

      await repoSoal
        .create({
          mapel_soal_id: form.value.id_mapel,
          pertanyaan: form.value.pertanyaan,
          pil_a: form.value.pilihan.a,
          pil_b: form.value.pilihan.b,
          pil_c: form.value.pilihan.c,
          pil_d: form.value.pilihan.d,
          pil_e: form.value.pilihan.e,
          kunci_jawaban: form.value.kunci_jawaban,
          pembahasan_text: form.value.pembahasan.text,
          pembahasan_video: form.value.pembahasan.video,
        })
        .then((response) => {
          listSoal.value.push(response.data.data);

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

    const editSoal = async () => {
      isSubmitting.value = true;
      const currentToSoal = listSoal.value[form.value.index];
      await repoSoal
        .update(
          {
            mapel_soal_id: form.value.id_mapel,
            pertanyaan: form.value.pertanyaan,
            pil_a: form.value.pilihan.a,
            pil_b: form.value.pilihan.b,
            pil_c: form.value.pilihan.c,
            pil_d: form.value.pilihan.d,
            pil_e: form.value.pilihan.e,
            kunci_jawaban: form.value.kunci_jawaban,
            pembahasan_text: form.value.pembahasan.text,
            pembahasan_video: form.value.pembahasan.video,
          },
          currentToSoal.id
        )
        .then((response) => {
          listSoal.value[form.value.index].kunci_jawaban = response.data.data.kunci_jawaban;
          listSoal.value[form.value.index].mapel_soal_id = response.data.data.mapel_soal_id;
          listSoal.value[form.value.index].pembahasan_text = response.data.data.pembahasan_text;
          listSoal.value[form.value.index].pembahasan_video = response.data.data.pembahasan_video;
          listSoal.value[form.value.index].pertanyaan = response.data.data.pertanyaan;

          listSoal.value[form.value.index].pil_a = response.data.data.pil_a;
          listSoal.value[form.value.index].pil_b = response.data.data.pil_b;
          listSoal.value[form.value.index].pil_c = response.data.data.pil_c;
          listSoal.value[form.value.index].pil_d = response.data.data.pil_d;
          listSoal.value[form.value.index].pil_e = response.data.data.pil_e;

          listSoal.value[form.value.index].updated_at = response.data.data.updated_at;

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

    const deleteSoal = async (id) => {
      isSubmitting.value = true;

      await repoSoal
        .delete(id)
        .then((response) => {
          fetchSoal();
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

    onMounted(async () => {
      fetchSoal();
    });

    return {
      isError,
      isLoading,
      isSubmitting,
      listSoal,
      option,
      selected,
      content,
      tableColumns,
      fetchSoal,
      form,
      listSoalMapped,
      resetModal,
      submitSoal,
      editSoal,
      pilihanJawaban,
      getToSoal,
      deleteSoal,
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
