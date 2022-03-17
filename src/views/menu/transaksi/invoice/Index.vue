<template>
    <div>
        <!-- Table Container Card -->
        <b-card no-body class="mb-0">
            <div class="m-2">
                <!-- Table Top -->
                <b-row class="d-flex align-items-center justify-content-between">
                    <!-- Per Page -->
                    <b-col cols="12" md="6" class="mb-1 mb-md-0">
                        <b-form-input placeholder="Search Status, Reference, Payment Method" type="text" class="d-inline-block" @input="searchUser" />
                    </b-col>

                    <!-- Search -->
                    <b-col cols="12" md="6">
                        <div class="d-flex align-items-center justify-content-end">
                            <b-button class="mr-1" variant="primary" @click="fetchInvoice()">
                                <feather-icon icon="RefreshCcwIcon" class="mr-50" />
                                <span class="text-nowrap">Refresh Data</span>
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
            </div>

            <b-table
                ref="refUserListTable"
                :busy="isLoading"
                class="position-relative"
                responsive
                :items="listInvoice"
                :fields="tableColumns"
                primary-key="id"
                show-empty
                empty-text="No matching records found"
            >
                <template #table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle mr-1"></b-spinner>
                        <strong>Sedang memuat data...</strong>
                    </div>
                </template>

                <template #cell(reference)="data">
                    <router-link :to="{ name: 'transaksi/invoice-detail', params: { id: data.item.reference } }">
                        <div>{{ data.item.reference }}</div>
                    </router-link>
                </template>

                <template #cell(total_fee)="data">
                    <div class="text-center">{{ rupiah(data.item.total_fee) }}</div>
                </template>

                <template #cell(status)="data">
                    <b-badge v-if="data.item.status == 'UNPAID'" variant="danger" class="badge-glow">
                        <h6 style="color:white" class="mb-0">{{ data.item.status }}</h6>
                    </b-badge>
                    <b-badge v-if="data.item.status == 'PAID'" variant="primary" class="badge-glow">
                        <h6 style="color:white" class="mb-0">{{ data.item.status }}</h6>
                    </b-badge>
                    <b-badge v-if="data.item.status == 'CANCELLED'" variant="warning" class="badge-glow">
                        <h6 style="color:white" class="mb-0">{{ data.item.status }}</h6>
                    </b-badge>
                    <b-badge v-if="data.item.status == 'REFUND'" variant="info" class="badge-glow">
                        <h6 style="color:white" class="mb-0">{{ data.item.status }}</h6>
                    </b-badge>
                </template>

                <template #cell(created_at)="data">
                    <div class="text-center">
                        <div>
                            <b-badge variant="light-primary">
                                <feather-icon icon="CalendarIcon" size="18" />
                                <span style="font-size: 13px; margin-left: 3px;">{{ getTanggal(data.item.created_at) }}</span>
                            </b-badge>
                        </div>
                        <div style="margin-top: 10px;">
                            <b-badge variant="light-primary">
                                <feather-icon icon="ClockIcon" size="18" />
                                <span style="font-size: 13px; margin-left: 3px;">{{ getTime(data.item.created_at) }}</span>
                            </b-badge>
                        </div>
                    </div>
                </template>
            </b-table>
            <div class="mx-2 mb-2">
                <b-row>
                    <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start"></b-col>
                    <!-- Pagination -->
                    <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
                        <b-pagination
                            @change="getData"
                            v-model="current_page"
                            :total-rows="total_rows"
                            :per-page="per_page"
                            first-number
                            last-number
                            class="mb-0 mt-1 mt-sm-0"
                            prev-class="prev-item"
                            next-class="next-item"
                        >
                            <template #prev-text>
                                <feather-icon icon="ChevronLeftIcon" size="18" />
                            </template>
                            <template #next-text>
                                <feather-icon icon="ChevronRightIcon" size="18" />
                            </template>
                        </b-pagination>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </div>
</template>

<script>
import {
    BFormGroup,
    BFormCheckbox,
    BForm,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BFormTextarea,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BSpinner,
    BDropdownItem,
    BPagination,
    BFormRadio,
    BFormDatepicker,
    VBModal,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import { ref, onMounted } from "@vue/composition-api";
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import repository from "@repofactory";
const invoice = repository.get('Invoice');

export default {
    components: {
        BFormGroup,
        BFormCheckbox,
        BForm,
        BInputGroup,
        BInputGroupPrepend,
        BInputGroupAppend,
        BCard,
        BRow,
        BCol,
        BFormInput,
        BFormTextarea,
        BButton,
        BTable,
        BMedia,
        BAvatar,
        BLink,
        BSpinner,
        BBadge,
        BDropdown,
        BDropdownItem,
        BPagination,
        BFormRadio,
        BFormDatepicker,
        VBModal,

        vSelect,

        //validations
        ValidationProvider,
        ValidationObserver,
    },
    directives: {
        "b-modal": VBModal,
    },
    mixins: [togglePasswordVisibility],

    computed: {
        passwordToggleIcon() {
            return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
        },
    },

    setup() {
        const isLoading = ref(true);
        const isSubmitting = ref(false);
        const isError = ref(false);
        const toast = useToast();

        const listInvoice = ref([]);

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

        let total_rows = ref(null);
        let per_page = ref(null);
        let last_page = ref(null);
        let current_page = ref(1);

        const getData = (page) => {
            current_page.value = page;
            fetchInvoice();
        };

        // search user
        const searchUser = async (searchValue) => {
            isLoading.value = true;
            await invoice
                .search(searchValue, searchValue, searchValue)
                .then((response) => {
                    isLoading.value = false;
                    listInvoice.value = response.data.data.data;
                    total_rows.value = response.data.data.total;
                    per_page.value = response.data.data.per_page;
                    last_page.value = response.data.data.last_page;
                    console.log(response)
                })
                .catch((error) => {
                    isLoading.value = false;
                    isError.value = true;
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
                });
        };



        const fetchInvoice = async () => {
            isLoading.value = true;
            await invoice.get(current_page.value).then(response => {
                isLoading.value = false;
                listInvoice.value = response.data.data.data;
                total_rows.value = response.data.data.total;
                per_page.value = response.data.data.per_page;
                last_page.value = response.data.data.last_page;
            }).catch(error => {
                console.log(error)
            })
        }

        onMounted(() => {
            fetchInvoice();
        });

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

        //ini kodingan untuk generate date nya

        function rupiah(x) {
            return new Intl.NumberFormat('id-ID',
                { style: 'currency', currency: 'IDR' }
            ).format(x); // '$100.00'
        }


        const tableColumns = [
            { key: "reference", label: "No Reference", thClass: 'text-left', tdClass: 'text-left' },
            {
                key: "payment_name",
                label: "Metode Bayar",
            },
            {
                key: "total_fee",
                label: "Jumlah",
                thClass: "text-center",
                tdClass: 'text-center'
            },
            {
                key: "status",
                label: "Status",
                thClass: "text-center",
                tdClass: 'text-center'
            },
            {
                key: "created_at",
                label: "Tanggal",
                thClass: "text-center",
                tdClass: 'text-center'
            },
        ];

        return {
            tableColumns,
            listInvoice,
            isLoading,
            isError,
            isSubmitting,
            fetchInvoice,
            getTanggal,
            getTime,
            rupiah,



            //pagination
            getData,
            current_page,
            total_rows,
            per_page,
            last_page,

            //search user
            searchUser,
        };
    },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>

