<template>
  <div class="mb-2">
    <app-collapse accordion :type="'margin'">
      <b-row>
        <b-col sm="12" md="8" lg="8">
          <b-row>
            <b-col cols="12">
              <!-- <b-card-actions :title="TESKEMAMPUAN" action-collapse>
                <app-timeline>
                  <app-timeline-item v-for="paketMapel in item.paket_mapels" :key="paketMapel" :title="paketMapel.mapel_soal.nama.toUpperCase()" icon="CircleIcon" :time="paketMapel.pivot.durasi" :soal="paketMapel.jumlah_soal" variant="primary" />
                </app-timeline>
              </b-card-actions>-->
              <b-card-actions title="TKA Saintek" action-collapse>
                <app-timeline>
                  <app-timeline-item title="Penalaran Umum" icon="CheckCircleIcon" time="12" soal="15" variant="success" jenis="TKA Saintek" mapel="Mata Pelajaran" />

                  <app-timeline-item title="Pengetahuan dan Pemahaman Umum" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

                  <app-timeline-item title="Kemampuan Memahami Bacaan & Menulis" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

                  <app-timeline-item title="Kemampuan Kuantitatif" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />

                  <app-timeline-item title="Bahasa Inggris" icon="CircleIcon" time="12" soal="15" variant="info" jenis="TKA Saintek" mapel="Mata Pelajaran" />
                </app-timeline>
              </b-card-actions>
            </b-col>
          </b-row>
        </b-col>

        <b-col sm="12" md="4" lg="4">
          <b-card-actions title="Hasil Pengerjaan" action-collapse>
            <div class="mb-2">
              <div class="d-flex flex-column text-muted mb-1">
                <small>Nama Paket</small>
                <h4>PAKET GRATIS SOSHUM</h4>
              </div>

              <div class="d-flex flex-column text-muted mb-1">
                <small>Tanggal Penilaian</small>
                <h4>2021-11-27 12:00:00</h4>
              </div>

              <div class="d-flex align-items-center mb-1">
                <p class="d-flex align-items-center text-gray">
                  <feather-icon icon="ClockIcon" size="18" class="mr-1" />
                  <span>86 Menit</span>
                </p>
                <p style="font-size:20px;" class="mx-1 text-gray">|</p>
                <p class="d-flex align-items-center text-gray">
                  <feather-icon icon="FileTextIcon" size="18" class="mr-1" />
                  <span>57 Soal</span>
                </p>
              </div>
            </div>

            <b-row class="match-height">
              <b-col cols="12">
                <div class="text-center">
                  <h5>Total Hasil Pengerjaan</h5>
                </div>
              </b-col>
              <b-col cols="6">
                <card-selesai icon="CheckIcon" statistic="50" statistic-title="Soal Benar" color="info" />
              </b-col>
              <b-col cols="6">
                <card-selesai color="warning" icon="XIcon" statistic="7" statistic-title="Soal Salah" />
              </b-col>
            </b-row>

            <!-- <div class="w-100 text-center mx-auto">
              <b-button variant="relief-success py-1 mx-auto" v-b-modal.modal-success>
                <span>Kerjakan</span>
              </b-button>
            </div>-->
          </b-card-actions>
        </b-col>
      </b-row>
    </app-collapse>

    <div class="w-100 p-0 d-sm-none fixed-bottom">
      <div>
        <b-button block variant="relief-success py-2" v-b-modal.modal-success>
          <span style="font-size:1.2rem">Kerjakan</span>
        </b-button>
      </div>
    </div>

    <b-modal id="modal-success" ok-variant="success" ok-title="Kerjakan" cancel-title="Batal" cancel-variant="outline-secondary" modal-class="modal-success" centered title="Kerjakan Soal" @ok="requestPengerjaan">
      <b-card-text>
        Sebelum mengerjakan jangan lupa untuk berdoa dan pastikan jaringan internet Anda lancar. Setelah klik kerjakan Anda harus menyelesaikan semua pengerjaan Anda dan
        <span class="text-danger fw-bolder">dilarang meninggalkan aplikasi</span>.
      </b-card-text>
    </b-modal>
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import { useRouter } from "@core/utils/utils";

import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import BCardActions from "./BCardActions.vue";
import AppTimeline from "./app-timeline/AppTimeline.vue";
import AppTimelineItem from "./app-timeline/TimeLineItem.vue";

import { BButton, BModal, VBModal, BCardText, BRow, BCol } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import router from "@/router";
import CardSelesai from "../components/CardSelesai.vue";

import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import repository from "@repofactory";
const repoTryout = repository.get("tryoutRepository");
const repoPengerjaanTryout = repository.get("pengerjaanTryoutRepository");
export default {
  components: {
    AppTimeline,
    AppTimelineItem,
    BButton,
    BModal,
    BCardText,
    AppCollapse,
    AppCollapseItem,
    BCardActions,
    BRow,
    BCol,
    useToast,
    ToastificationContent,
    CardSelesai,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  setup() {
    const { route } = useRouter();
    const toast = useToast();

    let tryout = ref({});

    const isLoading = ref(false);

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

    const fetchData = async () => {
      isLoading.value = true;
      await repoTryout
        .show(route.value.params.id)
        .then(function (response) {
          isLoading.value = false;

          tryout.value = response.data.data;
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
          // isError.value = true
        });
    };

    const requestPengerjaan = async () => {
      await repoPengerjaanTryout
        .request(route.value.params.id)
        .then(function (response) {
          redirectHalamanPengerjaan(response.data.data.id);
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
          // isLoading.value = false
          // isError.value = true
        });
    };

    const redirectHalamanPengerjaan = (id_pengerjaan) => {
      const params = route.value.params;
      router.push({
        name: "start-paket-tryout",
        params: {
          jenis: params.jenis,
          kategori: params.kategori,
          id: params.id,
          id_pengerjaan: id_pengerjaan,
        },
      });
    };

    onMounted(async () => {
      fetchData();
    });

    return {
      tryout,

      // method
      redirectHalamanPengerjaan,
      requestPengerjaan,
    };
  },
};
</script>

<style scoped>
.timeline-item[data-v-ffb3c5da]:not(:last-of-type) {
  padding-bottom: 15px !important;
}
</style>