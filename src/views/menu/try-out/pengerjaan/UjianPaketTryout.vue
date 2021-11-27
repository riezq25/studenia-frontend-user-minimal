<template>
    <div class="pb-6">
        <app-collapse accordion :type="'margin'">
            <b-row>
                <b-col cols="12" xl="9" md="8" class="fixed-top px-2 d-md-none time-fixed">
                    <b-card>
                        <div class="card-header px-0 pb-0">
                            <h3 class="card-title">
                                Sisa Waktu :
                                <span
                                    class="text-primary"
                                    style="color:blue"
                                >{{ formatTime(sisaWaktu) }}</span>
                            </h3>
                        </div>
                    </b-card>
                </b-col>

                <b-col cols="12" xl="9" md="8" class="mt-4 mt-md-0">
                    <app-collapse-item
                        :isVisible="true"
                        :title="'Kategori Soal: ' + soal[currentIndex].mapel.nama.toUpperCase()"
                    >
                        <b-row class="invoice-spacing my-0">
                            <b-col cols="12" class="mb-lg-1 lh-lg">
                                <div class="d-flex justify-content-between mb-2">
                                    <p class="font-weight-bolder mb-0">Soal {{ currentIndex + 1 }}</p>
                                    <b-badge variant="primary">
                                        <feather-icon icon="ClockIcon" class="mr-25" />
                                        <span>{{ formatTime(timerSoal) }}</span>
                                    </b-badge>
                                </div>

                                <vue-mathjax
                                    :safe="false"
                                    class="resize-font lh-base"
                                    :formula="soal[currentIndex].pertanyaan"
                                ></vue-mathjax>

                                <div class="mt-1">
                                    <b-button
                                        v-for="(pil, key, index) in soal[currentIndex].pilihan"
                                        :key="index"
                                        :variant="key.toUpperCase() == soal[currentIndex].jawaban && !soal[currentIndex].ragu ? 'outline-primary' : key.toUpperCase() == soal[currentIndex].jawaban && soal[currentIndex].ragu ? 'outline-warning' : 'flat-secondary'"
                                        class="mb-75 py-1 text-left"
                                        block
                                        @click="pilihJawaban(key)"
                                    >
                                        <div class="d-flex lh-lg" style="line-height:1.5">
                                            <span class="mr-1">{{ key.toUpperCase() }}.</span>
                                            <vue-mathjax
                                                :safe="false"
                                                class="resize-font lh-base"
                                                :formula="pil"
                                            ></vue-mathjax>
                                        </div>
                                    </b-button>
                                </div>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col cols="6" md="3" class="button-pilihan">
                                <b-button
                                    block
                                    class="py-1 d-flex justify-content-center align-items-center"
                                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                    variant="danger"
                                    @click="clickLepas"
                                    :disabled="!soal[currentIndex].jawaban"
                                >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="hero-icon"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </span>
                                    <span>Lepas</span>
                                </b-button>
                            </b-col>
                            <b-col cols="6" md="3" class="button-pilihan">
                                <b-button
                                    block
                                    class="py-1 d-flex justify-content-center align-items-center"
                                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                    variant="warning"
                                    @click="clickRagu"
                                    :disabled="!soal[currentIndex].jawaban"
                                >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="hero-icon"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                                            />
                                        </svg>
                                    </span>
                                    <span>Ragu</span>
                                </b-button>
                            </b-col>
                            <b-col cols="6" md="3" class="button-pilihan">
                                <b-button
                                    block
                                    class="py-1 d-flex justify-content-center align-items-center"
                                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                    variant="secondary"
                                    @click="clickKunci"
                                    :disabled="!soal[currentIndex].jawaban"
                                >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="hero-icon"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Kunci</span>
                                </b-button>
                            </b-col>
                            <b-col cols="6" md="3" class="button-pilihan">
                                <b-button
                                    block
                                    class="py-1 d-flex justify-content-center align-items-center"
                                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                    variant="dark"
                                >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="hero-icon"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Laporkan</span>
                                </b-button>
                            </b-col>
                        </b-row>
                    </app-collapse-item>

                    <b-card>
                        <div class="card-header px-0 pb-0">
                            <h4 class="card-title">Keterangan:</h4>
                        </div>
                        <b-row>
                            <!-- solid color -->
                            <b-col
                                v-for="(data) in solidColor"
                                :key="data.key"
                                cols="6"
                                sm="3"
                                lg="3"
                            >
                                <b-card
                                    :bg-variant="data.bg"
                                    text-variant="white"
                                    class="text-center"
                                >
                                    <b-card-title class="text-white">{{ data.title }}</b-card-title>
                                    <h3 class="text-white m-0">{{ computedSoal[data.key] }}</h3>
                                </b-card>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
                <b-col cols="12" xl="3" md="4" class="mb-5">
                    <b-card class="d-none d-md-block">
                        <div class="card-header px-0 pb-0">
                            <h4 class="card-title">Sisa Waktu Tryout</h4>
                        </div>
                        <hr />
                        <div class="text-center">
                            <h1
                                class="fw-bold"
                                style="font-size:40px"
                            >{{ formatTime(sisaWaktuTryout) }}</h1>
                        </div>
                    </b-card>

                    <b-card class="d-none d-md-block">
                        <div class="card-header px-0 pb-0">
                            <h4 class="card-title">Sisa Waktu</h4>
                        </div>
                        <hr />
                        <div class="text-center">
                            <h1 class="fw-bold" style="font-size:40px">{{ formatTime(sisaWaktu) }}</h1>
                        </div>
                    </b-card>
                    <b-card>
                        <div class="card-header px-0 pb-0">
                            <h4 class="card-title">Nomor Soal</h4>
                        </div>
                        <hr />
                        <div
                            class="d-sm-flex my-2 d-none justify-content-between align-items-center nav-bottom"
                        >
                            <b-button
                                class="m-0 py-1 px-md-0 d-flex align-items-center justify-content-center"
                                block
                                variant="primary"
                                :disabled="currentIndex == 0 ? true : false"
                                @click="clickPrev"
                            >
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
                                        :variant="currentIndex == index ? 'primary' : jml.jawaban && !jml.ragu ? 'success' : jml.jawaban && jml.ragu ? 'warning' : 'outline-secondary'"
                                        v-for="(jml,index) in soal"
                                        :key="jml.id"
                                        @click="clickSoal(index)"
                                    >
                                        <div
                                            class="d-flex justify-content-center align-items-center"
                                        >{{ index + 1 }}</div>
                                    </b-button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <b-button
                                block
                                v-b-modal.modal-danger
                                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                variant="success"
                                class="py-1 d-flex justify-content-center align-items-center"
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="hero-icon"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </span>
                                <span>Selesai</span>
                            </b-button>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </app-collapse>

        <b-card-body class="p-0 pb-0 d-sm-none fixed-bottom">
            <b-card class="mb-0">
                <div class="d-flex justify-content-between align-items-center nav-bottom">
                    <b-button
                        class="m-0 py-1 d-flex align-items-center justify-content-center"
                        block
                        variant="primary"
                        :disabled="currentIndex == 0 ? true : false"
                        @click="clickPrev"
                    >
                        <feather-icon icon="ChevronLeftIcon" size="20" />
                        <span>Prev</span>
                    </b-button>
                    <b-button
                        class="m-0 py-1 d-flex align-items-center justify-content-center"
                        block
                        variant="primary"
                        :disabled="currentIndex == (jumlahSoal - 1) ? true : false"
                        @click="clickNext"
                    >
                        <span>Next</span>
                        <feather-icon icon="ChevronRightIcon" size="20" />
                    </b-button>
                </div>
            </b-card>
        </b-card-body>

        <b-modal
            id="modal-danger"
            ok-variant="danger"
            ok-title="Yakin"
            cancel-title="Batal"
            modal-class="modal-danger"
            centered
            title="Danger Modal"
            @ok="simpanPaket"
        >
            <b-card-text class="text-center text-danger">
                <feather-icon icon="AlertTriangleIcon" size="50" />
                <h4
                    class="mt-1"
                >Apakah Anda yakin ingin menyimpan semua jawaban dan kembali ke halaman paket soal?</h4>
            </b-card-text>
        </b-modal>
    </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "@vue/composition-api";
