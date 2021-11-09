<template>
  <b-card title="Create Awesome 🙌"></b-card>
</template>

<script>
import { BCard, BCardText } from 'bootstrap-vue'
import { useRouter } from "@core/utils/utils";
export default {
  components: {
    BCard,
    BCardText,
  },
  setup() {

    const { route } = useRouter()
    console.log(route.value.params)
    return { route }
  }

}
</script>

<style>
</style>
