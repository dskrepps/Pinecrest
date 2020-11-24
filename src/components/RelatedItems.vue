/*

  An aside/related section below main content

*/

<template>
  <div v-if="items.length || $slots.length"
    class="related-items flex-grow py-16"
  >
    <aside :class="`container mx-auto px-6 ${asideClassNames || ''}`">
      <h2 v-if="items.length"
        class="mt-0 mb-8 text-white text-3xl"
      >
        <slot name="heading"></slot>
      </h2>
      
      <div v-if="items.length"
        class="related-items__items md:grid"
      >
        <ListItem v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </div>
      
      <div class="related-items__footer pt-8 text-white text-xl text-center light-links">
        <slot></slot>
      </div>
      
    </aside>
  </div> <!-- /.related-items -->
</template>





<script>
import ListItem from "~/components/ListItem.vue";

export default {
  props: {
    'heading': String,
    'items': Array,
    'asideClassNames': String,
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
  .item-card__footer            { @apply flex-grow flex flex-col; }
  
  // Limit tags to display only two rows
  .item-tags {
    @apply overflow-hidden mt-auto;
    height: 5em;
  }
  
  // No need to show variants here
  .item-tags__tag[href*='variant'] {
    @apply hidden;
  }
}
</style>
