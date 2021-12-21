<template>
  <div>
    <vue-apex-charts width="500" height="400" type="donut" class="mt-2 mb-0" :options="donut.chartOptions" :series="donut.series" />
  </div>
</template>

<script>
import { BCard, BCardHeader, BRow, BCol, BCardText } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import others from "@/navigation/vertical/others";

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardHeader,
    BRow,
    BCardText,
    BCol,
  },
  props: ["total_waktu"],

  data() {
    let { penilaian, ...others } = this.total_waktu;

    let { waktu, paket_mapels } = penilaian;

    let seriesExtract = [];
    let labelExtract = [];
    let waktuTotal = null;

    for (let i = 0; i < penilaian.length; i++) {
      const element = penilaian[i];
      const paketMapel = element.paket_mapels;

      waktuTotal += element.waktu;

      for (let j = 0; j < paketMapel.length; j++) {
        seriesExtract.push(Math.floor(paketMapel[j].waktu / 3600));
        labelExtract.push(paketMapel[j].info.mapel_soal.nama);
      }
    }

    let donut = {
      series: [...seriesExtract],

      chartOptions: {
        chart: {
          type: "donut",
        },
        labels: [...labelExtract],
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
                  fontSize: "1.05rem",
                  label: "Total Waktu Pengerjaan",
                  formatter() {
                    return `${Math.floor(waktuTotal / 3600)} Menit`;
                  },
                },
              },
            },
          },
        },

        responsive: [
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
                width: 400,
                height: 400,
              },
              legend: {
                width: "auto",
                fontSize: "13px",
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

    return {
      donut,
    };
  },
};
</script>
