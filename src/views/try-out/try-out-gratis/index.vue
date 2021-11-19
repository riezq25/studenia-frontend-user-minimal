<template>
  <div>
    <b-row class="mb-2 d-flex justify-content-end">
      <b-col cols="12" md="8">
        <b-input-group class="input-group-merge">
          <b-form-input placeholder="Cari Try Out" class="search-product" />
          <b-input-group-append is-text>
            <feather-icon icon="SearchIcon" class="text-muted" />
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for="item in items" :key="item" sm="6" md="4">
        <b-card class="ecommerce-card" no-body>
          <div class="item-img text-center">
            <b-img fluid class="card-img-top" src="https://images.unsplash.com/photo-1637249820580-a877474a889d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" />
          </div>

          <b-card-body>
            <!-- <div class="item-wrapper">
          <div class="item-rating"></div>
          <div>
            <h6 class="item-price">jfalfljl</h6>
          </div>
        </div>
        <h6 class="item-name">
          <b-card-text class="item-company">
            By
            <b-link class="ml-25">fajlf</b-link>
          </b-card-text>
            </h6>-->
            <b-card-text class="item-description">faljflajf</b-card-text>
          </b-card-body>

          <!-- Action Buttons -->
          <div>
            <b-link :to="{name: 'user/try-out/gratis/campuran/detail-try-out'}">
              <b-button block variant="primary" class="btn-cart move-cart py-1">
                <feather-icon icon="Edit2Icon" class="mr-50" size="15" />
                <span>Kerjakan</span>
              </b-button>
            </b-link>
          </div>
        </b-card>
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
    let items = ref(5);

    return {
      items,
    };
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce.scss";
</style>