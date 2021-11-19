<template>
  <div>
    <section id="knowledge-base-search">
      <b-card no-body class="knowledge-base-bg text-center" :style="{backgroundImage: `url(${require('@/assets/images/banner/banner.png')})`}" style="height:300px">
        <div class="d-flex justify-content-center align-items-center h-100">
          <div class="w-75 width">
            <h3 class="text-primary">"Semua mimpi kita dapat terwujud jika kita berani untuk mewujudkannya"</h3>
            <h4 class="mt-1">-Walt Disney</h4>
            <h2 class="mt-3">
              <span>Sudah siap mulai mengerjakan Try Out?</span>
              <br />
              <!-- <router-link :to="{name:"user-try-out"}">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1">Mulai Sekarang!</b-button>
              </router-link>-->
              <router-link :to="{ name: 'user/try-out/gratis/campuran/detail-try-out'}">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1">Mulai Sekarang!</b-button>
              </router-link>
            </h2>
          </div>
        </div>
      </b-card>
    </section>
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
  BInputGroupPrepend,
  BButton,
  BImg,
  BLink,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

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
    BFormInput,
    BButton,
    BImg,
    BLink,
  },
  directives: {
    Ripple,
  },
};
</script>

<style scoped>
@media (min-width: 576px) {
  .width {
    width: 50%;
  }
}
</style>