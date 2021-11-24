<template>
  <b-card no-body class="card-developer-meetup position-relative">
    <div class="bg-light-primary rounded-top text-center">
      <b-img :src="require('@/assets/images/illustration/email.svg')" alt="Meeting Pic" height="170" />
    </div>
    <b-card-body>
      <!-- metting header -->
      <div>
        <div class="my-auto">
          <b-card-title class="mb-25">Try Out UTBK</b-card-title>
          <b-card-text class="mb-0">
            <feather-icon icon="ClockIcon" class="mr-50" />24 November 2021
          </b-card-text>
        </div>
      </div>
      <!--/ metting header -->

      <!-- media -->
      <!-- <b-media v-for="media in data.mediaData" :key="media.avatar" no-body>
        <b-media-aside class="mr-1">
          <b-avatar rounded variant="light-primary" size="34">
            <feather-icon :icon="media.avatar" size="18" />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">{{ media.title }}</h6>
          <small>{{ media.subtitle }}</small>
        </b-media-body>
      </b-media>-->

      <div class="mt-1">
        <router-link :to="{ name: 'cooming-soon'}">
          <b-button block v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">Ikuti Try Out</b-button>
        </router-link>
      </div>
      <div class="position-absolute" style="top:2px; right:2px;">
        <b-badge variant="warning" class="badge-glow">Baru</b-badge>
      </div>
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
  BButton,
  BBadge,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

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
    BButton,
    BBadge,
  },
  directives: {
    "b-tooltip": VBTooltip,
    Ripple,
  },
};
</script>
