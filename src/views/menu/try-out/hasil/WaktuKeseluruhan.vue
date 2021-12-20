<template>
  <div>
    <vue-apex-charts width="450" height="400" type="donut" class="mt-2 mb-0" :options="donut.chartOptions" :series="donut.series" />
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
  props: ["total_waktu"],

  data() {
    let { waktu_keseluruhan, waktu_total } = this.total_waktu;

    // console.log(waktu_total);
    let serie = [];
    let label = [];

    for (let i = 0; i < waktu_keseluruhan.length; i++) {
      const element = waktu_keseluruhan[i];
      serie.push(Math.floor(element.mapel_waktu / 60));
      label.push(element.nama_mapel);
    }

    // console.log(serie);
    // console.log(label);

    let donut = {
      series: [...serie],

      chartOptions: {
        chart: {
          type: "donut",
        },
        labels: [...label],
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
                  fontSize: "1.2rem",
                  label: "Waktu Keseluruhan",
                  formatter() {
                    return `${Math.floor(waktu_total / 60)} Menit`;
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

    return {
      donut,
    };
  },
};
</script>
