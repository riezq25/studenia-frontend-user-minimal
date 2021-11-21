<template>
  <div class="pb-6">
    <app-collapse accordion :type="'margin'">
      <b-row>
        <b-col cols="12" xl="9" md="8" class="fixed-top px-2 d-md-none time-fixed">
          <b-card>
            <div class="card-header px-0 pb-0">
              <h3 class="card-title">
                Sisa Waktu :
                <span class="text-primary" style="color:blue">23:47</span>
              </h3>
            </div>
          </b-card>
        </b-col>

        <b-col cols="12" xl="9" md="8" class="mt-4 mt-md-0">
          <app-collapse-item :isVisible="true" title="Kategori: Tes Karakteristik Pribadi (TKP)">
            <div>
              <hr />
              <div>
                <b-row class="invoice-spacing my-0">
                  <b-col cols="12" class="mb-lg-1">
                    <p>{{currentIndex+1}} . {{soal[currentIndex].pertanyaan}}</p>
                    <div class="mt-1">
                      <b-button v-for="(button) in buttons" :key="button" variant="flat-secondary" class="mb-75 pl-2 text-left" block>{{button.toUpperCase()}} . {{soal[currentIndex][`pil_${button}`]}}</b-button>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
            <div>
              <b-row>
                <b-col cols="6" md="3" class="button-pilihan">
                  <b-button block class="py-1 d-flex justify-content-center align-items-center" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="danger">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="hero-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span>Lepas</span>
                  </b-button>
                </b-col>
                <b-col cols="6" md="3" class="button-pilihan">
                  <b-button block class="py-1 d-flex justify-content-center align-items-center" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="warning">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="hero-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                      </svg>
                    </span>
                    <span>Ragu</span>
                  </b-button>
                </b-col>
                <b-col cols="6" md="3" class="button-pilihan">
                  <b-button block class="py-1 d-flex justify-content-center align-items-center" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="secondary">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="hero-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </span>
                    <span>Kunci</span>
                  </b-button>
                </b-col>
                <b-col cols="6" md="3" class="button-pilihan">
                  <b-button block class="py-1 d-flex justify-content-center align-items-center" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="dark">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="hero-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </span>
                    <span>Laporkan</span>
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </app-collapse-item>

          <b-card>
            <div class="card-header px-0 pb-0">
              <h4 class="card-title">Keterangan:</h4>
            </div>
            <b-row>
              <!-- solid color -->
              <b-col v-for="(data,index) in solidColor" :key="index" cols="6" sm="3" lg="3">
                <b-card :bg-variant="data.bg" text-variant="white" class="text-center">
                  <b-card-title class="text-white">{{ data.title }}</b-card-title>
                  <h3 class="text-white m-0">{{data.data}}</h3>
                </b-card>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols="12" xl="3" md="4" class="mb-5">
          <b-card class="d-none d-md-block">
            <div class="card-header px-0 pb-0">
              <h4 class="card-title">Sisa Waktu</h4>
            </div>
            <hr />
            <div class="text-center">
              <h1 class="fw-bold" style="font-size:40px">23:47</h1>
            </div>
          </b-card>
          <b-card>
            <div class="card-header px-0 pb-0">
              <h4 class="card-title">Nomor Soal</h4>
            </div>
            <hr />
            <div class="d-sm-flex my-2 d-none justify-content-between align-items-center nav-bottom">
              <b-button class="m-0 py-1 px-md-0 d-flex align-items-center justify-content-center" block variant="primary" :disabled="currentIndex==0? true:false" @click="clickPrev">
                <feather-icon icon="ChevronLeftIcon" size="20" />
                <span>Prev</span>
              </b-button>
              <b-button class="m-0 py-1 px-md-0 d-flex align-items-center justify-content-center" block variant="primary" :disabled="currentIndex == (jumlah-1) ? true : false" @click="clickNext">
                <span>Next</span>
                <feather-icon icon="ChevronRightIcon" size="20" />
              </b-button>
            </div>
            <div>
              <div class="overflow-auto my-1">
                <div class="d-flex justify-content-center flex-wrap btn-soal">
                  <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" size="sm" style="width:40px; height:40px" :variant="currentIndex==index? 'primary':'outline-secondary'" v-for="(jml,index) in soal" :key="jml.id" @click="clickSoal(index)">
                    <div class="d-flex justify-content-center align-items-center">{{jml.id}}</div>
                  </b-button>
                </div>
              </div>
            </div>
            <div>
              <b-button block v-b-modal.modal-danger v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="success" class="py-1 d-flex justify-content-center align-items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="hero-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>Selesai</span>
              </b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </app-collapse>

    <b-card-body class="p-0 pb-0 d-sm-none fixed-bottom">
      <b-card class="mb-0">
        <div class="d-flex justify-content-between align-items-center nav-bottom">
          <b-button class="m-0 py-1 d-flex align-items-center justify-content-center" block variant="primary" :disabled="currentIndex==0? true:false" @click="clickPrev">
            <feather-icon icon="ChevronLeftIcon" size="20" />
            <span>Prev</span>
          </b-button>
          <b-button class="m-0 py-1 d-flex align-items-center justify-content-center" block variant="primary" :disabled="currentIndex == (jumlah-1) ? true : false" @click="clickNext">
            <span>Next</span>
            <feather-icon icon="ChevronRightIcon" size="20" />
          </b-button>
        </div>
      </b-card>
    </b-card-body>

    <b-modal id="modal-danger" ok-variant="danger" ok-title="Yakin" cancel-title="Batal" modal-class="modal-danger" centered title="Danger Modal">
      <b-card-text class="text-center text-danger">
        <feather-icon icon="AlertTriangleIcon" size="50" />
        <h4 class="mt-1">Terdapat 30 soal belum dijawab. Apakah Anda yakin ingin mengakhiri sesi dan menyimpan semua jawaban?</h4>
      </b-card-text>
    </b-modal>
  </div>
