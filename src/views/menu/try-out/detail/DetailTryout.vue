<template>
  <div class="mb-2">
    <app-collapse accordion :type="'margin'">
      <b-row>
        <div class="d-flex align-items-center justify-content-end">
          <div class="d-none d-sm-block">
            <b-button variant="relief-success py-1" v-b-modal.modal-success>
              <span style="font-size:1.2rem">Kerjakan</span>
            </b-button>
          </div>
        </div>
      </b-row>
      <b-row>
        <!-- <b-col cols="12" v-for="item in tryout.paket_kategoris">
          <b-card-actions title="Detail Paket" action-collapse></b-card-actions>
        </b-col>-->

        <b-col cols="12" v-for="item in tryout.paket_kategoris">
          <b-card-actions :title="item.kategori_soal.nama.toUpperCase()" action-collapse>
            <app-timeline>
              <app-timeline-item
                v-for="paketMapel in item.paket_mapels "
                :title="paketMapel.mapel_soal.nama.toUpperCase()"
                icon="CircleIcon"
                :time="paketMapel.pivot.durasi"
                :soal="paketMapel.jumlah_soal"
                variant="primary"
              />
            </app-timeline>
          </b-card-actions>
        </b-col>
      </b-row>
    </app-collapse>

    <div class="w-100 p-0 d-sm-none fixed-bottom">
      <div>
        <b-button block variant="relief-success py-2" v-b-modal.modal-success>
          <span style="font-size:1.2rem">Kerjakan</span>
        </b-button>
      </div>
    </div>

    <b-modal
      id="modal-success"
      ok-variant="success"
      ok-title="Kerjakan"
      cancel-title="Batal"
      cancel-variant="outline-secondary"
      modal-class="modal-success"
      centered
      title="Kerjakan Soal"
      @ok="requestPengerjaan"
    >
      <b-card-text>
        Sebelum mengerjakan jangan lupa untuk berdoa dan pastikan jaringan internet Anda lancar. Setelah klik kerjakan Anda harus menyelesaikan semua pengerjaan Anda dan
        <span
          class="text-danger fw-bolder"
        >dilarang meninggalkan aplikasi</span>.
      </b-card-text>
    </b-modal>
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import { useRouter } from "@core/utils/utils";
import store from "@/store/index";



import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import AppTimeline from "@core/components/app-timeline/AppTimeline.vue";
import AppTimelineItem from "@core/components/app-timeline/TimeLineItem.vue";
import { BButton, BModal, VBModal, BCardText, BRow, BCol } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import router from "@/router";

import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import repository from "@repofactory"
const repoTryout = repository.get('tryoutRepository')
const repoPengerjaanTryout = repository.get('pengerjaanTryoutRepository')
export default {
  components: {
    AppTimeline,
    AppTimelineItem,
    BButton,
    BModal,
    BCardText,
    AppCollapse,
    AppCollapseItem,
    BCardActions,
    BRow, BCol,
    useToast,
    ToastificationContent
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  setup() {
    const { route } = useRouter()
    const toast = useToast()


    let tryout = ref({});


    const isLoading = ref(false)

    const showToast = (title, text, variant, icon = 'BellIcon') => {
      toast({
        component: ToastificationContent,
        props: {
          title,
          icon,
          text,
          variant,
        },
      })
    }

    const fetchData = async () => {
      isLoading.value = true
      await repoTryout.show(route.value.params.id).then(function (response) {
        isLoading.value = false

        tryout.value = response.data.data
      })
        .catch(function (error) {
          if (error.response) {
            showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
          } else if (error.request) {
            showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
          } else {
            showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
          }
          isLoading.value = false
          // isError.value = true
        });
    }

    const requestPengerjaan = async () => {
      await repoPengerjaanTryout.request(route.value.params.id).then(function (response) {

        redirectHalamanPengerjaan(response.data.data.id)
      })
        .catch(function (error) {
          if (error.response) {
            showToast('Error', error.response.data.message, 'danger', 'AlertTriangleIcon')
          } else if (error.request) {
            showToast('Error', "Tidak bisa request data ke server", 'danger', 'AlertTriangleIcon')
          } else {
            showToast('Error', error.message, 'danger', 'AlertTriangleIcon')
          }
          // isLoading.value = false
          // isError.value = true
        });
    }

    const redirectHalamanPengerjaan = (id_pengerjaan) => {
      const params = route.value.params
      router.push({ name: 'start-paket-tryout', params: { jenis: params.jenis, kategori: params.kategori, id: params.id, id_pengerjaan: id_pengerjaan } })
    }

    onMounted(async () => {
      fetchData()
    })

    return {
      tryout,

      // method
      redirectHalamanPengerjaan, requestPengerjaan
    };
  },
};
</script>

<style scoped>
.timeline-item[data-v-ffb3c5da]:not(:last-of-type) {
  padding-bottom: 15px !important;
}
</style>