/*

  Component which lists tags with icons. Takes an array of objects with id, path, and title.

*/

<template>
  <div class="item-tags">
    <g-link v-for="tag in displayTags" 
      class="item-tags__tag inline-block mr-2 mb-2 py-1 px-3 bg-gray-700 rounded text-white font-copy"
      :key="tag.id" 
      :to="tag.path"
    >
      <img :src="getGameIcon(tag.title)"
        class="inline-block h-5-em -mt-1 pr-1"
      />
      {{ tag.title }}
    </g-link>
  </div>
</template>





<script>
const defaultTagIcon = require(`~/assets/img/game-icons/tag.svg`);

export default {
  props: {'tags': Array},
  
  computed: {
    displayTags: function(){
      return this.tags
      .filter( tag =>
        !tag.title.startsWith('variant-of:')
      );
    },
  },
  
  methods: {
    getGameIcon: name => {
      
      // 'variant:' tags get the icon named after the colon, 'artist:' tags get the artist icon
      if( name.startsWith('variant:') ) name = name.substr(8);
      if( name.startsWith('artist:') ) name = 'artist';
      
      try {
        return require(`~/assets/img/game-icons/${name}.svg`);
      } catch(e) {
        return defaultTagIcon;
      }
      
    }
  },
};
</script>





<style lang="scss">
  .item-tags__tag[class] {
    @apply text-white;
    img { filter: invert(1); } // Color the tag's icon (from black)
  }
  .item-tags__tag[href*='variant-'],
  .item-tags__tag[href*='variants'] {
    @apply bg-purple-900;
  }
  .item-tags__tag[href*='artist-'] {
    @apply bg-teal-800;
  }
</style>
