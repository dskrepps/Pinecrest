import DefaultLayout from '~/layouts/Default.vue';
import IndexLayout from '~/layouts/Index.vue';

import '~/assets/scss/main.scss';


export default function (Vue, { head }) {
  Vue.component('Layout', DefaultLayout);
  Vue.component('IndexLayout', IndexLayout);

  head.htmlAttrs = {
    lang: 'en',
  };

  head.bodyAttrs = {
    class: 'bg-gray-100',
  };
  
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&text=Pinecrest',
  });
  
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600&display=swap',
  });
  
}
