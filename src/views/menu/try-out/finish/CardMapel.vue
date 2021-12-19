<template>
  <div class="checkout-items">
    <b-card class="ecommerce-card" no-body>
      <div class="p-1">
        <div class="item-name">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div style="margin-right:5px">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-data" viewBox="0 0 16 16">
                  <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                </svg>
              </div>
              <h4 class="item-price mb-0">IPA MATEMATIKA</h4>
            </div>
          </div>
          <div class="my-1 d-flex flex-wrap align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <h5 style="margin-right:5px">Total Durasi :</h5>
              <h5>
                <feather-icon icon="ClockIcon" style="margin-right:3px" />
                <span style="font-weight:600">89 Menit</span>
              </h5>
            </div>
            <div class="d-flex align-items-center">
              <h5 style="margin-right:5px">Jumlah Soal :</h5>
              <h5>
                <feather-icon icon="FileTextIcon" style="margin-right:3px" />
                <span style="font-weight:600">60 Soal</span>
              </h5>
            </div>
          </div>
          <hr />
          <span class="item-company">
            <h5>Hasil Pengerjaan mu :</h5>
          </span>
        </div>
        <b-row>
          <b-col cols="12" md="6">
            <div class="d-flex justify-content-center align-items-center">
              <chart-jawaban />
            </div>
          </b-col>

          <b-col cols="12" md="6">
            <div class="d-flex justify-content-center align-items-center">
              <chart-nilai />
            </div>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
  BLink,
  BImg,
  BButton,
  BBadge,
  BFormSpinbutton,
  BRow,
  BCol,
} from "bootstrap-vue";

import ChartJawaban from "./ChartJawaban.vue";
import ChartNilai from "./ChartNilai.vue";

export default {
  components: {
    BCard,
    BCardBody,
    BLink,
    BImg,
    BButton,
    BBadge,
    BFormSpinbutton,
    ChartJawaban,
    ChartNilai,
    BRow,
    BCol,
  },
};
</script>

