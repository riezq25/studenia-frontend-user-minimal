<template>
  <div>
    <b-row class="match-height">
      <b-col>
        <ecommerce-statistics></ecommerce-statistics>
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col md="5">
        <b-card>
          <b-card-header>
            <b-card-title>Perbandingan Jawaban Keseluruhan</b-card-title>
          </b-card-header>
          <div class="d-flex justify-content-center md:flex-none">
            <nilai-total></nilai-total>
          </div>
        </b-card>
      </b-col>
      <b-col md="7">
        <b-card>
          <b-card-header style="padding-left:0">
            <b-card-title>Total Waktu Keseluruhan Setiap Mapel</b-card-title>
          </b-card-header>
          <div class="d-flex justify-content-center md:flex-none">
            <waktu-keseluruhan></waktu-keseluruhan>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col md="4" class="mx-auto">
        <b-card>
          <b-card-header>
            <b-card-title>Nilai TPS</b-card-title>
          </b-card-header>
          <div class="d-flex justify-content-center md:flex-none">
            <donut-to></donut-to>
          </div>
        </b-card>
      </b-col>
      <b-col md="8">
        <b-card>
          <b-card-header>
            <b-card-title>Grafik Per Mapel TPS</b-card-title>
          </b-card-header>
          <batang-to></batang-to>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col md="4" class="mx-auto">
        <b-card>
          <b-card-header>
            <b-card-title>Nilai TKA Soshum</b-card-title>
          </b-card-header>
          <div class="d-flex justify-content-center md:flex-none">
            <donut-to></donut-to>
          </div>
        </b-card>
      </b-col>
      <b-col md="8">
        <b-card>
          <b-card-header>
            <b-card-title>Grafik Per Mapel TPA SOSHUM</b-card-title>
          </b-card-header>
          <batang-to></batang-to>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
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
              <!-- <b-col cols="12" md="6" class="mb-md-0 mb-2">
                <label>Plan</label>
                <v-select :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :value="planFilter" :options="planOptions" class="w-100" :reduce="val => val.value" @input="(val) => $emit('update:planFilter', val)" />
              </b-col>-->
            </b-row>
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
} from "bootstrap-vue";
import vSelect from "vue-select";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import store from "@/store/index";
import NilaiTotal from "./NilaiTotal.vue";
import EcommerceStatistics from "./EcommerceStatistics.vue";
import Hasil from "./Hasil.vue";
import WaktuKeseluruhan from "./WaktuKeseluruhan.vue";
import TabelPeringkat from "./TabelPeringkat.vue";

//tps
import DonutTo from "./tryout/DonutTo.vue";
import BatangTo from "./tryout/BatangTo.vue";

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
    NilaiTotal,
    EcommerceStatistics,
    Hasil,
    WaktuKeseluruhan,
    TabelPeringkat,

    //tps
    DonutTo,
    BatangTo,
  },
  data() {
    return {
      downImg: require("@/assets/images/pages/coming-soon.svg"),
    };
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require("@/assets/images/pages/coming-soon-dark.svg");
        return this.downImg;
      }
      return this.downImg;
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-misc.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
