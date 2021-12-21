<template>
  <div>
    <vue-apex-charts width="380" height="380" type="donut" class="mt-2 mb-0" :options="donut.chartOptions" :series="donut.series" />
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
  props: ["jawaban"],
  data() {
    let benarTotal = null;
    let salahTotal = null;
    let kosongTotal = null;
    let raguTotal = null;
    let totalSoal = null;

    for (let i = 0; i < this.jawaban.penilaian.length; i++) {
      const element = this.jawaban.penilaian[i];
      console.log(element);
      benarTotal += element.benar;
      salahTotal += element.salah;
      kosongTotal += element.kosong;
      raguTotal += element.ragu;
      totalSoal += element.total_soal;
    }

    let donut = {
      series: [benarTotal, salahTotal, kosongTotal, raguTotal],

      chartOptions: {
        colors: [
          "rgb(0, 227, 150)",
          "rgb(255, 69, 96)",
          "rgb(254, 176, 25)",
          "#4b4b4b",
        ],
        chart: {
          type: "donut",
        },
        labels: ["Soal Benar", "Soal Salah", "Soal Kosong", "Soal Ragu"],
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
                  label: "Jumlah Soal",
                  colors: "rgb(0, 227, 150)",
                  formatter() {
                    return `${totalSoal}`;
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
                width: 330,
                height: 330,
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

    return {
      donut,
    };
  },
};
</script>