</template>

<script>
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import { ref } from "@vue/composition-api";
import formatSoal from "./format-soal";
import Ripple from "vue-ripple-directive";
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BButton,
  BCardText,
  BForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BFormTextarea,
  BFormCheckbox,
  BPopover,
  BAlert,
  BLink,
  VBToggle,
} from "bootstrap-vue";

export default {
  components: {
    AppCollapse,
    AppCollapseItem,

    BRow,
    BCol,
    BCard,
    BCardBody,
    BButton,
    BCardText,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BFormTextarea,
    BFormCheckbox,
    BPopover,
    BAlert,
    BLink,
    VBToggle,
  },
  directives: {
    Ripple,
    "b-toggle": VBToggle,
  },

  setup() {
    const soal = ref(formatSoal.listSoal);
    const jumlah = ref(soal.value.length);
    let currentIndex = ref(0);

    let buttons = ref(["a", "b", "c", "d", "e"]);

    const clickNext = () => {
      currentIndex.value++;
    };

    const clickPrev = () => {
      currentIndex.value--;
    };

    const clickSoal = (index) => {
      currentIndex.value = index;
    };

    const solidColor = ref([
      { bg: "primary", title: "Soal", data: "30" },
      { bg: "success", title: "Dijawab", data: "30" },
      { bg: "danger", title: "Kosong", data: "30" },
      { bg: "warning", title: "Ragu", data: "30" },
    ]);

    return {
      jumlah,
      soal,
      currentIndex,
      buttons,
      clickNext,
      clickPrev,
      clickSoal,
      solidColor,
    };
  },
};
</script>

<style scoped>
.nav-bottom {
  gap: 20px !important;
}
.btn-soal {
  gap: 5px !important;
  height: 140px;
}

.hero-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.button-pilihan {
  margin: 4px 0;
}

@media (max-width: 767.98px) {
  .btn-soal {
    height: auto;
  }
  .time-fixed {
    margin-top: 85px;
  }
}
</style>