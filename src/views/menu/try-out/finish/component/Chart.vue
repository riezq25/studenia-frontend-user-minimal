<template>
  <div>
    <vue-apex-charts type="radialBar" height="200" class="mt-2 mb-0" :options="radialBar.chartOptions" :series="radialBar.series" />
  </div>
</template>

<script>
import { BCard, BCardHeader, BRow, BCol, BCardText } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";

const $strokeColor = "#ebe9f1";
const $textHeadingColor = "#5e5873";
const $goalStrokeColor2 = "#51e5a8";

const data = (159 / 500) * 100;
const peringkat = 159;

const radialBar = {
  series: [data],
  chartOptions: {
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },

        dataLabels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            formatter: function () {
              return peringkat;
            },
            color: "#111",
            fontSize: "36px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: [""],
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
  //   props: {
  //     data: {
  //       type: Object,
  //       default: () => {},
  //     },
  //   },
  data() {
    return {
      radialBar,
    };
  },
};
</script>

<style scoped>
text#SvgjsText2006.apexcharts-text.apexcharts-datalabel-value {
  display: none !important;
}
</style>