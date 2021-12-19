<template>
    <div class="mb-2" v-if="!isLoading">
        <b-row>
            <b-col sm="12" md="8" lg="8">
                <app-collapse
                    accordion
                    :type="'margin'"
                    v-for="(item, index_paket_kategori) in tryout.pengerjaan.paket"
                    :key="item.id"
                >
                    <b-card-actions :title="item.kategori.nama.toUpperCase()" action-collapse>
                        <app-timeline>
                            <app-timeline-item
                                icon="CheckCircleIcon"
                                :variant="paketMapel.is_done ? 'success' : 'danger'"
                                v-for="(paketMapel, index_paket_mapel) in item.paket_mapels "
                                :key="paketMapel.id"
                            >
                                <div>
                                    <h4>{{ paketMapel.mapel.nama.toUpperCase() }}</h4>
                                    <div class="d-flex align-items-center" style="margin-top:8px">
                                        <p class="d-flex align-items-center text-gray">
                                            <feather-icon
                                                icon="ClockIcon"
                                                size="18"
                                                style="margin-right:5px"
                                            />
                                            <span>{{ paketMapel.durasi }} Menit</span>
                                        </p>
                                        <p style="font-size:20px;" class="mx-1 text-gray">|</p>
                                        <p class="d-flex align-items-center text-gray">
                                            <feather-icon
                                                icon="FileTextIcon"
                                                size="18"
                                                style="margin-right:5px"
                                            />
                                            <span>{{ paketMapel.soals.length }} Soal</span>
                                        </p>
                                    </div>

                                    <b-row>
                                        <b-col cols="12">
                                            <h5>Hasil Pengerjaan</h5>
                                        </b-col>
                                        <b-col cols="6">
                                            <statistic-card-horizontal
                                                icon="CheckIcon"
                                                color="info"
                                                :statistic="paketMapel.hasil.benar"
                                                statistic-title="Soal Benar"
                                            />
                                        </b-col>
                                        <b-col cols="6">
                                            <statistic-card-horizontal
                                                icon="XIcon"
                                                color="warning"
                                                :statistic="paketMapel.hasil.salah"
                                                statistic-title="Soal Salah"
                                            />
                                        </b-col>
                                    </b-row>
                                    <b-row class="my-1 mb-2">
                                        <b-col class="w-100">
                                            <div
                                                class="d-flex flex-wrap justify-content-between align-items-center"
                                            >
                                                <div>
                                                    <div
                                                        class="d-flex align-items-center text-gray"
                                                    >
                                                        <h5 class="mb-0 mr-2">Durasi Pengerjaan:</h5>
                                                        <div class="d-flex align-items-center">
                                                            <feather-icon
                                                                icon="ClockIcon"
                                                                size="18"
                                                                style="margin-right:5px"
                                                            />
                                                            <span>{{ (paketMapel.hasil.waktu / 1000 / 60).toFixed(2) }} Menit</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="my-1">
                                                    <button
                                                        @click="redirectHalamanReview(index_paket_kategori, index_paket_mapel)"
                                                        class="btn btn-sm btn-success"
                                                    >Review dan Pembahasan</button>
                                                </div>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </div>
                            </app-timeline-item>
                        </app-timeline>
                    </b-card-actions>
                </app-collapse>
            </b-col>
            <b-col sm="12" md="4" lg="4">
                <app-collapse accordion type="margin">
                    <b-card-actions title="Hasil Pengerjaan" action-collapse>
                        <div class="mb-2">
                            <div class="d-flex flex-column text-muted mb-1">
                                <small>Nama Paket</small>
                                <h4>{{ tryout.pengerjaan.nama.toUpperCase() }}</h4>
                            </div>

                            <div class="d-flex flex-column text-muted mb-1">
                                <small>Tanggal Penilaian</small>
                                <h4>{{ tryout.tanggal_penilaian }}</h4>
                            </div>

                            <div class="d-flex align-items-center mb-1">
                                <p class="d-flex align-items-center text-gray">
                                    <feather-icon icon="ClockIcon" size="18" class="mr-1" />
                                    <span>{{ tryout.pengerjaan.total_durasi }} Menit</span>
                                </p>
                                <p style="font-size:20px;" class="mx-1 text-gray">|</p>
                                <p class="d-flex align-items-center text-gray">
                                    <feather-icon icon="FileTextIcon" size="18" class="mr-1" />
                                    <span>{{ tryout.pengerjaan.total_soal }} Soal</span>
                                </p>
                            </div>
                        </div>

                        <b-row class="match-height">
                            <b-col cols="12">
                                <div class="text-center">
                                    <h5>Total Hasil Pengerjaan</h5>
                                </div>
                            </b-col>
                            <b-col cols="6">
                                <card-selesai
                                    icon="CheckIcon"
                                    :statistic="tryout.pengerjaan.hasil.benar"
                                    statistic-title="Soal Benar"
                                    color="info"
                                />
                            </b-col>
                            <b-col cols="6">
                                <card-selesai
                                    color="warning"
                                    icon="XIcon"
                                    :statistic="tryout.pengerjaan.hasil.salah"
                                    statistic-title="Soal Salah"
                                />
                            </b-col>
                        </b-row>
                    </b-card-actions>
                </app-collapse>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import { useRouter } from "@core/utils/utils";

import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import AppTimeline from "@core/components/app-timeline/AppTimeline.vue";
import AppTimelineItem from "@core/components/app-timeline/TimeLineItem.vue";
import { BButton, BModal, VBModal, BCardText, BRow, BCol } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import router from "@/router";
import CardSelesai from "../components/CardSelesai.vue";

import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import StatisticCardHorizontal from "@core/components/statistics-cards/StatisticCardHorizontal.vue";
import repository from "@repofactory";
const repoTryout = repository.get("tryoutRepository");
const repoPengerjaanTryout = repository.get("pengerjaanTryoutRepository");

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
        BRow,
        BCol,
        useToast, CardSelesai,
        ToastificationContent, StatisticCardHorizontal
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

        const fetchData = async () => {
            isLoading.value = true;
            await repoPengerjaanTryout
                .review(route.value.params.id_pengerjaan)
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

        const redirectHalamanReview = (index_paket_kategori, index_paket_mapel) => {
            const params = route.value.params;

            const soal = tryout.value.pengerjaan.paket[index_paket_kategori].paket_mapels[index_paket_mapel].soals
            router.push({
                name: "halaman-review-tryout",
                params: {
                    index_paket_kategori,
                    index_paket_mapel,
                    id_pengerjaan: params.id_pengerjaan,soal
                }

            });
        };

        fetchData();

        return {
            tryout, isLoading,

            // method
            redirectHalamanReview,
        };
    },
};
</script>

<style scoped>
.timeline-item[data-v-ffb3c5da]:not(:last-of-type) {
    padding-bottom: 15px !important;
}
</style>