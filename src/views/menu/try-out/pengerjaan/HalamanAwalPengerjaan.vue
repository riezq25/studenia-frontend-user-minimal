<template>
  <div class="mb-2" v-if="!isLoading">
    <div v-if="isDone">
      <b-card class="text-center">
        <b-card-text>
          <feather-icon width="100" icon="CheckCircleIcon" />
          <h3 class="text-primary">Selamat Anda sudah menyelesaikan tryout ini.</h3>
          <span>Hasil, Nilai, Rangking dan Pembahasan dapat diakses pada tanggal {{ tanggalPenilaian }}</span>
        </b-card-text>
        <b-button to="/" variant="primary">Kembali</b-button>
      </b-card>
    </div>

    <div v-else>
      <b-alert variant="primary" show>
        <div class="alert-body">
          <span>
            Silahkan kerjakan paket soal berikut. Paket soal bisa dikerjakan secara acak.
            <strong>Jangan meninggalkan aplikasi</strong> sebelum klik akhiri sesi ujian.
          </span>
        </div>
      </b-alert>

      <b-row>
        <b-col class="d-block d-md-none" cols="12" md="4">
          <app-collapse accordion :type="'margin'">
            <b-card-actions title="Sisa Waktu" action-collapse>
              <div class="mx-auto w-100 text-center">
                <span
                  class="display-2 text-center mx-auto text-primary display-2 fw-bold"
                >{{ formatTime(sisaWaktu) }}</span>
              </div>
            </b-card-actions>
          </app-collapse>
        </b-col>

        <b-col cols="12" md="8">
          <div v-if="!isLoading">
            <app-collapse
              accordion
              :type="'margin'"
              v-for="(item, index_paket_kategori) in tryout.pengerjaan.paket"
              :key="item.id"
            >
              <b-card-actions :title="item.kategori.nama.toUpperCase()" action-collapse>
                <app-timeline>
                  <app-timeline-item
                    :icon="paketMapel.is_done ? 'CheckCircleIcon' : 'XCircleIcon'"
                    :variant="paketMapel.is_done ? 'success' : 'danger'"
                    v-for="(paketMapel, index_paket_mapel) in item.paket_mapels "
                    :key="paketMapel.id"
                  >
                    <div>
                      <h4>{{ paketMapel.mapel.nama.toUpperCase() }}</h4>
                      <div class="d-flex align-items-center" style="margin-top:8px">
                        <p class="d-flex align-items-center text-gray">
                          <feather-icon icon="ClockIcon" size="18" style="margin-right:5px" />
                          <span>{{ paketMapel.durasi }} Menit</span>
                        </p>
                        <p style="font-size:20px;" class="mx-1 text-gray">|</p>
                        <p class="d-flex align-items-center text-gray">
                          <feather-icon icon="FileTextIcon" size="18" style="margin-right:5px" />
                          <span>{{ paketMapel.soals.length }} Soal</span>
                        </p>
                      </div>

                      <b-button
                        v-if="!paketMapel.is_done"
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        :variant="paketMapel.is_done ? 'outline-success' : 'outline-primary'"
                        :disabled="paketMapel.is_done"
                        @click="redirectHalamanPengerjaan(index_paket_kategori, index_paket_mapel)"
                      >Kerjakan</b-button>

                      <b-badge v-else variant="success">
                        <feather-icon icon="CheckCircleIcon" class="mr-25" />
                        <span>Sudah dikerjakan</span>
                      </b-badge>
                    </div>
                  </app-timeline-item>
                </app-timeline>
              </b-card-actions>
            </app-collapse>
          </div>
        </b-col>

        <b-col class="d-block d-md-none" cols="12" md="4">
          <app-collapse accordion :type="'margin'">
            <b-card-actions title="Akhiri Sesi" action-collapse>
              <div class="mx-auto w-100 text-center">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  v-b-modal.modal-danger
                >Akhiri Sesi</b-button>
              </div>
            </b-card-actions>
          </app-collapse>
        </b-col>

        <b-col class="d-none d-md-block" cols="12" md="4">
          <app-collapse accordion :type="'margin'">
            <b-card-actions title="Sisa Waktu" action-collapse>
              <div class="mx-auto w-100 text-center">
                <span
                  class="display-2 text-center mx-auto text-primary display-2 fw-bold"
                >{{ formatTime(sisaWaktu) }}</span>
              </div>
            </b-card-actions>
          </app-collapse>

          <app-collapse accordion :type="'margin'">
            <b-card-actions title="Akhiri Sesi" action-collapse>
              <div class="mx-auto w-100 text-center">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  v-b-modal.modal-danger
                >Akhiri Sesi</b-button>
              </div>
            </b-card-actions>
          </app-collapse>
        </b-col>
      </b-row>

      <b-modal
        id="modal-danger"
        ok-variant="danger"
        ok-title="Yakin"
        cancel-title="Batal"
        modal-class="modal-danger"
        centered
        title="Danger Modal"
        @ok="akhiriSesi"
      >
        <b-card-text class="text-center text-danger">
          <feather-icon icon="AlertTriangleIcon" size="50" />
          <h4
            class="mt-1"
          >Apakah Anda yakin ingin menyimpan semua jawaban dan mengakhiri sesi tryout?</h4>
        </b-card-text>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "@vue/composition-api";
