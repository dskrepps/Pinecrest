
/*
 *  Small header with heading slot
 */

<template>
  <header>
    
    <div class="w-full text-gray-400 mx-auto bg-gray-900 px-4 sm:px-0 white-links header-bg">
      <div class="container w-full mx-auto flex py-5">
        
        <a href="/"
          :title="$static.metadata.siteDescription"
          class="font-sans font-bold mr-4"
        >
          {{ $static.metadata.siteName }}
        </a>
        
        <div class="text-sm ml-auto">
          <HeaderNavigation/>
        </div>
      </div>
      
      <!-- Pages add their own title here -->
      <div class="container w-full mx-auto">
        <slot/>
      </div>
      
    </div>

  </header>
</template>


<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>


<script>
import HeaderNavigation from "~/layouts/partials/HeaderNavigation.vue";

export default {
  components: {
    HeaderNavigation
  },
}
</script>
