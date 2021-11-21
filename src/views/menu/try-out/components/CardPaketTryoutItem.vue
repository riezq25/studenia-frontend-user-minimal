<template>
  <b-card no-body class="card-developer-meetup">
    <!-- <div class="bg-light-primary rounded-top text-center">
      <b-img :src="require('@/assets/images/illustration/email.svg')" alt="Meeting Pic" height="170" />
    </div>-->
    <b-card-body>
      <!-- metting header -->
      <div class="mb-1 d-flex align-items-center justify-content-between">
        <b-card-title class="mb-25">{{ judul.toUpperCase() }}</b-card-title>
        <b-badge v-if="isNew" variant="info" class="badge-glow">Baru</b-badge>
      </div>
      <!--/ metting header -->

      <!-- media -->
      <b-media no-body>
        <b-media-aside class="mr-1">
          <b-avatar rounded variant="light-primary" size="34">
            <feather-icon icon="EditIcon" size="18" />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">Jumlah Soal</h6>
          <small>{{ totalSoal }} Soal</small>
        </b-media-body>
      </b-media>

      <b-media no-body>
        <b-media-aside class="mr-1">
          <b-avatar rounded variant="light-primary" size="34">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-stopwatch"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
              <path
                d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"
              />
            </svg>
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">Total Durasi Waktu</h6>
          <small>{{ durasi }} menit</small>
        </b-media-body>
      </b-media>

      <div class="mt-1">
        <b-button
          block
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="primary"
          class="d-flex justify-content-center align-items-center"
          :to="link"
        >
          <div style="margin-right:7px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
              />
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
              />
            </svg>
          </div>
          <span class="align-middle">Lihat</span>
        </b-button>
      </div>

      <!-- avatar group -->
      <!-- <b-avatar-group class="mt-2 pt-50" size="33">
        <b-avatar v-for="avatar in avatars" :key="avatar.avatar" v-b-tooltip.hover.bottom="avatar.fullName" :src="avatar.avatar" class="pull-up" />
        <h6 class="align-self-center cursor-pointer ml-1 mb-0">+42</h6>
      </b-avatar-group>-->
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BImg,
  BCardBody,
  BCardText,
  BCardTitle,
  BMedia,
  BMediaAside,
  BAvatar,
  BAvatarGroup,
  VBTooltip,
  BMediaBody,
  BBadge,
  BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { integer } from "vee-validate/dist/rules";

/* eslint-disable global-require */
export default {
  components: {
    BCard,
    BImg,
    BCardBody,
    BCardText,
    BCardTitle,
    BMedia,
    BMediaAside,
    BAvatar,
    BAvatarGroup,
    BMediaBody,
    BBadge,
    BButton,
  },
  directives: {
    "b-tooltip": VBTooltip,
    Ripple,
  },
  data() {
    return {
      isActive: true,
    };
  },
  props: {
    isNew: Boolean,
    judul: String,
    totalSoal: Number,
    durasi: Number,
    link:Object
  },
};
</script>
