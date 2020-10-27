
/*
 *  ListItem.vue and SingleItem.vue get an item's image and description from the Reddit API
 */


import axios from 'axios';

export default async function fetchRedditData( item, state ) {
	try {
    
    state.loading = true;
    
    const response = await axios.get( item.descUrl + '.json?raw_json=1' );
    
    state.post = {
      imgSrc: response.data[0].data.children[0].data.preview.images[0].resolutions[5].url,
      url: response.data[0].data.children[0].data.permalink,
      // postUser: response.data[0].data.children[0].data.author,
      // date: response.data[0].data.children[0].data.created,
    };
    
    state.desc = {
      body: response.data[1].data.children[0].data.body_html,
    };
    
    state.loading = false;
    state.loadingFailed = false;
    
  } catch (error) {
    console.log(error);
    state.loadingFailed = true;
    state.loading = false;
  }
	
};
