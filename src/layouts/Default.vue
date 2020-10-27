<template>
  <div class="flex flex-col min-h-screen">
    <slot/>
    <FooterPartial></FooterPartial>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>

import FooterPartial from '~/layouts/partials/Footer.vue'

export default {
  components : {
    FooterPartial,
  }
}
</script>