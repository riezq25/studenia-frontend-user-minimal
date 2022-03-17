<template>
  <div>
    <b-row>
      <b-col lg="7">
        <b-card no-body class="business-card">
          <b-card-header class="pb-1">
            <b-card-title>Daftar Paket Premium</b-card-title>
          </b-card-header>

          <b-card-body class="paket-premium">
            <b-card-text>Dibawah ini daftar semua paket premium, silahkan kamu pilih</b-card-text>
            <h6 class="mb-75 text-danger">*Centang Paket dan pilih pembayaran</h6>

            <b-overlay :show="isFetch">
              <template #overlay>
                <div class="mt-5">
                  <div class="text-center text-danger">
                    <b-spinner class="align-middle mr-1"></b-spinner>
                    <strong>Sedang memuat data...</strong>
                  </div>
                </div>
              </template>
              <div class="business-items" :style="items.length >= 6 ? 'height: 600px' : 'height: auto'">
                <div v-for="item in items" :key="item.id" class="business-item">
                  <div class="d-flex align-items-start justify-content-between">
                    <div class="d-flex align-items-center">
                      <b-form-checkbox @change="pilihPaket(item)"></b-form-checkbox>
                      <div style="margin-left: 7px">
                        <span style="font-size: 15px; font-weight: 700">{{ item.item.nama }}</span>
                        <div style="margin-top: 5px ">
                          <b-badge variant="light-primary">
                            <span style="font-size: 13px;">{{ rupiah(item.item.harga) }}</span>
                          </b-badge>
                        </div>
                      </div>
                    </div>
                    <div class="mt-1">
                      <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" class="btn-icon rounded-circle" v-b-modal.delete-item @click="getId(item.id)">
                        <feather-icon icon="XIcon" />
                      </b-button>
                    </div>
                  </div>
                </div>
              </div>
            </b-overlay>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col lg="5">
        <b-overlay :show="fetchFee">
          <template #overlay>
            <div class="mt-5">
              <div class="text-center text-danger">
                <b-spinner class="align-middle mr-1"></b-spinner>
                <strong>Sedang memuat data...</strong>
              </div>
            </div>
          </template>
          <div class="checkout-options">
            <b-card>
              <div class="price-details">
                <h4 class="price-title">Detail Pembayaran</h4>
                <ul class="list-unstyled">
                  <li class="price-detail">
                    <div class="detail-title">Sub Total</div>
                    <div class="detail-amt" style="font-size: 20px; font-weight:700">{{ rupiah(amount) }}</div>
                  </li>
                  <li class="price-detail">
                    <div class="detail-title">Metode Pembayaran</div>
                    <div class="detail-amt discount-amt text-success" style="font-weight:700">
                      <div v-if="code_bayar != ''">{{ code_bayar }}</div>
                    </div>
                  </li>
                  <li class="price-detail d-flex justify-content-end">
                    <b-button :disabled="arrayId.length == 0" v-ripple.400="'rgba(113, 102, 240, 0.15)'" style="padding: 7px 10px" v-b-modal.modal-scrollable variant="outline-primary">
                      <span v-if="code_bayar != ''">Pilih Pembayaran</span>
                    </b-button>
                  </li>

                  <li class="price-detail">
                    <div class="detail-title">Fee Transaksi</div>
                    <div class="detail-amt" style="font-size: 17px; font-weight:700">{{ rupiah(fee_admin) }}</div>
                  </li>
                </ul>
                <hr />
                <ul class="list-unstyled">
                  <li class="price-detail">
                    <div class="detail-title detail-total">Total</div>
                    <div class="detail-amt font-weight-bolder" style="font-size: 20px; font-weight:700">{{ rupiah(total_fee) }}</div>
                  </li>
                </ul>
                <b-button variant="primary" block :disabled="arrayId.length == 0" v-b-modal.pembayaran>Bayar</b-button>
              </div>
            </b-card>
          </div>
        </b-overlay>
      </b-col>
    </b-row>

    <b-modal id="delete-item" ok-variant="danger" ok-title="Hapus" cancel-title="Batal" cancel-variant="outline-secondary" modal-class="modal-danger" centered title="Hapus Item" @ok="deleteItem">
      <b-card-text>
        Yakin hapus item ini dari keranjang ?
        <span class="text-danger fw-bolder">dilarang meninggalkan aplikasi</span>.
      </b-card-text>
    </b-modal>

    <b-modal id="modal-scrollable" scrollable title="Pilih Metode Pembayaran" hide-footer size="lg">
      <b-card-text v-for="(channel, key, index) in groupChannels" :key="index">
        <b-card-actions :title="key" action-collapse>
          <div v-if="key == 'Convenience Store'">
            <h6 class="text-danger">* Untuk Convenience Store mungkin ada biaya tambahan</h6>
          </div>
          <b-row cols="12">
            <b-col cols="12" md="6" lg="4" v-for="chn in channel" class="text-center">
              <label class="custom-radio">
                <input type="radio" name="radio" :checked="chn.code == code_bayar" v-model="code_bayar" :value="chn.code" />
                <span class="radio-btn">
                  <i class="las la-check"></i>
                  <div class="bank-card">
                    <img :src="chn['icon_url']" />
                    <b-badge class="mt-5" variant="light-primary" v-if="chn.code != 'OVO'" style="font-size: 14px;">{{ rupiah(chn.total_fee.flat) }}</b-badge>
                  </div>
                </span>
              </label>
            </b-col>
          </b-row>
        </b-card-actions>
      </b-card-text>
    </b-modal>

    <b-modal id="pembayaran" title="Bayar" centered cancel-title="Batal" ok-title="Bayar" cancel-variant="outline-secondary" :hide-footer="!code_bayar ? true : false" size="md" @ok="bayarItem">
      <div v-if="!code_bayar">
        <div class="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-credit-card-2-front" viewBox="0 0 16 16">
            <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z" />
            <path
              d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          <h4 class="mt-2">Silahkan pilih metode pembayaran terlebih dahulu</h4>
        </div>
      </div>
      <div v-else>Apakah anda yakin memilih paket ini?</div>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroupPrepend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
  VBTooltip,
  BSpinner,
  BCard,
  BBadge,
  BCardHeader,
  BCardBody,
  BMediaBody,
  BMedia,
  BMediaAside,
  BAvatar,
  BOverlay,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { ref, onMounted, watch } from "@vue/composition-api";

