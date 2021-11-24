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
      <h4 style="color:white">
        Selamat belajar di
        <strong>Studenia</strong> 😊
        <br />
        <span class="mt-1">Chek selalu update informasi dari kami.</span>
      </h4>
    </b-card-text>
    <blockquote class="blockquote mt-3">
      <p class="mb-0">"Ikhlaslah belajar. Bahkan yang paling berilmu dan bijak di antara kita masih rajin belajar."</p>
      <p class="blockquote-footer" style="font-size:1rem; font-style:italic; margin-top:5px">Mario Teguh</p>
    </blockquote>
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

<style scoped>
p.blockquote-footer {
  color: white !important;
}
</style>