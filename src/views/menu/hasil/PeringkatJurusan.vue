<template>
  <div class="mt-2">
    <!-- <div class="profile-image-wrapper">
      <div class="profile-image p-0">
        <b-avatar size="114" variant="light" :src="require('@/assets/images/portrait/small/avatar-s-9.jpg')" />
      </div>
    </div>-->
    <h3 style="font-weight: 900;">
      <!-- <feather-icon icon="UserIcon" size="20" class="mr-25" /> -->
      <b-avatar size="30" variant="light-success">
        <feather-icon size="17" icon="UserIcon" />
      </b-avatar>
      <span class="ml-1">Wildan Alif Rioditama</span>
    </h3>
    <h5 class="text-muted">
      <b-avatar size="30" variant="light-warning">
        <feather-icon size="17" icon="MapPinIcon" />
      </b-avatar>
      <span class="ml-1">Jawa Timur</span>
    </h5>
    <!-- <b-badge class="profile-badge" variant="light-primary">Pro Level</b-badge> -->
    <hr class="mb-2" />

    <!-- follower projects rank -->
    <!-- <div class="d-flex justify-content-between align-items-center">
      <div class="text-center">
        <div class="mb-1">
          <b-badge variant="success">
            <feather-icon icon="StarIcon" class="mr-25" />
            <span>Soal Benar</span>
          </b-badge>
        </div>
        <h3 class="mb-0">30 Soal</h3>
      </div>
      <div class="text-center">
        <div class="mb-1">
          <b-badge variant="danger">
            <feather-icon icon="StarIcon" class="mr-25" />
            <span style="font-size:15px">Soal Salah</span>
          </b-badge>
        </div>
        <h3 class="mb-0">10 Soal</h3>
      </div>
      <div class="text-center">
        <div class="mb-1">
          <b-badge variant="warning">
            <feather-icon icon="StarIcon" class="mr-25" />
            <span>Soal Kosong</span>
          </b-badge>
        </div>
        <h3 class="mb-0">5 Soal</h3>
      </div>
    </div>-->
    <!--/ follower projects rank -->
    <b-row>
      <b-col cols="12">
        <h4>Pilihan Kamu di</h4>
        <div class="d-flex flex-column flex-md-row justify-content-center align-items-center align-items-md-start justify-content-md-start mt-1 border border-primary rounded p-1">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" style="width:50px; height:50px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <div class="d-flex flex-column ml-1">
            <div>
              <h5>Jurusan : Teknik Elektro</h5>
              <h5>Fakultas : Sains dan Teknologi</h5>
              <h5>Kampus : Institut Teknologi Bandung</h5>
            </div>
          </div>
        </div>
      </b-col>
      <b-col md="6" class="my-1 md:my-0">
        <h4>Peringkat Kamu:</h4>
        <b-media no-body>
          <b-media-aside>
            <b-avatar rounded size="80" variant="info">
              <div>
                <h4 style="font-weight:900; font-size:37px">61</h4>
                <div style="font-size:15px">
                  <span style="margin-right:4px">/</span>
                  91
                </div>
              </div>
            </b-avatar>
          </b-media-aside>
        </b-media>
        <div class="mt-2">
          <h5 class="transaction-title">Peringkat Kamu</h5>
          <h6 class="text-muted">
            <span class="font-weight-bolder">61</span> dari 91 orang
          </h6>
        </div>
      </b-col>
      <b-col md="6" class="my-1 md:my-0">
        <h4>Peluang Kamu:</h4>
        <b-media no-body>
          <b-media-aside>
            <b-avatar rounded style="width:auto; height:auto;padding:5px" variant="warning">
              <div>
                <h4 style="font-weight:900; font-size:37px">Kurang</h4>
                <div style="font-size:15px">33.7 % peluang lolos</div>
              </div>
            </b-avatar>
          </b-media-aside>
        </b-media>
        <div class="mt-2">
          <h6 class="text-muted">*Peluang hanya perkiraan</h6>
          <h5 class="transaction-title">Dari hasil perhitungan kami, peluang kamu 33.7 % untuk masuk di jurusan yang kamu inginkan</h5>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BAvatar,
  BBadge,
  BRow,
  BCol,
  BMedia,
  BMediaAside,
} from "bootstrap-vue";

export default {
  components: {
    BBadge,
    BAvatar,
    BRow,
    BCol,
    BMedia,
    BMediaAside,
  },
};
</script>
