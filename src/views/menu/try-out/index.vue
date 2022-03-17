<template>
  <div>
    <b-overlay :show="isLoading">
      <template #overlay>
        <div class="mt-5">
          <div class="text-center text-danger">
            <b-spinner class="align-middle mr-1"></b-spinner>
            <strong>Sedang memuat data...</strong>
          </div>
        </div>
      </template>
      <b-row>
        <b-col cols="12">
          <div class="d-flex align-items-center justify-content-end mb-2">
            <b-button variant="primary" @click="refresh">
              <feather-icon icon="RefreshCcwIcon" class="mr-50" />
              <span class="text-nowrap">Refresh</span>
            </b-button>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="item in items" :key="item.id" sm="6" md="6" lg="4">
          <b-link>
            <card-paket-tryout
              :tampil="item.is_new"
              :judul="item.nama"
              :totalSoal="item.total_soal"
              :durasi="item.total_durasi"
              :link="getLink(item)"
              :isNew="item.is_new"
              :isOwned="item.is_owned"
              :price="item.harga"
              :id="item.id"
              :jenis="item.jenis"
            />
          </b-link>
        </b-col>

        <b-col cols="12">
          <div class="mt-5" v-if="items.length <= 0">
            <div class="w-100 text-center">
              <div class="mb-2">
                <vuexy-logo width="150" />
              </div>
              <h2 class="my-1 fw-bolder">Belum ada paket di try out ini. 😥</h2>
            </div>
          </div>
        </b-col>
      </b-row>
      <!-- <div class="d-flex justify-content-center align-items-center">
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router class="mb-0" />
      </div>-->
    </b-overlay>
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
  BOverlay,
  BSpinner,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { ref, onMounted } from "@vue/composition-api";
import CardPaketTryout from "./components/CardPaketTryoutItem.vue";
import { useRouter } from "@core/utils/utils";
import VuexyLogo from "@core/layouts/components/Logo.vue";

import repository from "@repofactory";
const repoTryout = repository.get("tryoutRepository");

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
    CardPaketTryout,
    VuexyLogo,
    BOverlay,
    BSpinner,
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
    const { route } = useRouter();

    let items = ref([]);

    const isLoading = ref(false);

    const fetchData = async () => {
      isLoading.value = true;
      await repoTryout
        .get(route.value.params.jenis, route.value.params.kategori)
        .then(function (response) {
          isLoading.value = false;

          items.value = response.data.data;
        })
        .catch(function (error) {
          if (error.response) {
            // showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
          } else if (error.request) {
            // showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
          } else {
            // showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
          }
          isLoading.value = false;
          // isError.value = true
        });
    };

    const refresh = () => {
      fetchData()
    }

    const getLink = (item) => {
      const params = route.value.params;
      return {
        name: "detail-paket-tryout",
        params: { jenis: params.jenis, kategori: params.kategori, id: item.id },
      };
    };

    onMounted(async () => {
      fetchData();
    });

    return {
      items,
      isLoading,

      // method
      getLink,
      refresh
    };
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce.scss";
</style>