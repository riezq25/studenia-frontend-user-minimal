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
    let benar = [];
    let salah = [];
    let kosong = [];
    let mapel = [];

    for (let i = 0; i < this.jawaban_mapel.length; i++) {
      const element = this.jawaban_mapel[i];
      benar.push(element.benar);
      salah.push(element.salah);
      kosong.push(element.kosong);
      mapel.push(element.nama_mapel);
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
      ],
      chartOptions: {
        colors: ["rgb(0, 227, 150)", "rgb(255, 69, 96)", "rgb(254, 176, 25)"],
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
          colors: ["rgb(0, 227, 150)", "rgb(255, 69, 96)", "rgb(254, 176, 25)"],
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
                offsetY: 0,
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