<template>
  <div v-if="isLoaded">
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
            <b-card-title>Perbandingan Jawaban {{penilaian.paket_kategori.kategori_soal.nama}}</b-card-title>
          </b-card-header>
          <div class="d-flex justify-content-center md:flex-none">
            <donut-to :total_jawaban="penilaian"></donut-to>
          </div>
        </b-card>
      </b-col>
      <b-col md="8">
        <b-card>
          <b-card-header>
            <b-card-title>Grafik Per Mapel {{penilaian.paket_kategori.kategori_soal.nama}}</b-card-title>
          </b-card-header>
          <batang-to :jawaban_mapel="penilaian"></batang-to>
        </b-card>
      </b-col>
    </b-row>

    <!-- <b-row>
      <b-col cols="12">
        <tabel-peringkat></tabel-peringkat>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-card>
          <b-card-header>
            <b-card-title>Pilih Jurusan dan Kampus</b-card-title>
          </b-card-header>
          <b-card-body>
            <b-row style="padding:0 1.5rem">
              <b-col cols="12" class="mb-1">
                <h6 class="text-muted">Kamu bisa pilih jurusan dan kampus yang kamu inginkan:</h6>
                <div class="mt-1">
                  <b-row>
                    <b-col md="4">
                      <h6>
                        Kampus:
                        <span style="font-weight:700">Universitas Indonesia</span>
                      </h6>
                    </b-col>
                    <b-col md="4">
                      <h6>
                        Fakultas:
                        <span style="font-weight:700">Seni dan Budaya</span>
                      </h6>
                    </b-col>
                    <b-col md="4">
                      <h6>
                        Jurusan:
                        <span style="font-weight:700">Seni</span>
                      </h6>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
              <b-col cols="12" md="6" class="mb-md-0 mb-2">
                <label>Kampus</label>
                <v-select :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :value="statusFilter" :options="statusOptions" class="w-100" :reduce="val => val.value" @input="(val) => $emit('update:statusFilter', val)" />
              </b-col>
              <b-col cols="12" md="6" class="mb-md-0 mb-2">
                <label>Jurusan</label>
                <v-select :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :value="roleFilter" :options="roleOptions" class="w-100" :reduce="val => val.value" @input="(val) => $emit('update:roleFilter', val)" />
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>-->
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
} from "bootstrap-vue";
import vSelect from "vue-select";
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

import { ref, onMounted, reactive, toRefs } from "@vue/composition-api";
import { useRouter } from "@core/utils/utils";
import repository from "@repofactory";
const repoHasilTryOut = repository.get("HasilTryOutRepository");

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
    BCardHeader,
    BCardTitle,
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

  setup() {
    const { route } = useRouter();
    const toast = useToast();
    const isLoading = ref(false);
    const isLoaded = ref(false);

    // hasil fetch
    let hasil = ref({});

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
      await repoHasilTryOut
        .get(route.value.params.id_pengerjaan)
        .then((response) => {
          hasil.value = response.data.data;
          console.log(hasil.value);
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

    onMounted(() => {
      fetchData();
    });

    // const { nama, total_durasi, total_soal, kategori } = hasil.paket_tryout;

    // const { total_nilai, nilai_maximal, rangking, total_siswa, peluang } =
    //   informasiEkstrak;

    // console.log("total nilai", total_nilai);

    // const { IQR, ...filteredQuartil } = hasil.quartil;

    // let entries = Object.entries(filteredQuartil);
    // let indexQuartil = null;
    // for (let [index, [key, value]] of entries.entries()) {
    //   if (total_nilai > value) {
    //     indexQuartil = index;
    //   }
    // }
    // indexQuartil += 1;

    // const cariQuartil = (index) => {
    //   let hasil = null;
    //   switch (index) {
    //     case 0:
    //       hasil = 0;
    //       break;

    //     case 1:
    //       hasil = 25;
    //       break;

    //     case 2:
    //       hasil = 50;
    //       break;

    //     case 3:
    //       hasil = 75;
    //       break;

    //     case 4:
    //       hasil = 100;
    //       break;

    //     default:
    //       hasil = 0;
    //       break;
    //   }
    //   return hasil;
    // };

    // //===CARD TRY OUT===
    // let tryOut = {
    //   nama_tryout: nama,
    //   waktu_pengerjaan: total_durasi,
    //   nama_kategori: kategori.nama,
    //   total_nilai,
    //   rangking,
    //   total_siswa,
    //   peluang,
    //   quartil: cariQuartil(indexQuartil),
    // };

    // //===CARD PENILAIAN===
    // //nilai total
    // let { benar, salah } = hasil.penilaian[0];

    // let jawaban = {
    //   benar,
    //   salah,
    //   total_soal,
    // };

    // //waktu keseluruhan
    // let { waktu, paket_mapels } = hasil.penilaian[0];
    // let waktu_keseluruhan = [];
    // for (let i = 0; i < paket_mapels.length; i++) {
    //   const mapel = paket_mapels[i];
    //   waktu_keseluruhan.push({
    //     mapel_waktu: mapel.waktu,
    //     nama_mapel: mapel.info.mapel_soal.nama,
    //   });
    // }

    // let total_waktu = {
    //   waktu_total: waktu,
    //   waktu_keseluruhan,
    // };

    // //===CARD PER TRY OUT===
    // let total_benar = hasil.penilaian[0].benar;
    // let total_salah = hasil.penilaian[0].salah;
    // let total_kosong = hasil.penilaian[0].kosong;

    // let total_jawaban = {
    //   total_benar,
    //   total_salah,
    //   total_kosong,
    // };

    // let jawaban_mapel = [];

    // for (let i = 0; i < paket_mapels.length; i++) {
    //   const mapel = paket_mapels[i];
    //   jawaban_mapel.push({
    //     benar: mapel.benar,
    //     salah: mapel.salah,
    //     kosong: mapel.kosong,
    //     nama_mapel: mapel.info.mapel_soal.nama,
    //   });
    // }

    return {
      // response,
      // data,
      // //card 1 -> try out
      // tryOut,
      // // card 2 -> jawaban, total waktu seluruh mapel
      // jawaban,
      // total_waktu,
      // // card 3 -> perbandingan jawaban mapel, dan batang setiap mapel
      // total_jawaban,
      // jawaban_mapel,

      hasil,
      isLoaded,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-misc.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