import BCardActions from "@core/components/b-card-actions/BCardActions.vue";

import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import repository from "@repofactory";
const repoCart = repository.get("CartRepository");
const repoBayar = repository.get("Bayar");

import router from "@/router";

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    VBTooltip,
    BSpinner,
    BCard,
    BBadge,
    BCardHeader,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BFormInput,
    BOverlay,
    BCardActions,
    useToast,
    ToastificationContent,
  },
  directives: {
    Ripple,
  },

  setup() {
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

    let items = ref([])
    let isFetch = ref(false)

    const fetchData = async () => {
      isFetch.value = true
      try {
        const response = await repoCart.get()
        items.value = response.data.data
        isFetch.value = false
      } catch (error) {
        console.log(error)
      }
    }

    let channels = ref([])
    let groupChannels = ref([])

    const fetchChannels = async () => {
      isFetch.value = true
      try {
        const response = await repoBayar.channels()
        channels.value = response.data.data

        const groupBy = (arr, key) => {
          const initialValue = {};
          return arr.reduce((acc, cval) => {
            const myAttribute = cval[key];
            acc[myAttribute] = [...(acc[myAttribute] || []), cval]
            return acc;
          }, initialValue);
        };

        const res = groupBy(channels.value, "group");
        groupChannels.value = res

        isFetch.value = false
      } catch (error) {
        console.log(error)
      }
    }

    // klik pembayaran

    const code_bayar = ref()

    let fee_admin = ref(0)
    let total_fee = ref(0)

    let fetchFee = ref(false)

    let arrayId = ref([])
    let amount = ref(0)

    const pilihPaket = (item) => {
      let data = arrayId.value.find(function (ele) {
        return ele === item.id
      })


      if (data) {
        arrayId.value = arrayId.value.filter(e => e != item.id)
        amount.value -= item.item.harga
        total_fee.value -= item.item.harga
      } else {
        arrayId.value.push(item.id)
        amount.value += item.item.harga
        total_fee.value += item.item.harga
      }
    }

    let cart_id = ref(null)

    const getId = (id) => {
      cart_id.value = id
    }

    const hitungBayar = async () => {
      fetchFee.value = true
      try {
        let response = await repoBayar.hitung({ method: code_bayar.value, amount: amount.value })
        fee_admin.value = response.data.data[0].fee.flat
        fetchFee.value = false

      } catch (error) {
        console.log(error)
      }
    }

    watch(code_bayar, (newCode, oldCode) => {
      if (newCode) {
        hitungBayar()
      }
    })

    watch(fee_admin, (newFee, oldFee) => {
      if (newFee) {
        total_fee.value = amount.value + fee_admin.value
      }

    })


    //eksekusi
    onMounted(() => {
      fetchData()
      fetchChannels()
    })

    const bayarItem = async () => {
      try {
        const response = await repoBayar.bayar({ method: code_bayar.value, carts: arrayId.value })
        if (response.data.success == true) {
          showToast(
            "Success",
            "Sukses membeli paket",
            "success",
            "AlertTriangleIcon"
          );
          console.log(response)
          router.push({
            name: "transaksi/invoice-detail",
            params: {
              id: response.data.data.reference,
            },
          });
        } else {
          showToast(
            "Error",
            "Error membeli paket",
            "danger",
            "AlertTriangleIcon"
          );
        }
      } catch (error) {
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
      }
    }


    const deleteItem = async () => {

      try {
        const response = await repoCart.delete(cart_id.value)
        showToast(
          "Success",
          response.data.message,
          "danger",
          "AlertTriangleIcon"
        );
        fetchData()
      } catch (error) {
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
      }

    };

    function rupiah(x) {
      return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR' }
      ).format(x); // '$100.00'
    }



    return {
      items,
      isFetch,
      deleteItem,
      getId,
      arrayId,
      pilihPaket,
      amount,
      rupiah,

      //bayar
      channels,
      groupChannels,
      code_bayar,
      fetchFee,
      fee_admin,
      total_fee,
      bayarItem
    }
  }
};
</script>

