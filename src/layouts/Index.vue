<template>
  <div class="flex flex-col min-h-screen">
    <HeaderPartial></HeaderPartial>
    <slot/>
    <FooterPartial></FooterPartial>
  </div>
</template>

<script>
import HeaderPartial from '~/layouts/partials/IndexHeader.vue'
import FooterPartial from '~/layouts/partials/Footer.vue'

export default {
  components : {
    HeaderPartial,
    FooterPartial
  }
}
</script>