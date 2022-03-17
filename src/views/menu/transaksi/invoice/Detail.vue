<template>
    <div>
        <b-overlay>
            <div v-if="isFetch">
                <div class="text-center text-danger" style="margin-top: 100px;">
                    <b-spinner class="align-middle mr-1"></b-spinner>
                    <h4 class="mt-1">Sedang memuat data...</h4>
                </div>
            </div>
            <div v-else>
                <div class="text-right mb-2">
                    <b-button variant="primary" @click="fetchData">
                        <feather-icon icon="RefreshCcwIcon" class="mr-50" />
                        <span class="text-nowrap">Refresh Data</span>
                    </b-button>
                </div>
                <b-card no-body class="card-statistics">
                    <b-card-body class="statistics-body">
                        <b-row>
                            <b-col cols="12" md="4">
                                <b-media no-body>
                                    <b-media-body class="my-1">
                                        <b-card-text class="mb-1">Invoice</b-card-text>
                                        <h4 style="font-weight: 500;" class="mb-0">{{ result.reference }}</h4>
                                    </b-media-body>
                                </b-media>
                            </b-col>
                            <b-col cols="12" md="4">
                                <b-media no-body>
                                    <b-media-body class="my-1">
                                        <b-card-text class="mb-1">Payment Method</b-card-text>
                                        <h4 style="font-weight: 500;" class="mb-0">{{ result.payment_method }}</h4>
                                        <h4 style="font-weight: 400;margin-top: 7px;">{{ result.payment_name }}</h4>
                                    </b-media-body>
                                </b-media>
                            </b-col>
                            <b-col cols="12" md="4">
                                <b-media no-body>
                                    <b-media-body class="my-1">
                                        <b-card-text class="mb-1">Payment Status</b-card-text>
                                        <b-badge v-if="result.status == 'UNPAID'" variant="danger" class="badge-glow">
                                            <h4 style="font-weight: 500; color:white" class="mb-0">{{ result.status }}</h4>
                                        </b-badge>
                                        <b-badge v-if="result.status == 'PAID'" variant="primary" class="badge-glow">
                                            <h4 style="font-weight: 500; color:white" class="mb-0">{{ result.status }}</h4>
                                        </b-badge>
                                        <b-badge v-if="result.status == 'CANCELLED'" variant="warning" class="badge-glow">
                                            <h4 style="font-weight: 500; color:white" class="mb-0">{{ result.status }}</h4>
                                        </b-badge>
                                        <b-badge v-if="result.status == 'REFUND'" variant="info" class="badge-glow">
                                            <h4 style="font-weight: 500; color:white" class="mb-0">{{ result.status }}</h4>
                                        </b-badge>
                                    </b-media-body>
                                </b-media>
                            </b-col>
                            <b-col cols="12">
                                <b-media no-body>
                                    <b-media-body class="my-1">
                                        <b-card-text class="mb-1">Batas Pembayaran</b-card-text>
                                        <h4 style="font-weight: 500;" class="mb-0">Silahkan bayar sebelum</h4>
                                        <h4 style="font-weight: 400;margin-top: 7px;">{{ getTanggal(result.expired_time * 1000) }} - {{ getTime(result.expired_time * 1000) }}</h4>
                                    </b-media-body>
                                </b-media>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
                <b-card no-body class="card-statistics">
                    <b-card-body class="statistics-body">
                        <b-row class="d-none d-md-flex">
                            <b-col cols="9">
                                <b-card-text class="mb-1" style="font-size: 16px;">Items</b-card-text>
                            </b-col>
                            <b-col cols="3" class="text-center">
                                <b-card-text class="mb-1" style="font-size: 16px;">Harga</b-card-text>
                            </b-col>
                        </b-row>
                        <hr />
                        <b-row class="my-2" v-for="item in result.order_items">
                            <b-col cols="12" md="9" class="text-left d-flex align-items-center">
                                <feather-icon icon="ListIcon" size="13" />
                                <h4 style="font-weight: 600;font-size: 20px; margin-left: 20px;" class="mb-0">{{ item.name }}</h4>
                            </b-col>

                            <b-col cols="12" md="3" class="text-left text-md-center mt-1 mt-md-0">
                                <h4 style="font-weight: 500;" class="mb-0">{{ rupiah(item.price) }}</h4>
                            </b-col>
                        </b-row>

                        <b-row class="mt-3">
                            <b-col cols="12" md="9" class="bg-light px-2">
                                <b-row class="width-rincian-biaya">
                                    <b-col cols="12" md="4">
                                        <div class="my-2">
                                            <b-card-text class="mb-1" style="font-size: 16px;">Subtotal</b-card-text>
                                            <h3 style="font-weight: 600" class="mb-0">{{ rupiah(result.amount_received) }}</h3>
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="4" class="d-flex justify-content-center align-items-center my-1">
                                        <feather-icon icon="PlusIcon" size="20" />
                                    </b-col>
                                    <b-col cols="12" md="4">
                                        <div class="my-2">
                                            <b-card-text class="mb-1" style="font-size: 16px;">Fee Admin</b-card-text>
                                            <h3 style="font-weight: 600" class="mb-0">{{ rupiah(result.fee_customer) }}</h3>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col cols="12" md="3" class="bg-black p-2">
                                <h4 style="font-weight: 600;color: #EEEDDE;" class="mb-1">Total</h4>
                                <h3 style="font-weight: 600;text-align: right; padding-right: 10px;color: #F7F7F7;" class="mb-0">{{ rupiah(result.amount) }}</h3>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
                <b-row>
                    <b-col cols="12">
                        <b-card>
                            <b-media no-body>
                                <b-media-body class="my-1">
                                    <h5 class="mb-1 px-2" style="font-size: 18px; font-weight: 400;">Instruksi Pembayaran</h5>
                                </b-media-body>
                            </b-media>
                            <b-card-actions v-for="item in result.instructions" :title="item.title" action-collapse>
                                <ol>
                                    <li v-for="step in item.steps" style="margin:5px 0;font-size: 15px;">
                                        <span v-html="step"></span>
                                    </li>
                                </ol>
                            </b-card-actions>
                        </b-card>
                    </b-col>
                </b-row>
            </div>
        </b-overlay>
    </div>
