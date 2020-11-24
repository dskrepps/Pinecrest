/*
 *  Viewing an individual item directly
 *  
 *  Note to self: This file is too large
 *  
 */

<template>
  <Layout>
    <HeaderPartial>
      
      <!-- Header with own background -->
      <div class="flex w-full text-gray-400 mx-auto px-4 sm:px-0">
        <header class="container w-full mx-auto mt-4 mb-12">
          <h1 class="text-center w-full">
            {{ $page.item.title }}
          </h1>
        </header>
      </div>
      
    </HeaderPartial>
    
    <main class="item-page flex-grow flex flex-col">
      
      <!-- Overlaps header background a bit -->
      <div class="item-page__wrapper max-w-480 mx-auto md:px-6 px-1 mb-16 -mt-6">
        
        <div v-if="loadingFailed"
          class="item-page__error mb-4 m-auto py-4 max-w-full w-120 text-center bg-red-200 rounded-lg"
        >
          There was a problem loading the embedded Reddit post.
          Check your internet connect, or maybe the Reddit API is inaccesible or the
          <a :href="$page.item.descUrl">embedded Reddit post</a> is missing.
        </div>
      
        <!-- The image is a link to the original reddit post -->
        <a :href="$page.item.postUrl"
          class="item-page__image-link relative z-0 max-w-content m-auto block mb-8 xl:mb-2 xl:float-right xl:ml-4 xl:max-w-leave40rem"
        >
        
          <!-- The image is wrapper required for inset shadow -->
          <div v-if="!loading && !loadingFailed"
            class="item-page__image-container relative shadow-soft-border rounded-lg xl:rounded-tl-none"
          >
            <img :src="post.imgSrc"
              alt="Preview image of this map hosted on Reddit"
              class="item-page__image relative -z-10 max-h-160 xl:max-h-256 min-h-80 object-cover max-w-full rounded-lg xl:rounded-tl-none"
            />
          </div>
          
          <!-- Loading placeholder and animation (key prevents flash of misstyled loading animation) -->
          <div v-else
            :key="loading + loadingFailed"
            class="flex h-140 w-120 max-w-full bg-gray-400 rounded-lg xl:rounded-tl-none shadow-inner"
          >
            <img v-if="loading"
              :src="require('~/assets/img/loading-animation.svg')"
              class="m-auto self-center my-20 h-10"
            />
            <!-- Warning icon when loading failed -->
            <img v-else
              :src="require('~/assets/img/warning.svg')"
              class="m-auto self-center h-10"
            />
          </div>
        </a>
        
        <!-- Content below the image, or around the floating image on xl screens -->
        <div class="item-page__content mb-8 bg-gray-300 shadow-lg rounded-lg">
          <!-- The rounded corners/bgs/shadows aren't set properly but it's a good enough immitation -->
          
          <section class="pt-4 px-6 bg-white shadow-inner rounded-lg">
            
            <h2 class="item-page__title inline-block text-lg tracking-wide">
              Artist's Description <span class="text-sm opacity-50"> (embedded from Reddit) </span>
            </h2>
            
            <!-- Description from reddit, or loading animation -->
            <div v-if="!loading && !loadingFailed"
              :key="loading + loadingFailed"
              v-html="desc.body"
              class="item-page__body reddit-embed-body"
            ></div>
            <img v-else-if="loading"
              :src="require('~/assets/img/loading-animation.svg')"
              class="m-auto my-20"
            />
            <!-- Warning icon when loading failed -->
            <img v-if="loadingFailed && !loading"
              :src="require('~/assets/img/warning.svg')"
              class="m-auto my-20 h-10"
            />
            
            <a :href="$page.item.postUrl"
              class="item-page__more-link inline-block my-4 p-2 font-bold"
            > View Post on Reddit &gt; </a>
          </section>
          
          <div class="bg-gray-300 shadow-inner">
          <section class="bg-gray-200 px-6 py-4 shadow-inner rounded-b-lg">
            <h2 class="text-lg mt-0"> Credit </h2>
            <div v-html="$page.item.credit"
              class="item-page__credit font-medium give-social-links-icons"
            ></div>
          </section>
          </div>
          
          <section class="px-6 py-4 bg-gray-300 shadow-inner rounded-b-lg">
            <h2 class="text-lg mt-0"> Tags </h2>
            <ItemTags :tags="$page.item.tags"></ItemTags>
          </section>
          
        </div> <!-- /.item-page__content -->
        
      </div> <!-- /.item-page__wrapper -->
      
      <!-- Variants section -->
      <RelatedItems
        :items="variants"
        asideClassNames="max-w-480"
        class="bg-gray-700"
      >
        <template v-slot:heading>
          Variants
        </template>
        <span v-html="$page.item.content"></span>
      </RelatedItems>
      
      <!-- More by artists section -->
      <RelatedItems
        :items="moreByArtists"
        asideClassNames="max-w-480"
        class="bg-gray-800"
      >
        <template v-slot:heading>
          More by this Artist
        </template>
        See all maps tagged with this artist:
        <ItemTags v-for="tag in artistTags"
          :tags="[tag]"
          :key="tag.id"
          class="mt-2 text-lg"
        />
      </RelatedItems>
      
      
    </main> <!-- /.item-page -->
  </Layout>
