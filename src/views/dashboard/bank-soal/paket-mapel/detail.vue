<template>
  <div class="pb-6">
    <app-collapse accordion :type="'margin'">
      <b-row>
        <b-col cols="12" xl="9" md="8">
          <app-collapse-item :isVisible="true" title="Kategori: Tes Karakteristik Pribadi (TKP)">
            <div>
              <h1>Ini id ke : {{id}}</h1>
              <hr />
              <div>
                <b-row class="invoice-spacing my-0">
                  <b-col cols="12" class="mb-lg-1">
                    <p>{{currentIndex+1}} . {{soal[currentIndex].pertanyaan}}</p>
                    <div class="mt-1">
                      <b-button v-for="(button) in buttons" :key="button" :variant="soal[currentIndex].kunci_jawaban.toLowerCase() == button ? 'primary':'light'" class="mb-75 pl-2 text-left" block>{{button.toUpperCase()}} . {{soal[currentIndex][`pil_${button}`]}}</b-button>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </app-collapse-item>
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Pembahasan</h4>
            </div>
            <div class="card-body">
              <app-collapse-item title="Pembahasan Text">{{soal[currentIndex].pembahasan_text}}</app-collapse-item>

              <app-collapse-item title="Pembahasan Video">
                <div v-if="soal[currentIndex].pembahasan_video">
                  <!-- {{soal[currentIndex].pembahasan_video}} -->
                  <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" :src="soal[currentIndex].pembahasan_video" allowfullscreen></iframe>
                  </div>
                </div>
                <div v-else>Tidak ada pembahasan Video</div>
              </app-collapse-item>
            </div>
          </div>
        </b-col>
        <b-col cols="12" xl="3" md="4" class="mb-5">
          <b-card>
            <div class="card-header px-0">
              <h4 class="card-title">Nomor Soal</h4>
            </div>
            <hr />
            <div class="d-sm-flex my-2 d-none justify-content-between align-items-center nav-bottom">
              <b-button class="m-0 py-1 px-md-0 d-flex align-items-center justify-content-center" block variant="primary" :disabled="currentIndex==0? true:false" @click="clickPrev">
                <feather-icon icon="ChevronLeftIcon" size="20" />
                <span>Prev</span>
              </b-button>
              <b-button class="m-0 py-1 px-md-0 d-flex align-items-center justify-content-center" block variant="primary" :disabled="currentIndex == (jumlah-1) ? true : false" @click="clickNext">
                <span>Next</span>
                <feather-icon icon="ChevronRightIcon" size="20" />
              </b-button>
            </div>
            <div>
              <div class="overflow-auto my-1">
                <div class="d-flex justify-content-center flex-wrap btn-soal">
                  <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" size="sm" style="width:40px; height:40px" :variant="currentIndex==index? 'primary':'outline-secondary'" v-for="(jml,index) in soal" :key="jml.id" @click="clickSoal(index)">
                    <div class="d-flex justify-content-center align-items-center">{{jml.id}}</div>
                  </b-button>
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </app-collapse>

    <b-card-body class="w-100 pb-0 d-sm-none fixed-bottom">
      <b-card>
        <div class="d-flex justify-content-between align-items-center nav-bottom">
          <b-button class="m-0 py-1 d-flex align-items-center justify-content-center" block variant="primary" :disabled="currentIndex==0? true:false" @click="clickPrev">
            <feather-icon icon="ChevronLeftIcon" size="20" />
            <span>Prev</span>
          </b-button>
          <b-button class="m-0 py-1 d-flex align-items-center justify-content-center" block variant="primary" :disabled="currentIndex == (jumlah-1) ? true : false" @click="clickNext">
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
import { ref, toRefs } from "@vue/composition-api";
import formatSoal from "./format-soal";
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
} from "bootstrap-vue";

export default {
  components: {
    AppCollapse,
    AppCollapseItem,

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
  },
  directives: {
    Ripple,
    "b-toggle": VBToggle,
  },

  //   props: ["id"],

  setup(props) {
    const soal = ref(formatSoal.listSoal);
    const jumlah = ref(soal.value.length);
    let currentIndex = ref(0);
    // let { id } = toRefs(props);
    // let id = props.id;

    // console.log(props.id);

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

    return {
      jumlah,
      soal,
      currentIndex,
      buttons,
      clickNext,
      clickPrev,
      clickSoal,
      //   id,
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
  height: 150px;
}

@media (max-width: 767.98px) {
  .btn-soal {
    height: auto;
  }
}
</style>