<style scoped>
.business-items {
  overflow-y: auto;
}

.radio-buttons {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.custom-radio {
  width: 100%;
}

.custom-radio input {
  display: none;
}

.radio-btn {
  margin: 10px;
  width: 100%;
  height: 200px;
  border: 3px solid transparent;
  display: inline-block;
  border-radius: 10px;
  position: relative;
  text-align: center;
  box-shadow: 0 0 20px #c3c3c367;
  cursor: pointer;
}

.radio-btn > i {
  color: #ffffff;
  background-color: #8373e6;
  font-size: 20px;
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%) scale(4);
  border-radius: 50px;
  padding: 3px;
  transition: 0.2s;
  pointer-events: none;
  opacity: 0;
}

.radio-btn .bank-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

@media (max-width: 767.98px) {
  .radio-btn .bank-card img {
    max-width: 270px;
    object-fit: contain;
    object-position: center;
  }
}

@media (min-width: 768px) {
  .radio-btn .bank-card img {
    max-width: 180px;
    object-fit: contain;
    object-position: center;
  }
}

.radio-btn .hobbies-icon i {
  color: #8373e6;
  line-height: 80px;
  font-size: 60px;
}

.radio-btn .hobbies-icon h3 {
  color: #8373e6;
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
}

.custom-radio input:checked + .radio-btn {
  border: 3px solid #8373e6;
}

.custom-radio input:checked + .radio-btn > i {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}
</style>

<style lang="scss" scoped>
.ecommerce-card {
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 25px 0 rgba(#000, 0.25);
  }

  // ratings
  .item-rating {
    ul {
      margin-bottom: 0;
    }
    svg,
    i {
      height: 1.143rem;
      width: 1.143rem;
      font-size: 1.143rem;
    }
  }

  // Item name
  .item-name {
    margin-bottom: 0;
    a {
      font-weight: 400;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .item-description {
    font-size: 0.875rem;
  }

  // buttons style
  .btn-wishlist,
  .btn-cart {
    span {
      vertical-align: text-top;
    }
    i,
    svg {
      margin-right: 0.25rem;
      vertical-align: text-top;
    }
  }
}
</style>

<style lang="scss">
.checkout-options {
  .coupons {
    &:focus-within {
      box-shadow: none;
    }
    input {
      border: none;
      padding-left: 0;
    }
    .input-group-append {
      margin: 0;
    }
    .input-group-text {
      height: auto;
      padding: inherit;
    }
  }
  .price-details {
    .price-title {
      margin-bottom: 0.75rem;
      margin-top: 1.5rem;
    }
    .price-detail {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
    }
  }
}
</style>