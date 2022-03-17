<template>
  <div v-if="!isLoading" class="pb-6">
    <app-collapse accordion :type="'margin'">
      <b-row>
        <b-col cols="12" xl="9" md="8">
          <b-card-actions title="Pertanyaaan" action-collapse>
            <b-row class="invoice-spacing my-0">
              <b-col cols="12" class="mb-lg-1">
                <div class="d-flex justify-content-between mb-2">
                  <p class="font-weight-bolder mb-0">Soal {{ currentIndex + 1 }}</p>
                  <b-badge variant="primary">
                    <feather-icon icon="ClockIcon" class="mr-25" />
                    <span>{{ formatTime(listSoal[currentIndex].waktu / 1000) }}</span>
                  </b-badge>
                </div>
                <vue-mathjax :safe="false" class="resize-font lh-base" :formula="listSoal[currentIndex].pertanyaan"></vue-mathjax>

                <div class="mt-1">
                  <b-button
                    v-for="(pil, key, index) in listSoal[currentIndex].pilihan"
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    :key="index"
                    :variant="key.toUpperCase() == listSoal[currentIndex].kunci_jawaban || (key.toUpperCase() == listSoal[currentIndex].jawaban && listSoal[currentIndex].is_benar) ? 'primary' : (key.toUpperCase() == listSoal[currentIndex].jawaban) ? 'danger' : 'flat-secondary'"
                    class="mb-75 py-1 text-left"
                    block
                  >
                    <div class="d-flex lh-lg" style="line-height:1.5">
                      <span class="mr-1 resize-font">{{ key.toUpperCase() }}.</span>
                      <vue-mathjax :safe="false" class="resize-font lh-base" :formula="pil"></vue-mathjax>
                    </div>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </b-card-actions>

          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Pembahasan</h4>
            </div>
            <div class="card-body">
              <b-card-actions title="Pembahasan Text" action-collapse>
                <div class="d-flex flex-column">
                  <p>Jawaban Anda : {{ listSoal[currentIndex].jawaban }}</p>
                  <p>Kunci Jawaban : {{ listSoal[currentIndex].kunci_jawaban }}</p>
                </div>
                <vue-mathjax :safe="false" class="resize-font lh-base" :formula="listSoal[currentIndex].pembahasan_text"></vue-mathjax>
              </b-card-actions>

              <b-card-actions title="Pembahasan Video" action-collapse>
                <div v-if="listSoal[currentIndex].pembahasan_video">
                  <div class="embed-responsive embed-responsive-16by9">
                    <iframe
                      :src="'https://www.youtube.com/embed/' + listSoal[currentIndex].pembahasan_video"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
                <div v-else>
                  <div class="d-flex align-items-center">
                    <feather-icon icon="VideoOffIcon" size="23" class="mr-1" />
                    <span>Tidak ada pembahasan Video</span>
                  </div>
                </div>
              </b-card-actions>
            </div>
          </div>
        </b-col>
        <b-col cols="12" xl="3" md="4" class="mb-5">
          <b-card title="Ubah Ukuran Teks" class="p-1">
            <div>
              <b-form-spinbutton id="sb-maxmin" v-model="defaultFontSize" min="1" max="10" @change="resizeFont('resize-font')" />
            </div>
          </b-card>

          <b-card>
            <div class="card-header px-0">
              <h4 class="card-title">Nomor Soal</h4>
            </div>
            <hr />

            <div class="d-sm-flex my-2 d-none justify-content-between align-items-center nav-bottom">
              <b-button class="m-0 py-1 px-md-0 d-flex align-items-center justify-content-center" block variant="primary" :disabled="currentIndex == 0 ? true : false" @click="clickPrev">
                <feather-icon icon="ChevronLeftIcon" size="20" />
                <span>Prev</span>
              </b-button>

              <b-button
                class="m-0 py-1 px-md-0 d-flex align-items-center justify-content-center"
                block
                variant="primary"
                :disabled="currentIndex == (jumlahSoal - 1) ? true : false"
                @click="clickNext"
              >
                <span>Next</span>
                <feather-icon icon="ChevronRightIcon" size="20" />
              </b-button>
            </div>
            <div>
              <div class="overflow-auto my-1">
                <div class="d-flex justify-content-center flex-wrap btn-soal">
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    size="sm"
                    style="width:40px; height:40px"
                    :variant="currentIndex == index ? 'primary' : currentIndex != index && jml.is_benar ? 'success' : 'danger'"
                    v-for="(jml, index) in listSoal"
                    :key="jml.id"
                    @click="clickSoal(index)"
                  >
                    <div class="d-flex justify-content-center align-items-center">{{ index + 1 }}</div>
                  </b-button>
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </app-collapse>

    <b-card-body class="w-100 p-0 d-sm-none fixed-bottom">
      <b-card class="p-0 m-0">
        <div class="d-flex justify-content-between align-items-center nav-bottom">
          <b-button class="m-0 py-1 d-flex align-items-center justify-content-center" block variant="primary" :disabled="currentIndex == 0 ? true : false" @click="clickPrev">
            <feather-icon icon="ChevronLeftIcon" size="20" />
            <span>Prev</span>
          </b-button>
          <b-button class="m-0 py-1 d-flex align-items-center justify-content-center" block variant="primary" :disabled="currentIndex == (jumlahSoal - 1) ? true : false" @click="clickNext">
            <span>Next</span>
            <feather-icon icon="ChevronRightIcon" size="20" />
          </b-button>
        </div>
      </b-card>
    </b-card-body>
  </div>
