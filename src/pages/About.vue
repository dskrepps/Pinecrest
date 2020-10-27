<template>
  <IndexLayout>
    <div class="container w-full mx-auto -mt-12 mb-12 px-6 pt-3 bg-gray-300 rounded-lg shadow-lg">
      
      <section v-for="section in $static.metadata.aboutSections"
        :key="section.heading"
      >
        
        <h2>{{section.heading}}</h2>
        
        <div v-html="section.body"
          class="mb-16 text-gray-900 font-copy"
        ></div>
        
      </section>
      
      
      
    </div>
    
  </IndexLayout>
</template>


<static-query>
query {
  metadata {
    aboutSections: aboutSections {
      heading
      body
    }
  }
}
</static-query>


<script>
  export default {
    metaInfo: {
      title: 'About'
    }
  };
</script>
