<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height mb-4">
      <b-col cols="12">
        <b-alert variant="success" show>
          <div class="alert-body">
            <span>Halaman ini demo dari Dashboard User</span>
          </div>
        </b-alert>
      </b-col>
      <b-col md="6" cols="12">
        <b-card>
          <b-carousel id="carousel-interval" controls indicators img-width="100%" img-height="100%" :interval="5000">
            <b-carousel-slide rounded :img-src="require('@/assets/images/slider/02.jpg')" />
            <b-carousel-slide rounded :img-src="require('@/assets/images/slider/03.jpg')" />
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

    <b-row class="match-height">
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
    </b-row>

    <b-row class="match-height">
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
      <b-col lg="12">
        <ecommerce-company-table :table-data="data.companyTable" />
      </b-col>
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

export default {
  components: {
    BRow,
    BCol,
    BCarousel,
    BCarouselSlide,
    BCard,
    BAlert,

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
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/dashboard-ecommerce.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
</style>

<style scoped>
</style>
