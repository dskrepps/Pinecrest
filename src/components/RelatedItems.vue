/*

  An aside/related section below main content

*/

<template>
  <div class="related-items flex-grow pt-8 pb-16">
    <aside class="max-w-480 mx-auto px-6">
      <h2 v-if="items.length"
        v-html="heading"
        class="mt-0 text-white"
      ></h2>
      
      <div v-if="items.length"
        class="related-items__items md:grid"
      >
        <ListItem v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </div>
      
      <div v-html="footer"
        class="related-items__footer pt-8 text-white text-xl text-center light-links"
      ></div>
      
    </aside>
  </div> <!-- /.related-items__wrapper -->
</template>





<script>
import ListItem from "~/components/ListItem.vue";

export default {
  props: {
    'heading': String,
    'items': Array,
    'footer': String,
  },
  
  components: {
    ListItem,
  },
  
};
</script>





<style lang="scss">
// Make the items into vertical cards in two columns
.related-items__items {
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
  
  .item-card {
    @apply flex flex-col;
  }
  
  .item-card__image-link[class] { height: 20rem; @apply rounded-t-lg; }
  .item-card__image[class]      { @apply rounded-t-lg; }
  .item-card__content[class]    { @apply rounded-none; }
  .item-card__footer            { @apply mt-auto; }
  
  // Limit tags to display only two rows
  .item-tags {
    @apply overflow-hidden;
    height: 5em;
  }
  
  // No need to show variants here
  .item-tags__tag[href*='variant'] {
    @apply hidden;
  }
}
</style>
