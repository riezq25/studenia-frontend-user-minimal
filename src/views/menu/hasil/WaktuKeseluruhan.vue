<template>
  <div>
    <vue-apex-charts width="450" height="400" type="donut" class="mt-2 mb-0" :options="donut.chartOptions" :series="donut.series" />
  </div>
</template>

<script>
import { BCard, BCardHeader, BRow, BCol, BCardText } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";

const donut = {
  series: [190, 170, 190, 170, 190, 170, 190, 170, 190],

  chartOptions: {
    chart: {
      type: "donut",
    },
    labels: [
      "Bahasa Inggris",
      "Ekonomi",
      "Geografi",
      "Sosiologi",
      "Sejarah",
      "Matematika",
      "Fisika",
      "Biologi",
      "Kimia",
    ],
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
                return `${parseInt(val)} Menit`;
              },
            },
            total: {
              show: true,
              fontSize: "1.3rem",
              label: "Bahasa Inggris",
              formatter() {
                return `30`;
              },
            },
          },
        },
      },
    },

    responsive: [
      //   {
      //     breakpoint: 400,
      //     options: {
      //       chart: {
      //         width: 300,
      //         height: 300,
      //       },
      //       legend: {
      //         height: 50,
      //       },
      //     },
      //   },
      {
        breakpoint: 900,
        options: {
          chart: {
            width: 400,
            height: 400,
          },
          legend: {
            position: "bottom",
            height: "auto",
            horizontalAlign: "center",
          },
        },
      },
      {
        breakpoint: 767,
        options: {
          chart: {
            width: 400,
            height: 400,
          },
        },
      },
      {
        breakpoint: 450,
        options: {
          chart: {
            width: 350,
            height: 350,
          },
          legend: {
            width: "auto",
            fontSize: "14px",
          },
        },
      },
    ],
    legend: {
      position: "right",
      offsetY: 0,
      horizontalAlign: "left",
      height: "auto",
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
