<template>
  <div v-if="isLoaded && isMounted">
    <b-row class="match-height">
      <b-col>
        <statistik-try-out :statistik="hasil"></statistik-try-out>
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col md="5">
        <b-card>
          <b-card-header>
            <b-card-title>Perbandingan Jawaban Keseluruhan</b-card-title>
          </b-card-header>
          <div class="d-flex justify-content-center md:flex-none">
            <nilai-total :jawaban="hasil"></nilai-total>
          </div>
        </b-card>
      </b-col>
      <b-col md="7">
        <b-card>
          <b-card-header style="padding-left:0">
            <b-card-title>Total Waktu Pengerjaan Kamu Setiap Mapel</b-card-title>
          </b-card-header>
          <div class="d-flex justify-content-center md:flex-none mt-2">
            <waktu-keseluruhan :total_waktu="hasil"></waktu-keseluruhan>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-for="penilaian in hasil.penilaian" :key="penilaian.id" class="match-height">
      <b-col md="4" class="mx-auto">
        <b-card>
          <b-card-header>
            <b-card-title>Perbandingan Jawaban {{ penilaian.paket_kategori.kategori_soal.nama }}</b-card-title>
          </b-card-header>
          <div class="d-flex justify-content-center md:flex-none">
            <donut-to :total_jawaban="penilaian"></donut-to>
          </div>
        </b-card>
      </b-col>
      <b-col md="8">
        <b-card>
          <b-card-header>
            <b-card-title>Grafik Per Mapel {{ penilaian.paket_kategori.kategori_soal.nama }}</b-card-title>
          </b-card-header>
          <batang-to :jawaban_mapel="penilaian"></batang-to>
        </b-card>
      </b-col>
    </b-row>

    <!-- <b-row>
      <b-col cols="12">
        <tabel-peringkat></tabel-peringkat>
      </b-col>
    </b-row>-->
    <b-row>
      <b-col cols="12">
        <b-card>
          <b-card-header class="d-flex">
            <b-card-title class="my-1 my-md-0">Pilih Jurusan dan Kampus</b-card-title>
          </b-card-header>
          <b-card-body style="padding:0 1.5rem">
            <b-row>
              <b-col cols="12" class="mb-1">
                <h6 class="text-muted">Kamu bisa pilih kampus dan jurusan yang kamu inginkan:</h6>
                <div class="mt-1">
                  <b-row>
                    <b-col md="6" class="my-1 my-md-0">
                      <div class="d-flex align-items-center">
                        <b-avatar size="40" variant="light-warning" class="mr-1">
                          <feather-icon size="18" icon="EditIcon" />
                        </b-avatar>
                        <h6 style="margin-top:7px">
                          Kampus :
                          <span style="font-weight:700">{{ namaKampus ? namaKampus : '-' }}</span>
                        </h6>
                      </div>
                    </b-col>
                    <b-col md="6" class="my-1 my-md-0">
                      <div class="d-flex align-items-center">
                        <b-avatar size="40" variant="light-success" class="mr-1">
                          <feather-icon size="18" icon="BookOpenIcon" />
                        </b-avatar>
                        <h6 style="margin-top:7px">
                          Jurusan :
                          <span style="font-weight:700">{{ namaJurusan ? namaJurusan : '-' }}</span>
                        </h6>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
              <b-row></b-row>
              <b-col cols="12" md="6" class="mb-md-0 mb-2">
                <label>Kampus</label>
                <v-select v-model="idKampus" @input="changeKampus" placeholder="--Kampus--" :options="optionKampus" :reduce="kampus => kampus.id" label="nama" />
              </b-col>
              <b-col cols="12" md="6" class="mb-md-0 mb-2">
                <label>Jurusan</label>
                <v-select v-if="idKampus" v-model="idJurusan" @input="changeJurusan" placeholder="--Jurusan--" :options="optionJurusan" :reduce="jurusan => jurusan.id" label="nama" />
                <v-select v-else disabled placeholder="Pilih Kampus dulu" />
              </b-col>
            </b-row>
            <div v-if="idKampus && idJurusan">
              <b-row class="mt-2">
                <b-col cols="12" md="4">
                  <h3 style="font-size:15px;margin:10px 0;font-weight:700">Data Rasio Kelolosan</h3>
                  <div v-if="items.length > 0">
                    <b-table responsive :items="items" :fields="fields"></b-table>
                  </div>
                  <div v-else>
                    <b-badge variant="light-info" style="font-size:15">Tidak ada data Rasio Kelolosan</b-badge>
                  </div>
                </b-col>
                <b-col cols="12" md="8">
                  <h3 style="font-size:15px;margin:10px 0;font-weight:700">Peluang Lolos di Jurusan</h3>
                  <b-row class="mt-2">
                    <b-col cols="6" md="3" class="text-center">
                      <h5>Nilai Kamu</h5>
                      <div class="mt-0 mt-md-2">
                        <h1 style="font-weight: 600;">{{ nilaiKamu }}</h1>
                      </div>
                    </b-col>
                    <b-col cols="6" md="4" class="text-center">
                      <h5>Nilai Minimal Jurusan</h5>
                      <div class="mt-0 mt-md-2">
                        <h1 style="font-weight: 600;">{{ nilaiJurusan }}</h1>
                      </div>
                    </b-col>
                    <b-col cols="12" md="5" class="text-center mt-2 mt-md-0">
                      <h5>Peluang Kamu di Jurusan Ini</h5>
                      <div class="d-flex flex-column justify-content-center align-items = ref([])-center">
                        <div style="margin-bottom:4px">
                          <span style="font-size:40px">{{ nilaiKamu >= nilaiJurusan ? '🙂' : '🙁' }}</span>
                        </div>
                        <b-badge :variant="nilaiKamu >= nilaiJurusan ? 'light-success' : 'light-danger'" style="font-size:15px">Peluang Lolos {{ nilaiKamu >= nilaiJurusan ? 'Tinggi' : 'Rendah' }}</b-badge>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BLink,
  BForm,
  BFormInput,
  BButton,
  BImg,
  BModal,
  VBModal,
  BCardText,
  BRow,
  BCol,
  BTable,
  BBadge,
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BAvatar,
  BSpinner,
} from "bootstrap-vue";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import NilaiTotal from "./NilaiTotal.vue";
//card
import StatistikTryOut from "./StatistikTryOut.vue";
import Hasil from "./Hasil.vue";
import WaktuKeseluruhan from "./WaktuKeseluruhan.vue";
import TabelPeringkat from "./TabelPeringkat.vue";