import { useRouter } from "@core/utils/utils";
import store from "@/store/index";
import router from "@/router";

import { VueMathjax } from "vue-mathjax";

import repository from "@repofactory";
const repoTryout = repository.get("tryoutRepository");
const repoPengerjaanTryout = repository.get("pengerjaanTryoutRepository");

import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";

import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import Ripple from "vue-ripple-directive";
import {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BButton,
    BCardText,
    BCardTitle,
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
    BBadge,
} from "bootstrap-vue";
import SoalRepository from "../../../../repositories/SoalRepository";
import tryout from "../../../../store/tryout";

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
        BCardTitle,
        VBToggle,
        BBadge,
        VueMathjax,
        ToastificationContent,
    },
    directives: {
        Ripple,
        "b-toggle": VBToggle,
    },

    setup() {
        const { route } = useRouter();
        const toast = useToast();

        const soal = ref([]);
        const paket = ref({});
        const startAt = ref(null);
        const sisaWaktu = ref(0);
        const sisaWaktuTryout = ref(0);
        const countDownSoal = ref(null);
        const countDown = ref(null);

       const formatTime = (seconds) => {
      let m = Math.floor((seconds) / 60)
        .toString()
        .padStart(2, "0"),
        s = Math.floor(seconds % 60)
          .toString()
          .padStart(2, "0");

      return `${m}:${s}`;
    };

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

        const jumlahSoal = computed(() => {
            return soal.value.length;
        });

        let currentIndex = ref(0);

        const clickNext = () => {
            simpanState();
            if (soal.value.length >= currentIndex.value + 2) {
                currentIndex.value++;
            }
        };

        const clickPrev = () => {
            simpanState();
            currentIndex.value--;
        };

        const clickSoal = (index) => {
            simpanState();
            currentIndex.value = index;
        };

        const clickRagu = () => {
            soal.value[currentIndex.value].ragu = true;
            simpanState();
        };

        const clickLepas = () => {
            soal.value[currentIndex.value].ragu = false;
            soal.value[currentIndex.value].jawaban = "";
            simpanState();
        };

        const clickKunci = () => {
            soal.value[currentIndex.value].ragu = false;
            simpanState();
        };

        const solidColor = ref([
            { bg: "primary", title: "Soal", data: "0", key: "jumlah" },
            { bg: "success", title: "Dijawab", data: "0", key: "dijawab" },
            { bg: "danger", title: "Kosong", data: "0", key: "kosong" },
            { bg: "warning", title: "Ragu", data: "0", key: "ragu" },
        ]);

        const pilihJawaban = (jawaban) => {
            soal.value[currentIndex.value].jawaban = jawaban.toUpperCase();
            soal.value[currentIndex.value].ragu = false;
            simpanState();
        };

        const simpanState = () => {
            simpanJawaban().then(() => {
                clearInterval(countDownSoal);
                const params = route.value.params;
                const index = currentIndex.value;
                store.commit("tryout/setSoalState", {
                    index_paket_kategori: params.index_paket_kategori,
                    index_paket_mapel: params.index_paket_mapel,
                    current_index: index,
                    soal: soal.value[index],
                });
                setCurrentSoal();
            })

        };

        const simpanJawaban = async () => {
            const params = route.value.params;
            const current = store.state.tryout.data.pengerjaan.paket

            let data = current.map(val => {
                let paketMapels = val.paket_mapels.map(mapel => {

                    let soals = mapel.soals.map(soal => {
                        return {
                            id: soal.id,
                            jawaban: soal.jawaban,
                            ragu: soal.ragu,
                            waktu: soal.waktu,
                        }
                    })

                    return {
                        id: mapel.id,
                        finished_at: mapel.finished_at,
                        is_done: mapel.is_done,
                        start_at: mapel.start_at,
                        waktu: mapel.waktu,
                        soals
                    }
                })

                return {
                    id: val.id,
                    paket_mapels: paketMapels
                }
            })

            repoPengerjaanTryout.simpanJawaban(params.id_pengerjaan, {
                pengerjaan: data
            })
                .then(function (response) {
                    // showToast('Notification', response.data.message, 'success', 'AlertTriangleIcon')
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

        }

        const computedSoal = computed(() => {
            let soalDijawab = 0,
                soalRagu = 0,
                soalKosong = 0;

            soal.value.forEach((el) => {
                if (el.jawaban) {
                    soalDijawab++;
                } else {
                    soalKosong++;
                }

                if (el.ragu) {
                    soalRagu++;
                }
            });

            return {
                jumlah: soal.value.length,
                dijawab: soalDijawab,
                ragu: soalRagu,
                kosong: soalKosong,
            };
        });

        const setCurrentSoal = () => {
            if(!store.state.tryout.data){
                redirectHalamanAwalPengerjaan()
            }

            const params = route.value.params;
            const currentState = store.state.tryout.data.pengerjaan.paket[params.index_paket_kategori].paket_mapels[params.index_paket_mapel]

            store.commit("tryout/setWaktuMulaiMapel", {
                index_paket_kategori: params.index_paket_kategori,
                index_paket_mapel: params.index_paket_mapel,
            });

            startAt.value = currentState.start_at

            const currentPaket =
                store.state.tryout.data.pengerjaan.paket[params.index_paket_kategori]
                    .paket_mapels[params.index_paket_mapel];

            soal.value = currentPaket.soals;
            paket.value = currentPaket;
        };

        const simpanPaket = async () => {
            const params = route.value.params;

            store.commit("tryout/setPaketMapel", {
                index_paket_kategori: params.index_paket_kategori,
                index_paket_mapel: params.index_paket_mapel,
                soals: soal.value,
            });


            await simpanJawaban().then(() => {
                clearInterval(countDownSoal.value);
                clearInterval(countDown.value);


                redirectHalamanAwalPengerjaan();
            })

        };

        const redirectHalamanAwalPengerjaan = () => {
            const params = route.value.params;
            router.push({
                name: "start-paket-tryout",
                params: {
                    jenis: params.jenis,
                    kategori: params.kategori,
                    id: params.id,
                    id_pengerjaan: params.id_pengerjaan,
                },
            });
        };

        const timerSoal = computed(() => {
            return soal.value[currentIndex.value].waktu / 1000;
        });

        setCurrentSoal();

        onMounted(() => {
            clearInterval(countDownSoal);
            clearInterval(countDown);

            countDownSoal.value = setInterval(() => {
                soal.value[currentIndex.value].waktu += 1000;
            }, 1000);

            let selisih = store.state.tryout.selisihWaktu
            const end = (startAt.value) + paket.value.durasi * 60;

            countDown.value = setInterval(() => {
                let timeNow = (Math.floor(Date.now() / 1000) + selisih)
                sisaWaktu.value = end - timeNow;
                sisaWaktuTryout.value = store.state.tryout.waktuSelesaiTryout - timeNow;

                if (sisaWaktu.value < 1 || sisaWaktuTryout.value < 1) {
                    showToast(
                        "Warning",
                        "Waktu pengerjaan paket soal ini sudah habis, Anda akan diarahkan ke paket halaman paket tryout.",
                        "warning",
                        "AlertTriangleIcon"
                    );

                    simpanPaket();
                }

            }, 1000);
        });

        return {
            jumlahSoal,
            soal,
            currentIndex,
            sisaWaktu, sisaWaktuTryout,
            clickNext,
            clickPrev,
            clickSoal,
            clickRagu,
            clickLepas,
            clickKunci,
            solidColor,
            pilihJawaban,
            simpanPaket,
            formatTime,
            computedSoal,
            timerSoal,
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
    height: 140px;
}

.hero-icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
}

.button-pilihan {
    margin: 4px 0;
}

@media (max-width: 767.98px) {
    .btn-soal {
        height: auto;
    }
    .time-fixed {
        margin-top: 85px;
    }
}
</style>