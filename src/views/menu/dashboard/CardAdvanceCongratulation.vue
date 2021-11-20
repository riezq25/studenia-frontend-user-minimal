<template>
  <b-card text-variant="center" class="card card-congratulations">
    <!-- images -->
    <b-img :src="require('@/assets/images/elements/decore-left.png')" class="congratulations-img-left" />
    <b-img :src="require('@/assets/images/elements/decore-right.png')" class="congratulations-img-right" />
    <!--/ images -->

    <b-avatar variant="primary" size="70" class="shadow mb-2">
      <feather-icon size="28" icon="AwardIcon" />
    </b-avatar>
    <h1 class="mb-1 mt-50 text-white">Selamat Datang {{nama}}</h1>
    <b-card-text class="m-auto w-75">
      Selamat belajar di
      <strong>Studenia</strong> 😊
      <br />Chek selalu update informasi dari kami.
    </b-card-text>
  </b-card>
</template>

<script>
import { BCard, BImg, BAvatar, BCardText } from "bootstrap-vue";
import { ref } from "@vue/composition-api";
import store from "@/store/index";

export default {
  components: {
    BCard,
    BAvatar,
    BImg,
    BCardText,
  },
  setup() {
    const nama = ref(store.state.auth.user.info.name);
    return { nama };
  },
};
</script>
