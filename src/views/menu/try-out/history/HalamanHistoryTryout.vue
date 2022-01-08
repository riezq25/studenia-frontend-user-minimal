<template>
  <div class="mb-2" v-if="!isLoading">
    <div v-if="tryout" class="card">
      <b-table striped hover responsive :items="tryout.pengerjaan_tryouts" :fields="tableColumns" :busy.sync="isLoading">
        <template #cell(actions)="data">
          <div class="flex justify-content-around">
            <!-- {{data.item.id}} -->
            <button block class="btn mr-1 btn-outline-success" @click="redirectHalamanHasil(data.item.id)">Hasil</button>
            <button block class="btn btn-outline-primary" @click="redirectHalamanReview(data.item.id)">Review</button>
          </div>
        </template>
      </b-table>
    </div>

    <div v-else class="card"></div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import { useRouter } from "@core/utils/utils";

import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import AppTimeline from "@core/components/app-timeline/AppTimeline.vue";
import AppTimelineItem from "@core/components/app-timeline/TimeLineItem.vue";
import {
  BTable,
  BButton,
  BModal,
  VBModal,
  BCardText,
  BRow,
  BCol,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import router from "@/router";

import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import repository from "@repofactory";
const repoPengerjaanTryout = repository.get("pengerjaanTryoutRepository");
export default {
  components: {
    AppTimeline,
    BTable,
    AppTimelineItem,
    BButton,
    BModal,
    BCardText,
    AppCollapse,
    AppCollapseItem,
    BCardActions,
    BRow,
    BCol,
    useToast,
    ToastificationContent,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  setup() {
    const { route } = useRouter();
    const toast = useToast();

    let tryout = ref({});

    const isLoading = ref(false);

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

    const tableColumns = ref([
      { key: "id", label: "ID", sortable: true },
      { key: "mulai", label: "Mulai", sortable: true },
      { key: "finished_at", label: "Selesai", sortable: true },
      {
        key: "durasi",
        label: "Durasi",
        sortable: true,
        formatter: (value, key, item) => {
          return (item.hasil.waktu / 1000 / 60).toFixed(2);
        },
      },
      {
        key: "benar",
        label: "Benar",
        sortable: true,
        formatter: (value, key, item) => {
          return item.hasil.benar;
        },
      },
      {
        key: "salah",
        label: "Salah",
        sortable: true,
        formatter: (value, key, item) => {
          return item.hasil.salah;
        },
      },
      {
        key: "kosong",
        label: "Kosong",
        sortable: true,
        formatter: (value, key, item) => {
          return item.hasil.kosong;
        },
      },
      { key: "actions" },
    ]);

    const fetchData = async () => {
      isLoading.value = true;
      await repoPengerjaanTryout
        .histories(route.value.params.id_paket_tryout)
        .then(function (response) {
          isLoading.value = false;

          tryout.value = response.data.data;
        })
        .catch(function (error) {
          if (error.response) {
            showToast(
              "Error",
              error.response.data.message,
              "danger",
              "AlertTriangleIcon"
            );
          } else if (error.request) {
            showToast(
              "Error",
              "Tidak bisa request data ke server",
              "danger",
              "AlertTriangleIcon"
            );
          } else {
            showToast("Error", error.message, "danger", "AlertTriangleIcon");
          }
          isLoading.value = false;
          // isError.value = true
        });
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

    const redirectHalamanHasil = (id_pengerjaan) => {
      const params = route.value.params;
      router.push({
        name: "halaman-hasil-tryout",
        params: {
          id_pengerjaan: id_pengerjaan,
        },
      });
    };

    fetchData();

    return {
      tryout,
      isLoading,
      tableColumns,

      // method
      redirectHalamanReview,
      redirectHalamanHasil,
    };
  },
};
</script>

<style scoped>
.timeline-item[data-v-ffb3c5da]:not(:last-of-type) {
  padding-bottom: 15px !important;
}
</style>