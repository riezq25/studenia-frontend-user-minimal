<template>
  <b-card v-if="data">
    <b-card-header style="margin-bottom:10px" class="d-flex justify-content-between flex-wrap">
      <b-card-title class="mt-1">{{paket_tryout.nama}}</b-card-title>
      <b-card-text class="mr-25 mb-0 mt-1">
        Kategori :
        <b-badge variant="info" class="badge" style="font-size:15px">{{paket_tryout.kategori.nama}}</b-badge>
      </b-card-text>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col v-for="item in data" :key="item.icon" sm="6" :class="item.customClass">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" :variant="item.color">
                <feather-icon size="24" :icon="item.icon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h5 class="font-weight-bolder mb-0" style="font-size: 17px">{{ item.title }}</h5>
              <div class="d-flex align-items-center flex-wrap">
                <div v-if="item.status" style="margin: 5px 5px 5px 0px">
                  <!-- light-danger: kurang, light-warning: cukup, light-success: bagus -->
                  <b-badge :variant="item.variant" style="font-size:18px">{{item.status}}</b-badge>
                </div>
                <b-card-text class="mb-0" style="font-size:16px;margin-top:3px">{{ item.subtitle }}</b-card-text>
              </div>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BRow,
  BCol,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody,
  BBadge,
} from "bootstrap-vue";

import { toRefs } from "@vue/composition-api";
import others from "@/navigation/vertical/others";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BBadge,
  },
  props: {
    statistik: Object,
  },
  setup(props) {
    let { informasi, paket_tryout, quartil } = props.statistik;

    let { IQR, ...otherQuartil } = quartil;

    let total_nilai = informasi.total_nilai;

    let tingkat_lulus = null;

    if (total_nilai <= otherQuartil["0%"]) {
      tingkat_lulus = 0;
    } else if (
      total_nilai > otherQuartil["0%"] &&
      total_nilai <= otherQuartil["Q1"]
    ) {
      tingkat_lulus = 25;
    } else if (
      total_nilai > otherQuartil["Q1"] &&
      total_nilai <= otherQuartil["Q2"]
    ) {
      tingkat_lulus = 50;
    } else if (
      total_nilai > otherQuartil["Q2"] &&
      total_nilai <= otherQuartil["Q3"]
    ) {
      tingkat_lulus = 75;
    } else if (
      total_nilai > otherQuartil["Q3"] &&
      total_nilai > otherQuartil["100%"]
    ) {
      tingkat_lulus = 100;
    }

    const variant = () => {
      let peluang = informasi.peluang.toLowerCase();
      if (peluang.includes("rendah")) {
        return "light-danger";
      } else if (peluang.includes("sedang")) {
        return "light-warning";
      } else if (peluang.includes("tinggi")) {
        return "light-success";
      }
    };

    let data = [
      {
        icon: "EditIcon",
        color: "light-primary",
        title: "Total Nilai",
        subtitle: informasi.total_nilai,
        customClass: "my-1",
      },
      {
        icon: "ClockIcon",
        color: "light-danger",
        title: "Waktu Pengerjaan",
        subtitle: `${paket_tryout.total_durasi} Menit`,
        customClass: "my-1",
      },
      {
        icon: "UserIcon",
        color: "light-info",
        title: "Peringkat",
        subtitle: `${informasi.rangking} dari ${informasi.total_siswa} Peserta`,
        customClass: "my-1",
      },
      {
        icon: "TargetIcon",
        color: "light-warning",
        title: "Peluang Kamu",
        subtitle: "Peluang Kamu",
        subtitle: ` ${tingkat_lulus} % peluang Lolos`,
        status: `${informasi.peluang}`,
        variant: variant(),
        customClass: "my-1",
      },
    ];

    return {
      data,
      paket_tryout,
    };
  },
};
</script>
