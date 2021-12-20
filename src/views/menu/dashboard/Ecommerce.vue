<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height mb-4">
      <b-col cols="12">
        <!-- <router-link :to="{name: 'try-out/selesai'}">Selesai</router-link> -->
        <b-alert variant="success" show>
          <div class="alert-body">
            <span>
              Ini adalah tampilan demo yang akan segera launcing dari Studenia 😊 . Jangan lupa pantau dan follow ig kita di
              <a href="https://www.instagram.com/studenia.id/" target="_blank">@studenia.id</a> ❤️
            </span>
          </div>
        </b-alert>
      </b-col>
      <b-col md="6" cols="12">
        <b-card>
          <b-carousel id="carousel-interval" controls indicators img-width="100%" img-height="100%" :interval="5000">
            <b-carousel-slide rounded :img-src="require('@/assets/images/slider/kampus-1.jpg')" />
            <b-carousel-slide rounded :img-src="require('@/assets/images/slider/kampus-2.jpg')" />
            <b-carousel-slide rounded :img-src="require('@/assets/images/slider/kampus-3.jpg')" />
          </b-carousel>
        </b-card>
      </b-col>
      <b-col md="6" cols="12" class="w-100">
        <card-advance-congratulation />
      </b-col>
    </b-row>

    <!-- <b-row class="match-height">
      <b-col xl="4" md="6">
        <ecommerce-medal :data="data.congratulations" />
      </b-col>
      <b-col xl="8" md="6">
        <ecommerce-statistics :data="data.statisticsItems" />
      </b-col>
    </b-row>-->

    <!-- <b-row class="match-height">
      <b-col sm="12" md="6">
        <ecommerce-meetup :data="data.meetup" />
      </b-col>
      <b-col sm="12" md="6">
        <ecommerce-meetup :data="data.meetup" />
      </b-col>
      <b-col sm="12" md="6">
        <ecommerce-meetup :data="data.meetup" />
      </b-col>
      <b-col sm="12" md="6">
        <ecommerce-meetup :data="data.meetup" />
      </b-col>
      <b-col sm="12" md="6">
        <ecommerce-goal-overview :data="data.goalOverview" />
      </b-col>
    </b-row>-->

    <b-row class="match-height">
      <b-col cols="12" class="mb-2">
        <div class="d-flex flex-wrap justify-content-between align-items-center">
          <h3>
            Try Out Saintek Terbaru
            <span>
              <b-badge variant="light-danger">Gratis</b-badge>
            </span>
          </h3>
          <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="success">
            <feather-icon icon="FileTextIcon" class="mr-50" />
            <router-link style="color:white" :to="{name: 'try-out/gratis/saintek', params: { jenis: 'gratis', kategori: 'saintek' }}">Try Out Lainnya</router-link>
          </b-button>
        </div>
      </b-col>
      <b-col cols="12" sm="6" md="4">
        <ecommerce-meetup />
      </b-col>
      <b-col cols="12" sm="6" md="4">
        <ecommerce-meetup />
      </b-col>
      <b-col cols="12" sm="6" md="4">
        <ecommerce-meetup />
      </b-col>
    </b-row>

    <b-row class="match-height my-4">
      <b-col cols="12" class="mb-2">
        <div class="d-flex flex-wrap justify-content-between align-items-center">
          <h3>
            Try Out Soshum Terbaru
            <span>
              <b-badge variant="light-danger">Gratis</b-badge>
            </span>
          </h3>
          <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info">
            <feather-icon icon="FileTextIcon" class="mr-50" />
            <router-link style="color:white" :to="{name: 'try-out/gratis/soshum', params: { jenis: 'gratis', kategori: 'soshum' }}">Try Out Lainnya</router-link>
          </b-button>
        </div>
      </b-col>
      <b-col cols="12" sm="6" md="4">
        <ecommerce-meetup />
      </b-col>
      <b-col cols="12" sm="6" md="4">
        <ecommerce-meetup />
      </b-col>
      <b-col cols="12" sm="6" md="4">
        <ecommerce-meetup />
      </b-col>
    </b-row>

    <b-row class="match-height my-4">
      <!-- <b-col lg="4">
        <b-row class="match-height">
          <b-col lg="6" md="3" cols="6">
            <ecommerce-order-chart :data="data.statisticsOrder" />
          </b-col>
          <b-col lg="6" md="3" cols="6">
            <ecommerce-profit-chart :data="data.statisticsProfit" />
          </b-col>
          <b-col lg="12" md="6">
            <ecommerce-earnings-chart :data="data.earningsChart" />
          </b-col>
        </b-row>
      </b-col>

      <b-col lg="8">
        <ecommerce-revenue-report :data="data.revenue" />
      </b-col>-->
    </b-row>

    <b-row class="match-height">
      <!-- Company Table Card -->
      <!-- <b-col lg="12">
        <ecommerce-company-table :table-data="data.companyTable" />
      </b-col>-->
      <!--/ Company Table Card -->

      <!-- Developer Meetup Card -->
      <!-- <b-col lg="4" md="6">
        <ecommerce-meetup :data="data.meetup" />
      </b-col>-->
      <!--/ Developer Meetup Card -->

      <!-- Browser States Card -->
      <!-- <b-col lg="4" md="6">
        <ecommerce-browser-states />
      </b-col>-->
      <!--/ Browser States Card -->

      <!-- Goal Overview Card -->
      <!-- <b-col lg="4" md="6">
        <ecommerce-goal-overview :data="data.goalOverview" />
      </b-col>-->
      <!--/ Goal Overview Card -->

      <!-- Transaction Card -->
      <!-- <b-col lg="4" md="6">
        <ecommerce-transactions :data="data.transactionData" />
      </b-col>-->
      <!--/ Transaction Card -->
    </b-row>
  </section>
</template>

<script>
import {
  BRow,
  BCol,
  BCarousel,
  BCarouselSlide,
  BCard,
  BAlert,
  BButton,
  BBadge,
} from "bootstrap-vue";

import { getUserData } from "@/auth/utils";
import EcommerceMedal from "./EcommerceMedal.vue";
import EcommerceStatistics from "./EcommerceStatistics.vue";
import EcommerceRevenueReport from "./EcommerceRevenueReport.vue";
import EcommerceOrderChart from "./EcommerceOrderChart.vue";
import EcommerceProfitChart from "./EcommerceProfitChart.vue";
import EcommerceEarningsChart from "./EcommerceEarningsChart.vue";
import EcommerceCompanyTable from "./EcommerceCompanyTable.vue";
import EcommerceMeetup from "./EcommerceMeetup.vue";
import EcommerceBrowserStates from "./EcommerceBrowserStates.vue";
import EcommerceGoalOverview from "./EcommerceGoalOverview.vue";
import EcommerceTransactions from "./EcommerceTransactions.vue";
import CardAdvanceCongratulation from "./CardAdvanceCongratulation.vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BRow,
    BCol,
    BCarousel,
    BCarouselSlide,
    BCard,
    BAlert,
    BButton,
    BBadge,

    EcommerceMedal,
    EcommerceStatistics,
    EcommerceRevenueReport,
    EcommerceOrderChart,
    EcommerceProfitChart,
    EcommerceEarningsChart,
    EcommerceCompanyTable,
    EcommerceMeetup,
    EcommerceBrowserStates,
    EcommerceGoalOverview,
    EcommerceTransactions,
    CardAdvanceCongratulation,
  },
  data() {
    return {
      data: {},
    };
  },
  directives: {
    Ripple,
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/dashboard-ecommerce.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
</style>

<style scoped>
.card .card-body {
  padding: 0 !important;
}
</style>
