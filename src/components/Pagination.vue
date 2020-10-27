<template>
  <ul class="flex my-2 pl-0 rounded">

    <li v-if="!isFirstPage(currentPage, totalPages)">
      <g-link :to="previousPage(currentPage,totalPages)"
        class="block w-10 ml-0 mr-1 py-2 border border-gray-300 rounded bg-white hover:bg-gray-300 text-center leading-tight text-black"
        tabindex="-1"
        title="Previous Page"
      >&laquo;</g-link>
    </li>

    <li v-for="page in pages"
      :key="page.name"
    >
      <g-link :to="page.link"
        class="block w-10 ml-1 mr-1 py-2 border border-gray-300 rounded bg-white hover:bg-gray-300 text-center leading-tight text-black"
        v-bind:class="[isCurrentPage(currentPage, page.name) ? 'border-l-4 border-l-black' : '']"
        :aria-label="page.name"
        :aria-current="page.name"
      >{{page.name}}</g-link>
    </li>

    <li v-if="!isLastPage(currentPage, totalPages)">
      <g-link :to="nextPage(currentPage,totalPages)"
        class="block w-10 ml-1 py-2 border border-gray-300 rounded bg-white hover:bg-gray-300 text-center leading-tight text-black"
        tabindex="-1"
        title="Next Page"
      >&raquo;</g-link>
    </li>
  </ul>

</template>

<script>
export default {
  props: {
    baseUrl: String,
    currentPage: Number,
    totalPages: Number,
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 4
    }
  },
  methods: {
    isFirstPage(currentPage, totalPages) {
        return currentPage == 1;
    },
    isLastPage(currentPage, totalPages) {
        return currentPage == totalPages;
    },
    isCurrentPage(currentPage, pageElement) {
        return currentPage == pageElement;
    },
    nextPage(currentPage, totalPages) {
      return `${this.baseUrl}/${currentPage + 1}`;
    },
    previousPage(currentPage, totalPages) {
      return currentPage === 2
        ? `${this.baseUrl}/`
        : `${this.baseUrl}/${currentPage - 1}`;
    }
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      if (this.currentPage === this.totalPages) {
        return this.currentPage - 1;
      }
      return this.currentPage - 1;
    },
    pages() {
      const range = [];
      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i += 1
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
          link: i === 1 ? `${this.baseUrl}/` : `${this.baseUrl}/${i}`
        });
      }
      return range;
    }
  }
};
</script>