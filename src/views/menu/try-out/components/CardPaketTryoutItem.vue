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
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-stopwatch" viewBox="0 0 16 16">
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

      <b-media no-body v-if="price">
        <b-media-aside class="mr-1">
          <b-avatar rounded variant="light-primary" size="34">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
              <path
                d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"
              />
              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
            </svg>
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h6 class="mb-0">Harga</h6>
          <small>{{ rupiah(price) }}</small>
        </b-media-body>
      </b-media>

      <div class="mt-1">
        <div v-if="jenis != 'GRATIS'">
          <b-button v-if="!isOwned" block v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="success" class="d-flex justify-content-center align-items-center" @click="addCart">
            <div style="margin-right:7px">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
                <path
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                />
              </svg>
            </div>
            <span class="align-middle">Tambahkan ke keranjang</span>
          </b-button>
          <b-button v-else block v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="primary" class="d-flex justify-content-center align-items-center" :to="link">
            <div style="margin-right:7px">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                <path
                  d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            <span class="align-middle">Lihat</span>
          </b-button>
        </div>
        <b-button v-else block v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="primary" class="d-flex justify-content-center align-items-center" :to="link">
          <div style="margin-right:7px">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
              />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
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

import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import repository from "@repofactory";
const repoCart = repository.get("CartRepository");


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
    useToast,
    ToastificationContent,
  },
  directives: {
    "b-tooltip": VBTooltip,
    Ripple,
  },
  props: {
    isNew: Boolean,
    judul: String,
    totalSoal: Number,
    durasi: Number,
    link: Object,
    isOwned: Boolean,
    price: Number,
    id: Number,
    jenis: String
  },
  setup(props) {
    const toast = useToast();

    const showToast = (title, text, variant, icon = "BellIcon") => {
      toast({
        component: ToastificationContent,
        props: {
          title,
          icon,
          text,
          variant,
        },
      });
    };

    let item_id = props.id
    let item_type = 'PAKET-TO'

    const addCart = async () => {

      await repoCart
        .create({ item_id, item_type })
        .then(function (response) {
          showToast('Success', response.data.message, 'success', 'BellIcon')
        })
        .catch(function (error) {
          if (error.response) {
            showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
          } else if (error.request) {
            showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
          } else {
            showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
          }
        });
    };

    function rupiah(x) {
      return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR' }
      ).format(x); // '$100.00'
    }

    return {
      addCart, rupiah
    }

  }
};
</script>
