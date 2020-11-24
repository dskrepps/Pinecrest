
/*
 * Items as they are listed by search
 */



<template>
  <Layout>
    <HeaderPartial>
      <div class="flex w-full text-gray-400 mx-auto px-4 sm:px-0">
        <div class="container w-full mx-auto mt-4 mb-12">  
          
          <h1 class="text-center w-full text-base font-medium">
            {{ $page.tag.belongsTo.totalCount }} {{ postLabel }} tagged with:
            <ItemTags
              :tags="[$page.tag]"
              class="mt-2 text-2xl"
            />
          </h1>
          
        </div>
      </div>
    </HeaderPartial>
      
    <div class="container mx-auto md:px-6 px-1">
      <div class="post-feed relative -mt-5">
        <ListItem v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id" :item="edge.node" />
      </div>
      
      <div class="pagination flex justify-center mb-8">
        <Pagination
          :baseUrl="$page.tag.path"
          :currentPage="$page.tag.belongsTo.pageInfo.currentPage"
          :totalPages="$page.tag.belongsTo.pageInfo.totalPages"
          :maxVisibleButtons="5"
          v-if="$page.tag.belongsTo.pageInfo.totalPages > 1"
        />
      </div>
    </div>
    
    <RelatedItems
      :items="variants"
      class="bg-dark-purple"
    >
      <template v-slot:heading>
        Maps With Matching Variants
      </template>
      See all maps with matching variants: <ItemTags
        :tags="[$page.variantTag]"
        class="mt-2 text-lg"
      />
    </RelatedItems>
      
  </Layout>
</template>

<page-query>
query($id: ID!, $page:Int, $variantTag: ID) {
  tag(id: $id) {
    title
    path
    variantTag
    belongsTo(perPage: 6, page: $page, sortBy: "order") @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ... on Item {
            title
            path
            tags {
              id
              title
              path
            }
            postUrl
            descUrl
            credit
          }
        }
      }
    }
  }
  variants: allItem (
    filter: { tags: { contains: [$variantTag] } }
    limit: 20,
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
  variantTag: tag(id: $variantTag) {
    title
    path
  }
}
</page-query>

<script>
import HeaderPartial from '~/layouts/partials/Header.vue'
import ListItem from "~/components/ListItem.vue";
import ItemTags from "~/components/ItemTags.vue";
import Pagination from "~/components/Pagination.vue";
import RelatedItems from "~/components/RelatedItems.vue";

export default {
  metaInfo() {
    return {
      title: 'Battlemaps tagged: ' + this.$page.tag.title,
    };
  },
  components: {
    ListItem,
    ItemTags,
    Pagination,
    HeaderPartial,
    RelatedItems,
  },
  computed : {
    postLabel : function() {
      var pluralize = require('pluralize');
      return pluralize( 'battlemap', this.$page.tag.belongsTo.totalCount );
    },
    variants: function() {
      const shuffled = this.$page.variants.edges.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 2).map( edge=>edge.node );
    },
  },
};
</script>






<style lang="scss">
  .post-feed {
    // Hide variant tags
    .item-tags__tag[href*='variant-'] {
      @apply hidden;
    }
    
  }
</style>