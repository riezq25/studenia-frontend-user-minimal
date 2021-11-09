<template>
  <div>
    <b-card>{{ data.users[0] }}</b-card>
  </div>
</template>

<script>
import { toRefs, ref, onMounted, reactive } from "@vue/composition-api";
import store from '@/store'
import Repository from "@repdir/RepositoryFactory";
const Users = Repository.get("users");

import {
  BCard,
  BTable, BAvatar, BBadge, BRow, BCol, BFormGroup, BFormSelect, BPagination, BInputGroup, BFormInput, BInputGroupAppend, BButton,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { avatarText } from "@core/utils/filter";

export default {
  components: {
    BCard,
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
  },
  setup() {
    const isLoading = ref(false)
    const isError = ref(false)

    const data = reactive({
      users: []
    })


    onMounted(async () => {
      isLoading.value = true

      const users = await Users.get().then(function (response) {
        isLoading.value = false

        data.users = response.data.data.data
      })
        .catch(function (error) {
          isLoading.value = false
          isError.value = true
        });
    })

    return {
      ...toRefs(data)
    }

  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
