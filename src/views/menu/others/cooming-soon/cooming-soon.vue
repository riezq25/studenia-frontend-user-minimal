<template>
  <!-- Coming soon page-->
  <div class="mt-5">
    <div class="w-100 text-center">
      <div class="mb-2">
        <vuexy-logo width="150" />
      </div>
      <h2 class="my-1 fw-bolder">Fitur kami segera launcing 🚀</h2>
      <h4>
        Follow ig kami di
        <a href="https://www.instagram.com/studenia.id/" target="_blank">@studenia.id</a> untuk update selanjutnya 😊
      </h4>
    </div>
  </div>

  <!-- / Coming soon page-->
</template>

<script>
/* eslint-disable global-require */
import { BLink, BForm, BFormInput, BButton, BImg } from "bootstrap-vue";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import store from "@/store/index";

export default {
  components: {
    VuexyLogo,
    BLink,
    BForm,
    BButton,
    BFormInput,
    BImg,
  },
  data() {
    return {
      downImg: require("@/assets/images/pages/coming-soon.svg"),
    };
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require("@/assets/images/pages/coming-soon-dark.svg");
        return this.downImg;
      }
      return this.downImg;
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-misc.scss";
</style>