</template>

<script>
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import { ref, onMounted, computed } from "@vue/composition-api";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { useRouter } from "@core/utils/utils";
import { VueMathjax } from "vue-mathjax";

import Ripple from "vue-ripple-directive";
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BButton,
  BCardText,
  BForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BFormTextarea,
  BFormCheckbox,
  BPopover,
  BAlert,
  BLink,
  VBToggle,
  BFormSpinbutton,
  BBadge,
} from "bootstrap-vue";

import repository from "@repofactory";
const repoPaket = repository.get("paketMapelRepository");
import router from "@/router";

export default {
  components: {
    AppCollapse,
    AppCollapseItem,
    BCardActions,
    BBadge,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BButton,
    BCardText,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BFormTextarea,
    BFormCheckbox,
    BPopover,
    BAlert,
    BLink,
    VBToggle,
    VueMathjax,
    BFormSpinbutton,
  },
  directives: {
    Ripple,
    "b-toggle": VBToggle,
  },

  setup() {
    const { route } = useRouter();
    const toast = useToast();

    const idMapel = route.value.params.id;

    const isLoading = ref(true);
    const currentIndex = ref(0);
    const isSubmitting = ref(false);
    const isError = ref(false);

    const listSoal = ref([]);

    const jumlahSoal = computed(() => {
      return listSoal.value.length;
    });

    const defaultFontSize = ref(1);

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

    const formatTime = (seconds) => {
      let m = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0"),
        s = Math.floor(seconds % 60)
          .toString()
          .padStart(2, "0");

      return `${m}:${s}`;
    };

    const redirectHalamanReview = (id_pengerjaan) => {
      const params = route.value.params;
      router.push({
        name: "halaman-awal-review-tryout",
        params: {
          id_pengerjaan: id_pengerjaan,
        },
      });
    };

    let buttons = ref(["a", "b", "c", "d", "e"]);

    const clickNext = () => {
      currentIndex.value++;
    };

    const clickPrev = () => {
      currentIndex.value--;
    };

    const clickSoal = (index) => {
      currentIndex.value = index;
    };

    const resizeFont = (className) => {
      const els = document.getElementsByClassName(className);
      els.forEach((el) => {
        const size = `${defaultFontSize.value + 13}px`;
        el.style.fontSize = size;
      });
    };

    if (!route.value.params.soal) {
      redirectHalamanReview(route.value.params.id_pengerjaan);
    } else {
      listSoal.value = route.value.params.soal;
      isLoading.value = false;
    }

    return {
      isLoading,
      jumlahSoal,
      listSoal,
      currentIndex,
      buttons,
      defaultFontSize,
      clickNext,
      clickPrev,
      clickSoal,
      resizeFont,
      formatTime,
    };
  },
};
</script>

<style scoped>
.nav-bottom {
  gap: 20px !important;
}
.btn-soal {
  gap: 5px !important;
  /* height: 150px; */
}

/* @media (max-width: 767.98px) {
  .btn-soal {
    height: auto;
  }
} */
</style>