

/*
 * The feed of latest items on the index page
 */

<template>
  <IndexLayout>
    <main class="flex-grow container mx-auto index-page">
      <div class="item-feed -mt-16 mx-1 block md:grid">
        <ListItem v-for="edge in $page.entries.edges" :key="edge.node.id" :item="edge.node" />
      </div>

      <div class="pagination flex justify-center mb-8">
        <Pagination v-if="$page.entries.pageInfo.totalPages > 1"
          baseUrl=""
          :currentPage="$page.entries.pageInfo.currentPage"
          :totalPages="$page.entries.pageInfo.totalPages"
          :maxVisibleButtons="5"
        />
      </div>
    </main>
  </IndexLayout>
</template>




<page-query>
query($page:Int) {
  entries: allItem(perPage: 8, page: $page, sortBy: "order") @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        path
        tags {
          id
          title
          path
        }
        credit
        postUrl
        descUrl
      }
    }
  }
}
</page-query>




<script>
import ListItem from "~/components/ListItem.vue";
import Pagination from "~/components/Pagination.vue";

export default {
  metaInfo: {
    title: "Tabletop Battle Maps"
  },
  components: {
    ListItem,
    Pagination
  }
};
</script>




<style lang="scss">
.item-feed {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto max-content auto auto auto max-content;
  grid-column-gap: 2rem;
  
  // 1 card horizontal, 2 vertical, 3 horizontal, 2 vertical
  > :nth-child(1) { grid-area: 1 / 1 / 2 / 3; }
  > :nth-child(2) { grid-area: 2 / 1 / 3 / 2; }
  > :nth-child(3) { grid-area: 2 / 2 / 3 / 3; }
  > :nth-child(4) { grid-area: 3 / 1 / 4 / 3; }
  > :nth-child(5) { grid-area: 4 / 1 / 5 / 3; }
  > :nth-child(6) { grid-area: 5 / 1 / 6 / 3; }
  > :nth-child(7) { grid-area: 6 / 1 / 7 / 2; }
  > :nth-child(8) { grid-area: 6 / 2 / 7 / 3; }
  
  // Limit tags to two rows
  .item-tags {
    @apply overflow-hidden;
    height: 5em;
  }
  
  // Adding variants and grid-areas to tailwind.config.js to do this within the framework is a job for another day, if ever
  @media (min-width: 768px) {
    // Horizontal card type
    > :nth-child(1), > :nth-child(4),
    > :nth-child(5), > :nth-child(6) {
      
      .item-card__image-link {
        grid-area: 1 / 1 / 3 / 2;
        @apply mr-4 rounded-l-lg rounded-r-none;
      }
      
      .item-card__image {
        @apply rounded-l-lg rounded-r-none;
      }
      
      .item-card__content {
        grid-area: 1 / 2 / 2 / 3;
        @apply pl-8 -ml-4 bg-white;
      }
      
      .item-card__footer {
        grid-area: 2 / 2 / 3 / 3;
        @apply pl-8 -ml-4 rounded-bl-none;
      }
      
    }
    
    // Reverse direction
    > :nth-child(4),
    > :nth-child(6) {
      
      .item-card__image-link {
        grid-area: 1 / 2 / 3 / 3;
        @apply mr-0 ml-4 rounded-l-none rounded-r-lg;
      }
      
      .item-card__image {
        @apply rounded-l-none rounded-r-lg;
      }
      
      .item-card__content {
        grid-area: 1 / 1 / 2 / 2;
        @apply pl-6 pr-8 ml-0 -mr-4;
      }
      
      .item-card__footer {
        grid-area: 2 / 1 / 3 / 2;
        @apply pl-6 pr-8 ml-0 -mr-4 rounded-br-none rounded-bl-lg;
      }
      
    }

    // Vertical card type
    > :nth-child(2), > :nth-child(3),
    > :nth-child(7), > :nth-child(8) {
      @apply flex flex-col;
      .item-card__image-link { height: 20rem; @apply rounded-b-none rounded-t-lg; }
      .item-card__image      { @apply  rounded-b-none rounded-t-lg; }
      .item-card__content    { @apply rounded-none; }
      .item-card__footer     { @apply mt-auto; }
    }
  
  } // (min-width: 768px)
  
} // .item-feed
</style>
