

/*
 * List all tags
 */

<template>
  <IndexLayout>
    <div class="w-full container mx-auto -mt-12 mb-12 px-6 bg-gray-900 rounded-lg shadow-lg">
      
      <h1 class="mt-4 mb-5 text-3xl font-normal text-gray-200">
        <span class="font-semibold font-copy">
          {{ $page.items.totalCount }}
        </span>
        battle maps labeled with
        <span class="font-semibold font-copy">
          {{$page.tags.totalCount }}
        </span>
        tags
      </h1>
      
      
      <div class="mt-4 pb-4 text-xl">
        <ItemTags :tags="tags"/>
      </div>

    </div>
  </IndexLayout>
</template>




<page-query>
query {
  tags: allTag {
    totalCount
    edges {
      node {
        id
        title
        path
      }
    }
  }
  items: allItem {
    totalCount
  }
}
</page-query>




<script>
import ItemTags from "~/components/ItemTags.vue";

export default {
  metaInfo: {
    title: "List of Battlemap Tags"
  },
  components: {
    ItemTags,
  },
  computed: {
    tags: function(){
      return this.$page.tags.edges.map(edge=>edge.node)
        // Sort alphabetically
        .sort( (a, b) => {
            if( a.title < b.title ) return -1;
            if( a.title > b.title ) return 1;
            return 0;
        } );
    },
  },
};
</script>
