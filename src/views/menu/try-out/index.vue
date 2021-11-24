<template>
  <div>
    <b-row class="mb-2 d-flex justify-content-end"></b-row>
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

          />
        </b-link>
      </b-col>
    </b-row>
    <!-- <div class="d-flex justify-content-center align-items-center">
      <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router class="mb-0" />
    </div>-->
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
import CardPaketTryout from "./components/CardPaketTryoutItem.vue";
import { useRouter } from "@core/utils/utils";

import repository from "@repofactory"
const repoTryout = repository.get('tryoutRepository')

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
    const { route } = useRouter()

    let items = ref([]);


    const isLoading = ref(false)

    const fetchData = async () => {
      isLoading.value = true
      await repoTryout.get(route.value.params.jenis, route.value.params.kategori).then(function (response) {
        isLoading.value = false

        items.value = response.data.data
      })
        .catch(function (error) {
          if (error.response) {
            // showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
          } else if (error.request) {
            // showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
          } else {
            // showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
          }
          isLoading.value = false
          // isError.value = true
        });
    }

    const getLink = (item) => {
      const params = route.value.params
      return { name: 'detail-paket-tryout', params: { jenis: params.jenis, kategori: params.kategori, id: item.id } }
    }


    onMounted(async () => {
      fetchData()
    })

    return {
      items,

      // method
      getLink
    };
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce.scss";
</style>