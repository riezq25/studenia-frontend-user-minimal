<template>
  <div>
    <vue-apex-charts width="330" height="330" type="donut" class="mt-2 mb-0" :options="donut.chartOptions" :series="donut.series" />
  </div>
</template>

<script>
import { BCard, BCardHeader, BRow, BCol, BCardText } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BRow,
    BCardText,
    BCol,
  },

  props: ["total_jawaban"],

  data() {
    let { benar, kosong, ragu, salah, total_soal } = this.total_jawaban;

    let donut = {
      series: [benar, salah, kosong, ragu],
      chartOptions: {
        colors: [
          "rgb(0, 227, 150)",
          "rgb(255, 69, 96)",
          "rgb(254, 176, 25)",
          "#4b4b4b",
        ],
        chart: {
          type: "donut",
          labels: {
            show: true,
          },
        },
        labels: [
          "Jawaban Benar",
          "Jawaban Salah",
          "Jawaban Kosong",
          "Jawaban Ragu",
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
                  fontSize: "1.05rem",
                  label: "Jumlah Soal",
                  formatter() {
                    return `${total_soal}`;
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

    return {
      donut,
    };
  },
};
</script>
