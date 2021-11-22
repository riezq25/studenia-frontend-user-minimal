<template>
  <div class="mb-2" v-if="!isLoading">
    <b-alert variant="primary" show>
      <div class="alert-body">
        <span>
          Silahkan kerjakan paket soal berikut. Paket soal bisa dikerjakan secara acak.
          <strong>Jangan meninggalkan aplikasi</strong> sebelum klik akhiri sesi ujian.
        </span>
      </div>
    </b-alert>

    <b-row>
      <b-col cols="8">
        <app-collapse
          v-if="!isLoading"
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
      </b-col>

      <b-col cols="4">
        <app-collapse accordion :type="'margin'">
          <b-card-actions title="Sisa Waktu" action-collapse>
            <div class="mx-auto w-100 text-center">
              <span
                class="text-center mx-auto text-primary display-2 fw-bold"
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
                @click="simpanSesi"
              >Akhiri Sesi</b-button>
            </div>
          </b-card-actions>
        </app-collapse>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "@vue/composition-api";
import { useRouter } from "@core/utils/utils";
import store from "@/store/index";

import repository from "@repofactory"
const repoTryout = repository.get('tryoutRepository')
const repoPengerjaanTryout = repository.get('pengerjaanTryoutRepository')

import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import AppTimeline from "@core/components/app-timeline/AppTimeline.vue";
import AppTimelineItem from "@core/components/app-timeline/TimeLineItem.vue";
import { BBadge, BButton, BModal, VBModal, BCardText, BRow, BCol, BAlert } from "bootstrap-vue";
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
    BRow, BCol, BAlert, BBadge
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  setup() {
    const { route } = useRouter()

    let tryout = ref(null);
    const isLoading = ref(true)
    const sisaWaktu = ref(0)

    const formatTime = (seconds) => {
      let m = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0'),
        s = Math.floor(seconds % 60).toString().padStart(2, '0');

      return `${m}:${s}`;
    }

    const fetchData = async () => {
      isLoading.value = true
      if (store.state.tryout.data && route.value.params.id_pengerjaan == store.state.tryout.data.id) {
        tryout.value = store.state.tryout.data
        isLoading.value = false
      } else {
        await repoPengerjaanTryout.kerjakan(route.value.params.id_pengerjaan).then(function (response) {
          isLoading.value = false

          store.state.tryout.isUjian = true
          store.state.tryout.data = response.data.data


          tryout.value = response.data.data
          sisaWaktu.value = response.data.data.durasi * 60 * 1000
        })
          .catch(function (error) {
            if (error.response) {
              // showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
            } else if (error.request) {
              // showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
            } else {
              // showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
            }
            isLoading.value = false
            // isError.value = true
          });
      }


    }

    const redirectHalamanPengerjaan = (index_paket_kategori, index_paket_mapel) => {
      const params = route.value.params
      router.push({ name: 'ujian-paket-tryout', params: { jenis: params.jenis, kategori: params.kategori, id: params.id, id_pengerjaan: params.id_pengerjaan, index_paket_kategori: index_paket_kategori, index_paket_mapel: index_paket_mapel } })
    }

    const redirectHalamanPaket = (index_paket_kategori, index_paket_mapel) => {
      const params = route.value.params
      router.push({ path: '/try-out/:jenis/:kategori', params: { jenis: params.jenis, kategori: params.kategori } })
    }

    const simpanSesi = async () => {
      store.commit('tryout/simpanSesi', tryout.value.pengerjaan)
      store.commit('tryout/clearState')


      await repoPengerjaanTryout.simpanJawaban(route.value.params.id_pengerjaan, { pengerjaan: tryout.value.pengerjaan.paket }).then(function (response) {
        // redirectHalamanPaket()

        router.push('/')
      })
        .catch(function (error) {
          if (error.response) {
            // showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
          } else if (error.request) {
            // showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
          } else {
            // showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
          }
          isLoading.value = false
          // isError.value = true
        });
    }

    onMounted(() => {

      fetchData().then(() => {
        let countDown = setInterval(() => {
          sisaWaktu.value = (Date.parse(tryout.value.selesai) / 1000) - Math.floor(Date.now() / 1000)

          if (sisaWaktu.value == 0) {
            clearInterval(countDown)
          }

        }, 1000);
      })

    })

    return {
      tryout, isLoading, sisaWaktu,

      // method
      redirectHalamanPengerjaan, simpanSesi, formatTime
    };
  },
};
</script>

<style scoped>
.timeline-item[data-v-ffb3c5da]:not(:last-of-type) {
  padding-bottom: 15px !important;
}
</style>