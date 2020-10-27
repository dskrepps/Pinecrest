<template>
  <nav>
    <ul class="flex">
      <li v-for="element in $static.metadata.navigation"
        :key="element.name"
        class="hover:bg-red-10 ml-6"
      >
      
        <a v-if="element.external"
          :href="element.link"
          rel="noopener noreferrer"
        >{{ element.name }}</a>
        
        <g-link v-else
          :to="element.link"
        >{{element.name}}</g-link>
        
      </li>
    </ul>
  </nav>
</template>

<static-query>
query {
  metadata {
    navigation: headerNavigation {
      name
      link
      external
    }
  }
}
</static-query>