//tps
import DonutTo from "./tryout/DonutTo.vue";
import BatangTo from "./tryout/BatangTo.vue";

import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import { ref, onMounted } from "@vue/composition-api";
import { useRouter } from "@core/utils/utils";
import repository from "@repofactory";
const repoHasilTryOut = repository.get("HasilTryOutRepository");
const repoKampusJurusan = repository.get("KampusJurusanRepository");

export default {
  components: {
    VuexyLogo,
    BLink,
    BForm,
    BButton,
    BFormInput,
    BImg,
    BModal,
    VBModal,
    BCardText,
    BRow,
    BCol,
    BTable,
    BBadge,
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    BSpinner,
    BAvatar,
    vSelect,

    //
    StatistikTryOut,
    NilaiTotal,
    Hasil,
    WaktuKeseluruhan,
    TabelPeringkat,

    //tps
    DonutTo,
    BatangTo,
  },

  directives: {
    Ripple,
  },

  setup() {
    const { route } = useRouter();
    const toast = useToast();
    const isLoading = ref(false);
    const isLoaded = ref(false);
    let kampus = ref(null);
    let jurusan = ref(null);
    let idKampus = ref(null);
    let idJurusan = ref(null);
    let isProcess = ref(false);
    let isRatio = ref(false);

    let namaKampus = ref("");
    let namaJurusan = ref("");

    // hasil fetch
    let hasil = ref({});
    let nilaiKamu = ref(null);
    let nilaiJurusan = ref(null);
    let items = ref([]);

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

    const optionKampus = ref([]);

    const optionJurusan = ref([]);

    const process = () => {
      isProcess.value = true;

      setTimeout(() => {
        isProcess.value = false;
        showToast(
          "Success",
          "Berhasil Memilih Kampus & Jurusan",
          "success",
          "ThumbsUpIcon"
        );
        isRatio.value = true;
      }, 1000);
    };

    const changeKampus = (value) => {
      if (value == null) {
        idKampus.value = null;
        idJurusan.value = null;
        namaKampus.value = "";
        namaJurusan.value = "";
      } else {
        cariKampus(value);
        fetchJurusan();
      }
    };

    const changeJurusan = (value) => {
      if (value == null) {
        idJurusan.value = null;
        namaJurusan.value = "";
      } else {
        cariJurusan(value);
        fetchDayaTampung();
      }
    };

    const cariKampus = (id_kampus) => {
      let selectedKampus = optionKampus.value.filter((kampus) => {
        if (kampus.id == id_kampus) {
          return kampus;
        }
      });

      namaKampus.value = selectedKampus[0].nama;
    };

    const cariJurusan = (id_jurusan) => {
      let selectedJurusan = optionJurusan.value.filter((jurusan) => {
        if (jurusan.id == id_jurusan) {
          return jurusan;
        }
      });

      nilaiJurusan.value = selectedJurusan[0].nilai;
      namaJurusan.value = selectedJurusan[0].nama;
    };

    const resetPilihan = () => {
      kampus.value = null;
      jurusan.value = null;
      isRatio.value = false;
    };

    const fetchDayaTampung = async () => {
      // repoKampusJurusan
      await repoKampusJurusan
        .getDayaTampung(idKampus.value, idJurusan.value)
        .then((response) => {
          items.value = response.data.data.daya_tampung_jurusan_kampuses;
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
          isLoading.value = false;
        });
    };

    const fetchJurusan = async () => {
      // repoKampusJurusan
      await repoKampusJurusan
        .getJurusan(idKampus.value)
        .then((response) => {
          optionJurusan.value = response.data.data.jurusan_kampuses;
          isLoaded.value = true;
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
          isLoading.value = false;
        });
    };

    const fetchKampus = async () => {
      // repoKampusJurusan
      await repoKampusJurusan
        .getKampus()
        .then((response) => {
          optionKampus.value = response.data.data;
          isLoaded.value = true;
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
          isLoading.value = false;
        });
    };

    let isMounted = ref(false)

    const fetchData = async () => {
      await repoHasilTryOut
        .get(route.value.params.id_pengerjaan)
        .then((response) => {
          hasil.value = response.data.data;
          nilaiKamu.value = hasil.value.informasi.total_nilai;
          isMounted.value = true;
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
          isLoading.value = false;
        });
    };

    onMounted(() => {
      fetchData();
      fetchKampus();
    });

    return {
      hasil,
      isLoaded,
      isMounted,
      kampus,
      jurusan,
      nilaiKamu,
      nilaiJurusan,
      optionKampus,
      optionJurusan,
      changeKampus,
      changeJurusan,

      // kampus
      namaKampus,
      namaJurusan,

      process,
      isProcess,
      idKampus,
      idJurusan,
      isRatio,
      resetPilihan,
      fields: [
        {
          key: "tahun",
          label: "Tahun",
        },
        {
          key: "daya_tampung",
          label: "Daya Tampung",
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      items,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-misc.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