</template>




<page-query>
query($id: ID!, $variantTags: [ID], $artistTags: [ID]) {
  item(id: $id) {
    title
    path
    postUrl
    descUrl
    credit
    content
    tags {
      id
      title
      path
    }
  }
  variants: allItem (
    filter: { tags: { containsAny: $variantTags }, id: { ne: $id } }
  ) {
    edges {
      node {
        id
        title
        path
        postUrl
        descUrl
        credit
        tags {
          id
          title
          path
        }
      }
    }
  }
  moreByArtists: allItem (
    filter: {
      tags: { containsAny: $artistTags }
      id: { ne: $id } }
    limit: 20
  ) {
    edges {
      node {
        id
        title
        path
        postUrl
        descUrl
        credit
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</page-query>



<script>
import HeaderPartial from '~/layouts/partials/Header.vue'
import ItemTags from "~/components/ItemTags.vue";
import ListItem from "~/components/ListItem.vue";
import RelatedItems from "~/components/RelatedItems.vue";
import fetchRedditData from '~/fetch-reddit-data.js';

export default {
  props: ['item'],
  
  components: {
    ItemTags,
    ListItem,
    HeaderPartial,
    RelatedItems,
  },
  
  data: ()=>({
    loading: true,
    loadingFailed: false,
    post: {},
    desc: {},
  }),
  
  computed: {
    // Simplify the variants array
    variants: function(){
      return this.$page.variants.edges.map( edge=>edge.node );
    },
    
    artistTags: function(){
      return this.$page.item.tags
        .filter( tag=>tag.title.startsWith('artist:') );
    },
    
    // Shuffle and limit the moreByArtists array
    moreByArtists: function(){
      
      // Can't filter variants of this item in the query for some reason
      const variantTags = this.$page.item.tags
        .filter( tag=>tag.title.startsWith('variant-of:') )
        .map( tag=>tag.title );
      
      let moreByArtists = this.$page.moreByArtists.edges
        .map( edge=>edge.node )
        // Filter out item if it has any tags in variantTags
        .filter(item=>
          !item.tags.some(({title})=>
            variantTags.includes(title)
          )
        )
        // Random sort
        .sort(() => 0.5 - Math.random());
        
        // Limit 2
      return moreByArtists.slice(0, 2);
    },
  },
  
  methods: {
    // Image and description come from the Reddit API
    async fetchData () {
        
      // Wait 300ms to give the impression we're querying an api
      // (which we are, but if it's too fast people might think otherwise)
      clearTimeout(this.timeout);
      await new Promise( resolve => {
        this.timeout = setTimeout(resolve, 300);
      });
      
      await fetchRedditData( this.$page.item, this );
      
    },
  },
  
  // Components get reused but mounted doesn't fire again
  watch: {
    '$route': 'fetchData'
  },

  async mounted() {
    await this.fetchData();
  },
  
};
</script>
