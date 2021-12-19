<template>
  <div class="mb-2">
    <app-collapse accordion :type="'margin'">
      <b-row>
        <b-col sm="12" md="8" lg="8">
          <b-row>
            <b-col cols="12">
              <b-card-actions title="Analisis TRY OUT Kamu " action-collapse>
                <b-row class="mt-2">
                  <b-col class="my-0 my-md-0" cols="12" md="6">
                    <h5>
                      Nama Try OUT:
                      <span style="font-weight:900">TRY OUT UTBK Bla...</span>
                    </h5>
                  </b-col>
                  <b-col class="my-0 my-md-0" cols="12" md="6">
                    <div class="text-md-right">
                      <h5>
                        Kelompok Ujian :
                        <b-badge variant="light-warning">SAINTEK</b-badge>
                      </h5>
                    </div>
                  </b-col>
                </b-row>

                <hr />

                <b-row class="mt-2">
                  <b-col class="my-2 my-md-0" cols="12" md="6">
                    <div class="text-center">
                      <h5>Nilai Akhir kamu:</h5>
                      <chart-gradient />
                      <h4>Dari nilai Maksimum</h4>
                    </div>
                  </b-col>
                  <b-col class="my-2 my-md-0" cols="12" md="6">
                    <div class="text-center">
                      <h5>Peringkat:</h5>
                      <chart />
                      <h4>
                        159 dari
                        <span style="font-weight: bold">596</span> peserta
                      </h4>
                    </div>
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col>
                    <hr />
                  </b-col>
                </b-row>

                <b-row>
                  <b-col>
                    <h5>Daftar Mapel:</h5>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="12">
                    <card-mapel />
                  </b-col>
                </b-row>
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

            <b-row class="mt-2">
              <b-col cols="12">
                <h5>Rata-rata waktu pengerjaan: 89:00</h5>
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

    <!-- <div class="w-100 p-0 d-sm-none fixed-bottom">
      <div>
        <b-button block variant="relief-success py-2" v-b-modal.modal-success>
          <span style="font-size:1.2rem">Kerjakan</span>
        </b-button>
      </div>
    </div>-->

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

import ChartGradient from "./component/ChartGradient.vue";
import Chart from "./component/Chart.vue";

import {
  BButton,
  BModal,
  VBModal,
  BCardText,
  BRow,
  BCol,
  BTable,
  BBadge,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import router from "@/router";
import CardSelesai from "../components/CardSelesai.vue";
import CardMapel from "./CardMapel.vue";

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
    BTable,
    BBadge,
    ChartGradient,
    Chart,
    CardMapel,
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

    const fields = [
      "id",
      "first_name",
      "email",
      "gender",
      "ip_address",
      {
        key: "Phone",
        label: "Phone",
      },
      "Country",
    ];

    const items = [
      {
        id: "1",
        first_name: "Marybelle",
        last_name: "Della Scala",
        email: "mdellascala0@opensource.org",
        gender: "Female",
        ip_address: "85.254.7.181",
        Phone: "+86 350 673 7985",
        Country: "China",
      },
      {
        id: "2",
        first_name: "Octavia",
        last_name: "Tohill",
        email: "otohill1@google.co.jp",
        gender: "Female",
        ip_address: "93.70.144.212",
        Phone: "+63 938 283 0018",
        Country: "Philippines",
      },
      {
        id: "3",
        first_name: "Jennie",
        last_name: "Geroldi",
        email: "jgeroldi2@slideshare.net",
        gender: "Female",
        ip_address: "76.145.147.212",
        Phone: "+81 235 674 0110",
        Country: "Japan",
      },
      {
        id: "4",
        first_name: "Vanya",
        last_name: "Wharby",
        email: "vwharby3@mozilla.org",
        gender: "Male",
        ip_address: "139.234.247.155",
        Phone: "+30 349 556 7375",
        Country: "Greece",
      },
      {
        id: "5",
        first_name: "Olenka",
        last_name: "Brawley",
        email: "obrawleyc@adobe.com",
        gender: "Female",
        ip_address: "166.183.163.155",
        Phone: "+62 841 824 0990",
        Country: "Indonesia",
      },
    ];

    return {
      tryout,

      // method
      redirectHalamanPengerjaan,
      requestPengerjaan,

      fields,
      items,
    };
  },
};
</script>

<style scoped>
.timeline-item[data-v-ffb3c5da]:not(:last-of-type) {
  padding-bottom: 15px !important;
}
</style>