</template>

<script>
import {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BRow,
    BCol,
    BMedia,
    BMediaAside,
    BAvatar,
    BMediaBody,
    BOverlay,
    BSpinner,
    BButton,
    BBadge
} from "bootstrap-vue";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";

import { onMounted, ref } from "@vue/composition-api";
import { useRouter } from "@core/utils/utils";

import repository from "@repofactory";
const repoBayar = repository.get("Bayar");

export default {
    components: {
        BRow,
        BCol,
        BCard,
        BCardHeader,
        BCardTitle,
        BCardText,
        BCardBody,
        BMedia,
        BAvatar,
        BMediaAside,
        BMediaBody,
        BOverlay,
        BSpinner,
        BButton,
        BBadge,
        BCardActions,
        AppCollapse,
    },

    setup() {

        const { route } = useRouter()
        let isFetch = ref(false)
        let result = ref({})

        const fetchData = async () => {
            isFetch.value = true
            try {
                const response = await repoBayar.reference(route.value.params.id)
                result.value = response.data.data
                isFetch.value = false
            } catch (error) {
                console.log(error)
            }
        }

        onMounted(() => {
            fetchData()
        })

        function rupiah(x) {
            return new Intl.NumberFormat('id-ID',
                { style: 'currency', currency: 'IDR' }
            ).format(x); // '$100.00'
        }

        const getTanggal = (newDate) => {
            let date = new Date(newDate)
            let tanggal = date.toLocaleDateString()
            return `${tanggal}`
        }

        const getTime = (newDate) => {
            let date = new Date(newDate)
            let time = date.toTimeString().split(' ')[0]
            return `${time} WIB`
        }

        return {
            result, isFetch, fetchData, rupiah, getTanggal, getTime
        }
    }
}
</script>

<style scoped>
.bg-light {
    background-color: #adb5bd;
}
.bg-black {
    background-color: #2d353c;
}

@media (min-width: 768px) {
    .width-rincian-biaya {
        width: 80%;
    }
}
</style>