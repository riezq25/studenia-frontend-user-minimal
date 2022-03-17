<template>
  <div class="customizer" :class="{ 'open': isCustomizerOpen }">
    <!-- Toggler -->
    <b-link class="customizer-toggle d-flex align-items-center justify-content-center" v-if="!$route.meta.notRequiredWA">
      <!-- <feather-icon icon="SettingsIcon" size="15" class="spinner" /> -->
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
        <path
          d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
        />
      </svg>
    </b-link>
    <!-- /Toggler -->

    <!-- Header -->
  </div>
</template>

<script>
import {
  BLink, BFormRadioGroup, BFormGroup, BFormCheckbox,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import useAppCustomizer from './useAppCustomizer'
import { useRouter, useRoute } from 'vue-router'

export default {
  components: {
    // BSV
    BLink,
    BFormRadioGroup,
    BFormCheckbox,
    BFormGroup,

    // 3rd party
    vSelect,
    VuePerfectScrollbar,

  },
  setup() {

    const {
      // Vertical Menu
      isVerticalMenuCollapsed,

      // Customizer
      isCustomizerOpen,

      // Skin
      skin,
      skinOptions,

      // Content Width
      contentWidth,
      contentWidthOptions,

      // RTL
      isRTL,

      // routerTransition
      routerTransition,
      routerTransitionOptions,

      // Layout Type
      layoutType,
      layoutTypeOptions,

      // NavMenu Hidden
      isNavMenuHidden,

      // Navbar
      navbarColors,
      navbarTypes,
      navbarBackgroundColor,
      navbarType,

      // Footer
      footerTypes,
      footerType,
    } = useAppCustomizer()

    if (layoutType.value === 'horizontal') {
      // Remove semi-dark skin option in horizontal layout
      const skinSemiDarkIndex = skinOptions.findIndex(s => s.value === 'semi-dark')
      delete skinOptions[skinSemiDarkIndex]

      // Remove menu hidden radio in horizontal layout => As we already have switch for it
      const menuHiddneIndex = navbarTypes.findIndex(t => t.value === 'hidden')
      delete navbarTypes[menuHiddneIndex]
    }

    // Perfect Scrollbar
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    return {
      // Vertical Menu
      isVerticalMenuCollapsed,

      // Customizer
      isCustomizerOpen,

      // Skin
      skin,
      skinOptions,

      // Content Width
      contentWidth,
      contentWidthOptions,

      // RTL
      isRTL,

      // routerTransition
      routerTransition,
      routerTransitionOptions,

      // Layout Type
      layoutType,
      layoutTypeOptions,

      // NavMenu Hidden
      isNavMenuHidden,

      // Navbar
      navbarColors,
      navbarTypes,
      navbarBackgroundColor,
      navbarType,

      // Footer
      footerTypes,
      footerType,

      // Perfect Scrollbar
      perfectScrollbarSettings,
    }
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/bootstrap-extended/include";
@import "~@core/scss/base/components/variables-dark";

.customizer-section {
  padding: 1.5rem;
  border-bottom: 1px solid #ebe9f1;

  .dark-layout & {
    border-color: $theme-dark-border-color;
  }

  #skin-radio-group ::v-deep {
    .custom-control-inline {
      margin-right: 0.7rem;
    }
  }

  .form-group {
    margin-bottom: 1.5rem;
    &:last-of-type {
      margin-bottom: 0;
    }
    ::v-deep legend {
      font-weight: 500;
    }
  }
}

.mark-active {
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}

.ps-customizer-area {
  height: calc(100% - 83px);
}
</style>
