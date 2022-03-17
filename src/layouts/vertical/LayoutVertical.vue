<template>
  <layout-vertical>
    <router-view :key="$route.path" />

    <template #navbar="{ toggleVerticalMenuActive }">
      <navbar :toggle-vertical-menu-active="toggleVerticalMenuActive" />
    </template>

    <!-- <div class="absolute bottom-0 right-0">
      <h2>halo bos</h2>
    </div>-->

    <app-customizer v-if="showCustomizer" slot="customizer" />
  </layout-vertical>
</template>

<script>
import LayoutVertical from "@core/layouts/layout-vertical/LayoutVertical.vue";
import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
import { $themeConfig } from '@themeConfig'
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    AppCustomizer,
    LayoutVertical,
    Navbar,
  },
  data() {
    return {
      showCustomizer: $themeConfig.layout.customizer,
    };
  },
};
</script>
