<template>
  <div>
    <vue-apex-charts width="350" height="350" type="donut" class="mt-2 mb-0" :options="donut.chartOptions" :series="donut.series" />
  </div>
</template>

<script>
import { BCard, BCardHeader, BRow, BCol, BCardText } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";

const donut = {
  series: [190, 170],

  chartOptions: {
    colors: ["rgb(0, 227, 150)", "rgb(255, 69, 96)"],
    chart: {
      type: "donut",
    },
    labels: ["Soal Benar", "Soal Salah"],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: ".7rem",
              fontFamily: "Montserrat",
            },
            value: {
              fontSize: "1.5rem",
              fontFamily: "Montserrat",
              formatter(val) {
                return `${parseInt(val)}`;
              },
            },
            total: {
              show: true,
              fontSize: "1.1rem",
              label: "Soal Benar",
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
            height: 50,
          },
        },
      },
      {
        breakpoint: 950,
        options: {
          chart: {
            width: 300,
            height: 300,
          },
          legend: {
            height: 50,
          },
        },
      },
    ],
    legend: {
      position: "bottom",
      offsetY: 0,
      height: 50,
      fontSize: "15px",
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
