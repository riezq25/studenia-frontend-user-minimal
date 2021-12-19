<template>
  <div>
    <vue-apex-charts width="300" height="300" type="donut" class="mt-2 mb-0" :options="donut.chartOptions" :series="donut.series" />
  </div>
</template>

<script>
import { BCard, BCardHeader, BRow, BCol, BCardText } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";

const donut = {
  series: [30, 30, 40],
  chartOptions: {
    chart: {
      type: "donut",
      labels: {
        show: true,
      },
    },
    labels: ["Jawaban Benar", "Jawaban Salah", "Jawaban Kosong"],
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${parseInt(val)}`;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: ".5rem",
              fontFamily: "Montserrat",
            },
            value: {
              fontSize: "1rem",
              fontFamily: "Montserrat",
              formatter(val) {
                return `${parseInt(val)}`;
              },
            },
            total: {
              show: true,
              fontSize: ".9rem",
              label: "Jawaban Benar",
              formatter() {
                return `30`;
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 400,
        options: {
          chart: {
            width: 300,
            height: 300,
          },
          legend: {
            height: 70,
          },
        },
      },
    ],
    legend: {
      position: "bottom",
      offsetY: 0,
      height: 50,
      fontSize: "13px",
    },
  },
};

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BRow,
    BCardText,
    BCol,
  },
  data() {
    return {
      donut,
    };
  },
};
</script>
