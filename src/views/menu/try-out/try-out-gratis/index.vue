<template>
  <div>
    <b-row class="mb-2 d-flex justify-content-end"></b-row>
    <b-row>
      <b-col v-for="item in items" :key="item.id" sm="6" md="6" lg="4">
        <b-link>
          <item :tampil="item.is_new" :judul="item.judul" :totalSoal="item.total_soal" :durasi="item.durasi" />
        </b-link>
      </b-col>
    </b-row>
    <div class="d-flex justify-content-center align-items-center">
      <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router class="mb-0" />
    </div>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BForm,
  BInputGroup,
  BFormInput,
  BCardText,
  BInputGroupAppend,
  BInputGroupPrepend,
  BButton,
  BImg,
  BLink,
  BPaginationNav,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { ref, onMounted } from "@vue/composition-api";
import item from "./item.vue";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardText,
    BForm,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BFormInput,
    BButton,
    BImg,
    BLink,
    BPaginationNav,
    item,
  },
  directives: {
    Ripple,
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
  },
  setup() {
    let items = ref([
      {
        id: 1,
        is_new: true,
        judul: "Try Out November",
        total_soal: 120,
        durasi: "1 jam 20 menit",
      },
      {
        id: 1,
        is_new: false,
        judul: "Try Out Desember",
        total_soal: 112,
        durasi: "1 jam 5 menit",
      },
      {
        id: 1,
        is_new: true,
        judul: "Try Out Januari",
        total_soal: 98,
        durasi: "1 jam",
      },
      {
        id: 1,
        is_new: false,
        judul: "Try Out Februari",
        total_soal: 130,
        durasi: "1 jam 10 menit",
      },
      {
        id: 1,
        is_new: true,
        judul: "Try Out Maret",
        total_soal: 100,
        durasi: "55 Menit",
      },
    ]);

    return {
      items,
    };
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce.scss";
</style>