import { useRouter } from "@core/utils/utils";
import store from "@/store/index";
const { DateTime } = require("luxon");

import repository from "@repofactory";
const repoTryout = repository.get("tryoutRepository");
const repoPengerjaanTryout = repository.get("pengerjaanTryoutRepository");

import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import AppTimeline from "@core/components/app-timeline/AppTimeline.vue";
import AppTimelineItem from "@core/components/app-timeline/TimeLineItem.vue";
import {
  BBadge,
  BButton,
  BModal,
  VBModal,
  BCardText,
  BRow,
  BCol,
  BAlert, BCard, BLink
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import router from "@/router";

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
    BAlert,
    BBadge, BCard, BLink
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  setup() {
    const { route } = useRouter();

    let tryout = ref(null);
    const isLoading = ref(true);
    const isDone = ref(false);
    const sisaWaktu = ref(0);
    const countDown = ref(null);
    const tanggalPenilaian = ref(null);

    const formatTime = (seconds) => {
      let m = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0"),
        s = Math.floor(seconds % 60)
          .toString()
          .padStart(2, "0");

      return `${m}:${s}`;
    };

    const fetchData = async () => {
      isLoading.value = true;
      if (
        store.state.tryout.data &&
        route.value.params.id_pengerjaan == store.state.tryout.data.id
      ) {
        tryout.value = store.state.tryout.data;
        tanggalPenilaian.value = tryout.value.tanggal_penilaian;
        isLoading.value = false;
      } else {
        await repoPengerjaanTryout
          .kerjakan(route.value.params.id_pengerjaan)
          .then(function (response) {
            isLoading.value = false;

            store.state.tryout.isUjian = true;
            store.state.tryout.data = response.data.data;

            let selisih = (Date.parse(response.data.data.server_time) / 1000) - (Math.floor(Date.now() / 1000))
            store.commit("tryout/setSelisihWaktu", selisih);
            store.commit("tryout/setWaktuSelesaiTryout", Date.parse(response.data.data.selesai) / 1000);

            tryout.value = response.data.data;
            tanggalPenilaian.value = tryout.value.tanggal_penilaian;
            sisaWaktu.value = response.data.data.durasi * 60 * 1000;
          })
          .catch(function (error) {
            if (error.response) {
              // showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
            } else if (error.request) {
              // showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
            } else {
              // showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
            }
            isLoading.value = false;
            // isError.value = true
          });
      }
    };

    const redirectHalamanPengerjaan = (
      index_paket_kategori,
      index_paket_mapel
    ) => {
      const params = route.value.params;
      redirectHalamanPaket
      router.push({
        name: "ujian-paket-tryout",
        params: {
          jenis: params.jenis,
          kategori: params.kategori,
          id: params.id,
          id_pengerjaan: params.id_pengerjaan,
          index_paket_kategori: index_paket_kategori,
          index_paket_mapel: index_paket_mapel,
        },
      });
    };

    const redirectHalamanPaket = (index_paket_kategori, index_paket_mapel) => {
      clearInterval(countDown.value);

      const params = route.value.params;
      router.push({
        path: "/try-out/:jenis/:kategori",
        params: { jenis: params.jenis, kategori: params.kategori },
      });
    };

    const akhiriSesi = async () => {
      const params = route.value.params;
      const current = store.state.tryout.data.pengerjaan.paket

      let data = current.map(val => {
        let paketMapels = val.paket_mapels.map(mapel => {

          let soals = mapel.soals.map(soal => {
            return {
              id: soal.id,
              jawaban: soal.jawaban,
              ragu: soal.ragu,
              waktu: soal.waktu,
            }
          })

          return {
            id: mapel.id,
            finished_at: mapel.finished_at,
            is_done: mapel.is_done,
            start_at: mapel.start_at,
            waktu: mapel.waktu,
            soals
          }
        })

        return {
          id: val.id,
          paket_mapels: paketMapels
        }
      })

      await repoPengerjaanTryout
        .akhiriSesi(params.id_pengerjaan, {
          pengerjaan: data,
        })
        .then(function (response) {
          // redirectHalamanPaket()
          clearInterval(countDown.value);
          store.commit("tryout/clearState");

          isDone.value = true

          // router.push("/");
        })
        .catch(function (error) {
          if (error.response) {
            // showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
          } else if (error.request) {
            // showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
          } else {
            // showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
          }
          isLoading.value = false;
          // isError.value = true
        });
    };

    onMounted(() => {
      fetchData().then(() => {
        let selisih = store.state.tryout.selisihWaktu
        countDown.value = setInterval(() => {
          sisaWaktu.value =
            store.state.tryout.waktuSelesaiTryout -
            Math.floor((Date.now() / 1000) + selisih);

          if (sisaWaktu.value < 1) {
            akhiriSesi();
          }

        }, 1000);
      });
    });

    return {
      tryout,
      isLoading,
      sisaWaktu, isDone, tanggalPenilaian,

      // method
      redirectHalamanPengerjaan,
      akhiriSesi,
      formatTime,
    };
  },
};
</script>

<style scoped>
.timeline-item[data-v-ffb3c5da]:not(:last-of-type) {
  padding-bottom: 15px !important;
}

/* @include media-breakpoint-down(md) {
  .display-2 {
    font-size: 5rem !important;
  }
} */
</style>