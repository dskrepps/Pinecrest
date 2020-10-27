
/*
 *  The larger header appears on the Index page, list of all tags page, and about page.
 */

<template>

  <header class="pb-32 bg-gray-900 white-links header-bg"
  >
    
    <div class="flex justify-end container w-full mx-auto px-1 pt-12 text-gray-400">
      
      <!-- Header, desc -->
      <div class="justify-self-start mr-auto">
        
        <h1 class="m-0 mb-3 p-0 text-4xl text-white leading-none"
          style="font-family: 'Dancing Script', cursive;"
        >
          {{ $static.metadata.siteName }}
        </h1>
        
      </div>
      
      <!-- Nav -->
      <HeaderNavigation/>
      
      
    </div>
    
    <!-- Subheading/description -->
    <div class="container mx-auto">
      <p v-html="lineBreakHalfway($static.metadata.siteDescription)"
        class="px-1 text-gray-400 font-thin text-xl"
      ></p>
    </div>
    
  </header>
</template>



<static-query>
query {
  metadata {
    siteName
    siteDescription
    navigation : headerNavigation {
      name
      link
      external
    }
  }
}
</static-query>



<script>
import HeaderNavigation from "~/layouts/partials/HeaderNavigation.vue";
export default {
  components: {
    HeaderNavigation
  },
  methods: {
    lineBreakHalfway( str ){
      const arr = str.split(' ');
      const half = Math.ceil(arr.length / 2);
      arr.splice(half, 0, '<br/>');
      return arr.join(' ');
    },
  },
};
</script>
