<template>
  <div id="chart">
    <vue-apex-charts type="bar" height="350" :options="bar.chartOptions" :series="bar.series"></vue-apex-charts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

const bar = {
  series: [
    {
      name: "Jawaban Benar",
      data: [44, 55, 41, 67, 22],
    },
    {
      name: "Jawaban Salah",
      data: [13, 23, 20, 8, 13],
    },
    {
      name: "Jawaban Kosong",
      data: [11, 17, 15, 15, 21],
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
      categories: [
        "BAHASA INGGRIS",
        "EKONOMI",
        "GEOGRAFI",
        "SOSIOLOGI",
        "SEJARAH",
      ],
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

export default {
  components: {
    VueApexCharts,
  },
  data() {
    return {
      bar,
    };
  },
};
</script>