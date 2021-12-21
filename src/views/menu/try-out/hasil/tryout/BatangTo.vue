<template>
  <div id="chart">
    <vue-apex-charts type="bar" height="350" :options="bar.chartOptions" :series="bar.series"></vue-apex-charts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    VueApexCharts,
  },

  props: ["jawaban_mapel"],

  data() {
    let { paket_mapels } = this.jawaban_mapel;

    let benar = [];
    let salah = [];
    let kosong = [];
    let ragu = [];
    let mapel = [];

    for (let i = 0; i < paket_mapels.length; i++) {
      const element = paket_mapels[i];
      benar.push(element.benar);
      salah.push(element.salah);
      kosong.push(element.kosong);
      ragu.push(element.ragu);
      mapel.push(element.info.mapel_soal.nama);
    }

    const bar = {
      series: [
        {
          name: "Jawaban Benar",
          data: [...benar],
        },
        {
          name: "Jawaban Salah",
          data: [...salah],
        },
        {
          name: "Jawaban Kosong",
          data: [...kosong],
        },
        {
          name: "Jawaban Ragu",
          data: [...ragu],
        },
      ],
      chartOptions: {
        colors: [
          "rgb(0, 227, 150)",
          "rgb(255, 69, 96)",
          "rgb(254, 176, 25)",
          "#4b4b4b",
        ],
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          type: "string",
          categories: [...mapel],
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
          colors: [
            "rgb(0, 227, 150)",
            "rgb(255, 69, 96)",
            "rgb(254, 176, 25)",
            "#4b4b4b",
          ],
        },
        responsive: [
          {
            breakpoint: 940,
            options: {
              xaxis: {
                offsetX: 10,
              },
            },
          },
          {
            breakpoint: 587,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 10,
                height: 50,
              },
              xaxis: {
                offsetX: 10,
              },
            },
          },
        ],
      },
    };

    return {
      bar,
    };
  },
};
</script>