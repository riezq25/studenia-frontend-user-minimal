<template>
  <section class="mb-5">
    <!-- Alert: No item found -->
    <!-- <b-alert variant="danger" :show="invoiceData === undefined">
      <h4 class="alert-heading">Error fetching invoice data</h4>
      <div class="alert-body">
        No invoice found with this invoice id. Check
        <b-link class="alert-link" :to="{ name: 'apps-invoice-list'}">Invoice List</b-link>for other invoices.
      </div>
    </b-alert>-->
    <!-- {{listSoal}} -->
    <b-row class="invoice-add">
      <!-- <b-card-body class="pb-0 w-100 d-md-none sticky-top" style="top:70px">
        <b-card>
          <h3>Sisa Waktu</h3>
          <hr />
          <div class="text-center">
            <h1>91:00</h1>
          </div>
        </b-card>
      </b-card-body>-->

      <!-- Col: Left (Invoice Container) -->
      <b-col cols="12" xl="9" md="8">
        <b-card no-body class="invoice-preview-card">
          <!-- Header -->
          <!-- <b-card-body class="invoice-padding pb-0 d-none d-md-block">
            <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0 pb-0">
              <h3 class="text-primary invoice-logo">Time</h3>
            </div>
          </b-card-body>-->

          <b-card-body>
            <h2>Tes Kebangsaan</h2>
          </b-card-body>

          <!-- Spacer -->
          <hr />

          <!-- Invoice Client & Payment Details -->
          <b-card-body>
            <b-row class="invoice-spacing my-0">
              <!-- Col: Invoice To -->
              <b-col cols="12" class="mb-lg-1">
                <p>{{currentIndex+1}} . {{soal[currentIndex].pertanyaan}}</p>
                <!-- <p>{{currentIndex}} .</p> -->
                <!-- Selected Client -->
                <div class="mt-1">
                  <b-button v-for="(button) in buttons" :key="button" :variant="soal[currentIndex].kunci_jawaban.toLowerCase() == button ? 'primary':'light'" class="mb-75 pl-2 text-left" block>{{button.toUpperCase()}} . {{soal[currentIndex][`pil_${button}`]}}</b-button>
                </div>
              </b-col>
            </b-row>

            <!-- <b-row>
                <b-col sm="6">
                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">Lepas</b-button>
                </b-col>

                <b-col sm="6">
                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">Ragu</b-button>
                </b-col>

                <b-col sm="6">
                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">Kunci</b-button>
                </b-col>

                <b-col sm="6">
                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">Laporkan</b-button>
                </b-col>
            </b-row>-->
          </b-card-body>
        </b-card>
      </b-col>

      <!-- Right Col: Card -->
      <b-col cols="12" md="4" xl="3" class="invoice-actions">
        <!-- <b-card>
          <h3>Sisa Waktu</h3>
          <hr />
          <div class="text-center">
            <h1>91:00</h1>
          </div>
        </b-card>-->

        <b-card>
          <h3>Nomor Soal</h3>
          <hr />
          <div class="d-md-flex my-2 d-none">
            <b-button :disabled="currentIndex==0? true:false" @click="clickPrev">Prev</b-button>
            <b-button :disabled="currentIndex == (jumlah-1) ? true : false" @click="clickNext">Next</b-button>
          </div>
          <div>
            <div class="overflow-auto my-1">
              <div class="d-grid gap-3" style="max-height: 150px">
                <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" :variant="currentIndex==index? 'primary':'outline-secondary'" v-for="(jml,index) in soal" :key="jml.id" @click="clickSoal(index)">{{jml.id}}</b-button>
              </div>
            </div>
          </div>
          <!-- <div>
            <b-button v-b-toggle.sidebar-invoice-add-payment v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="success" class="mb-75" block>Add Payment</b-button>
          </div>-->
        </b-card>

        <!-- <b-card class="mb-5">
          <h3>Informasi</h3>
          <hr />
          <b-row>
            <b-col sm="6">
              <span>
                <h3>Soal</h3>
                <p>110</p>
              </span>
            </b-col>

            <b-col sm="6">
              <span>
                <h3>Soal</h3>
                <p>110</p>
              </span>
            </b-col>

            <b-col sm="6">
              <span>
                <h3>Soal</h3>
                <p>110</p>
              </span>
            </b-col>

            <b-col sm="6">
              <span>
                <h3>Soal</h3>
                <p>110</p>
              </span>
            </b-col>
          </b-row>
        </b-card>-->

        <!-- Action Buttons -->
        <!-- <b-card>
          <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" v-b-toggle.sidebar-send-invoice variant="primary" class="mb-75" block>Send Invoice</b-button>

          <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" class="mb-75" block>Preview</b-button>

          <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" block>Save</b-button>

          <b-button v-b-toggle.sidebar-invoice-add-payment v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="success" class="mb-75" block>Add Payment</b-button>
        </b-card>-->
      </b-col>
    </b-row>

    <b-card-body class="w-100 pb-0 d-md-none fixed-bottom">
      <b-card>
        <div class="d-flex my-2">
          <b-button :disabled="currentIndex==0? true:false" @click="clickPrev">Prev</b-button>
          <b-button :disabled="currentIndex == (jumlah-1) ? true : false" @click="clickNext">Next</b-button>
        </div>
      </b-card>
    </b-card-body>
  </section>
</template>

<script>
import Logo from "@core/layouts/components/Logo.vue";
import { ref } from "@vue/composition-api";
import formatSoal from "./format-soal";
import Ripple from "vue-ripple-directive";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import router from "@/router";
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
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";

export default {
  components: {
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
    flatPickr,
    vSelect,
    Logo,
    VuePerfectScrollbar,
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

    return {
      jumlah,
      soal,
      currentIndex,
      buttons,
      clickNext,
      clickPrev,
      clickSoal,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";

.form-item-section {
  background-color: $product-details-bg;
}

.form-item-action-col {
  width: 27px;
}

.repeater-form {
  // overflow: hidden;
  transition: 0.35s height;
}

.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}

.dark-layout {
  .form-item-section {
    background-color: $theme-dark-body-bg;

    .row .border {
      background-color: $theme-dark-card-bg;
    }
  }
}
</style>
