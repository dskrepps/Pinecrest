/*
 * 
 * This component is an individual item expected to be used in a listing of items.
 * It should be given an object with data from files in ~/content/items/
 * 
 */

<template>
  <article class="item-card md:grid mb-8 rounded-lg shadow-lg">
    
    <!-- The item's image is a link to the item's permalink page -->
    <g-link
      :to="item.path"
      class="item-card__image-link block rounded-t-lg shadow-soft-border"
      v-bind:class="{ 'bg-gray-400 flex rounded-t-lg': loading || loadingFailed }"
    >
      <!-- object-fit: cover doesn't work with grid height or something, so use background: -->
      <div v-if="!loading && !loadingFailed"
        :style="`background-image: url( ${post.imgSrc||''} )`"
        class="item-card__image relative bg-gray-200 bg-cover bg-center h-full min-h-64 shadow-soft-border rounded-t-lg"
      ></div>
      
      <img v-else-if="loading"
        :src="require('~/assets/img/loading-animation.svg')"
        class="m-auto self-center relative z-10 my-32"
      />
      
      <!-- Warning icon when loading failed -->
      <img v-else
        :src="require('~/assets/img/warning.svg')"
        class="m-auto self-center relative z-10 h-10"
      />
    </g-link>
    
    
    <div class="item-card__content py-4 px-6 overflow-hidden relative z-0 shadow-inner bg-white">
      
      <header>
        <a :href="item.path"
          class="item-card__content-link"
        >
          
          <!-- Permalink icon -->
          <svg class="item-card__permalink h-5 float-right mt-1 opacity-25" viewBox="0 0 32 32">
            <path d="M13.7 19.8c-0.4 0-0.8-0.15-1.15-0.4-2.9-2.9-2.9-7.8 0-10.7l6-6c1.4-1.4 3.3-2.2 5.4-2.2s3.9 0.8 5.4 2.2c2.9 2.9 2.9 7.8 0 10.7l-2.7 2.7c-0.6 0.6-1.6 0.6-2.3 0s-0.6-1.6 0-2.3l2.7-2.7c1.7-1.7 1.7-4.4 0-6.1-0.8-0.8-1.9-1.2-3.09-1.2s-2.2 0.4-3.09 1.2l-6 6c-1.7 1.7-1.7 4.4 0 6.1 0.6 0.6 0.6 1.6 0 2.3-0.3 0.3-0.7 0.4-1.15 0.4z"></path>
            <path d="M8 31.6c-2 0-3.9-0.8-5.4-2.2-2.9-2.9-2.9-7.8 0-10.7l2.7-2.7c0.6-0.6 1.6-0.6 2.3 0s0.6 1.6 0 2.3l-2.7 2.7c-1.7 1.7-1.7 4.4 0 6.1 0.8 0.8 1.9 1.2 3.09 1.2s2.2-0.4 3.09-1.2l6-6c1.7-1.7 1.7-4.4 0-6.1-0.6-0.6-0.6-1.6 0-2.3s1.6-0.6 2.3 0c2.9 2.9 2.9 7.8 0 10.7l-6 6c-1.4 1.4-3.3 2.2-5.4 2.2z"></path>
          </svg>
          
          <h2 class="item-card__title text-xl tracking-wide">
            {{ item.title }}
          </h2>
          
        </a>
      </header>
      
      <!-- The description embedded from Reddit with ajax, only the top portion visible -->
      <div v-if="!loading && !loadingFailed"
        class="relative shadow-shaded"
      >
        <section v-html="desc.body"
          class="item-card__excerpt reddit-embed-body h-48 overflow-hidden relative -z-10"
        ></section>
      </div>
      
      <img v-else-if="!loadingFailed"
        :src="require('~/assets/img/loading-animation.svg')"
        class="m-auto my-20"
      />
      
      <p v-else class="mt-10 mb-16 text-center">
        Failed to load post from Reddit API
      </p>
      
      <div class="item-card__more-link-container -mt-5">
        <a :href="'https://reddit.com'+post.url"
          class="item-card__more-link transform-center inline-block p-2 mr-auto whitespace-no-wrap shadow-md border bg-gray-200 text-gray-900 font-medium"
        > View Reddit Post </a>
      </div>
      
    </div>
    
    <!-- Footer metadata -->
    <footer class="item-card__footer px-6 pt-4 bg-gray-300 rounded-b-lg shadow-inner">
      
      <div v-html="item.credit"
        class="item-card__credit mb-4 font-medium give-social-links-icons"
      ></div>
      
      <ItemTags
        :tags="item.tags"
        class="mb-4"
      ></ItemTags>
      
    </footer>
  </article>
</template>




<script>
import ItemTags from "~/components/ItemTags.vue";
import fetchRedditData from '~/fetch-reddit-data.js';


export default {
  props: ['item'],
  
  components: { ItemTags },
  
  data: ()=>({
    loading: true,
    loadingFailed: false,
    post: {},
    desc: {},
    timeout: null, // For canceling loading
  }),
  
  methods: {
    async fetchData () {
        
      // Wait between 200 and 1000ms to give the impression we're querying an api
      // (which we are, but if it's too fast people might think otherwise)
      clearTimeout(this.timeout);
      await new Promise( resolve => {
        this.timeout = setTimeout(resolve, Math.floor(Math.random()*800)+200);
      });
      
      await fetchRedditData( this.item, this );
      
    },
  },
  
  watch: {
    '$route': 'fetchData'
  },

  async mounted() {
    await this.fetchData();
  },
  
};
</script>



<style lang="scss">
.item-card {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  
  // Every other will be reversed
  // Adding variants and grid-areas to tailwind.config.js to do this within the framework is a job for another day
  @media (min-width: 768px) {
    &:nth-child(odd) {
      .item-card__image-link { @apply rounded-tr-none; }
      .item-card__image   { @apply rounded-tr-none; }
      .item-card__content { @apply rounded-tr-lg; }
    }
    &:nth-child(even) {
      .item-card__image-link { grid-area: 1 / 2 / 2 / 3; @apply rounded-tl-none; }
      .item-card__image      { @apply rounded-tl-none; }
      .item-card__content    { grid-area: 1 / 1 / 2 / 2; @apply rounded-tl-lg; }
    }
  }
}
  
// Highlight permalink icon on image or title hover
.item-card__image-link:hover + .item-card__content .item-card__permalink,
.item-card__content-link:hover .item-card__permalink {
  opacity: 1;
}

// Specificity needed to color this link
.item-card__more-link[class] {
  @apply text-gray-900;
}

.item-card__footer {
  grid-area: 2 / 1 / 3 / 3;
}
</style>